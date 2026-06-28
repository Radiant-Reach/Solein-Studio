import { RR_CALENDARS, RrRoomId, SLOT_DURATION_MINUTES } from 'constants/rr'

import { getAvailableSlotsRaw } from 'utils/rr'

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const STEP_MS = SLOT_DURATION_MINUTES * 60000

// RR Dashboard's /availability endpoint already does the real work (staff
// hours, existing bookings, and -- for "Całe Studio" -- both rooms'
// resources) at SLOT_DURATION_MINUTES granularity. durationMinutes here can
// exceed that (the "Dodatkowe godziny wynajęcia" add-on) -- a multi-hour
// booking is valid exactly when every hourly increment of it is itself a
// returned slot, since the hourly windows partition the combined span
// exactly (no appointment can overlap the combined span without overlapping
// at least one hourly sub-window of it).
const isFullySpanned = (
  start: number,
  durationMs: number,
  candidateStarts: Set<number>
) => {
  for (let offset = 0; offset < durationMs; offset += STEP_MS) {
    if (!candidateStarts.has(start + offset)) return false
  }
  return true
}

const fetchHourlySlots = async (
  room: RrRoomId,
  start: Date,
  end: Date
): Promise<Date[]> => {
  const calendar = RR_CALENDARS[room]

  return getAvailableSlotsRaw({
    assignedUserId: calendar.assignedUserId,
    calendarId: calendar.calendarId,
    serviceId: calendar.serviceId,
    start: start.toISOString(),
    end: end.toISOString(),
    durationMinutes: SLOT_DURATION_MINUTES,
  })
}

export const getAvailableSlots = async (
  room: RrRoomId,
  day: Date,
  durationMinutes: number = SLOT_DURATION_MINUTES
): Promise<Date[]> => {
  const rangeStart = new Date(day)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(day)
  rangeEnd.setHours(23, 59, 59, 999)

  const hourlySlots = await fetchHourlySlots(room, rangeStart, rangeEnd)
  const candidateStarts = new Set(hourlySlots.map((slot) => slot.getTime()))
  const durationMs = durationMinutes * 60000
  const now = Date.now()

  return hourlySlots.filter((slot) => {
    const start = slot.getTime()
    if (start < now) return false
    return isFullySpanned(start, durationMs, candidateStarts)
  })
}

// Coarser-grained than getAvailableSlots, but fetches the hourly slots just
// once for the whole visible month (instead of once per day) and reuses the
// exact same duration-spanning check per slot, so a day is only ever marked
// available here if getAvailableSlots would actually return a real slot for
// it too.
export const getDaysWithAvailability = async (
  room: RrRoomId,
  monthStart: Date,
  monthEnd: Date,
  durationMinutes: number = SLOT_DURATION_MINUTES
): Promise<Set<string>> => {
  const hourlySlots = await fetchHourlySlots(room, monthStart, monthEnd)
  const candidateStarts = new Set(hourlySlots.map((slot) => slot.getTime()))
  const durationMs = durationMinutes * 60000
  const now = Date.now()

  const days = new Set<string>()
  hourlySlots.forEach((slot) => {
    const start = slot.getTime()
    if (start < now) return
    if (isFullySpanned(start, durationMs, candidateStarts)) {
      days.add(toDateKey(slot))
    }
  })

  return days
}
