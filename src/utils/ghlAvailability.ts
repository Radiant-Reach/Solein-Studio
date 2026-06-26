import { GHL_CALENDARS, GhlRoomId, SLOT_DURATION_MINUTES } from 'constants/ghl'

import { getCalendarEvents, getFreeSlots } from 'utils/ghl'

const TIMEZONE = 'Europe/Warsaw'
const STEP_MS = 30 * 60000

const toTimestampSet = (slots: Date[]) =>
  new Set(slots.map((slot) => slot.getTime()))

const rangesOverlap = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd

const getOwnFreeSlots = (
  room: 'zachod' | 'wschod',
  rangeStart: number,
  rangeEnd: number
) =>
  getFreeSlots(GHL_CALENDARS[room].calendarId, rangeStart, rangeEnd, TIMEZONE)

// "Całe Studio" has its own GHL calendar, but its assigned team member's
// working-hours schedule is a disconnected, narrower default
// (08:00–17:00) — confirmed live it doesn't reflect the real bookable
// window, which is whenever *both* rooms are free. So Studio's candidate
// slots come from intersecting the two rooms' own (correct) free-slots,
// not from Studio's own free-slots/hours.
const getCandidateSlots = async (
  room: GhlRoomId,
  rangeStart: number,
  rangeEnd: number
): Promise<Date[]> => {
  if (room !== 'studio') {
    return getOwnFreeSlots(room, rangeStart, rangeEnd)
  }

  const [zachodSlots, wschodSlots] = await Promise.all([
    getOwnFreeSlots('zachod', rangeStart, rangeEnd),
    getOwnFreeSlots('wschod', rangeStart, rangeEnd),
  ])
  const wschodSet = toTimestampSet(wschodSlots)

  return zachodSlots.filter((slot) => wschodSet.has(slot.getTime()))
}

// `durationMinutes` should already include any "Dodatkowe godziny
// wynajęcia" add-on hours the visitor picked — callers extend it before
// calling this, since that add-on occupies the room and must factor into
// the conflict check (unlike e.g. the makeup station, which doesn't).
export const getAvailableSlots = async (
  room: GhlRoomId,
  day: Date,
  durationMinutes: number = SLOT_DURATION_MINUTES
): Promise<Date[]> => {
  const rangeStart = new Date(day)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(day)
  rangeEnd.setHours(23, 59, 59, 999)

  const [candidateSlots, studioEvents] = await Promise.all([
    getCandidateSlots(room, rangeStart.getTime(), rangeEnd.getTime()),
    // Whichever room this is for, an existing "Całe Studio" booking
    // blocks it (and blocks itself, preventing double-booking the whole
    // studio) — Studio's calendar is the only one a room booking never
    // shows up on by itself, so this is the one cross-check every room
    // needs regardless of which one we're computing slots for.
    getCalendarEvents(
      GHL_CALENDARS.studio.calendarId,
      rangeStart.getTime(),
      rangeEnd.getTime()
    ),
  ])

  const candidateSet = toTimestampSet(candidateSlots)
  const busyRanges = studioEvents.map((event) => ({
    start: new Date(event.startTime).getTime(),
    end: new Date(event.endTime).getTime(),
  }))

  const durationMs = durationMinutes * 60000

  // GHL's free-slots are 30-minute increments at the calendar's default
  // duration — a candidate start is only really bookable for our
  // (possibly longer, via the extra-hours add-on) duration if every
  // 30-minute increment across the whole span is itself a candidate
  // slot, not just the start.
  const isFullySpanned = (start: number) => {
    for (let offset = 0; offset < durationMs; offset += STEP_MS) {
      if (!candidateSet.has(start + offset)) return false
    }
    return true
  }

  const hasNoStudioConflict = (start: number, end: number) =>
    !busyRanges.some((busy) => rangesOverlap(start, end, busy.start, busy.end))

  const now = Date.now()

  return candidateSlots.filter((slot) => {
    const start = slot.getTime()
    if (start < now) return false
    if (!isFullySpanned(start)) return false
    return hasNoStudioConflict(start, start + durationMs)
  })
}

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// Coarser than getAvailableSlots — used to gray out whole days in the
// calendar grid, so it checks "is there any open slot at all" rather
// than a specific duration. One pair of API calls covers the whole
// visible month (GHL caps a free-slots range at 31 days) instead of one
// call per day.
export const getDaysWithAvailability = async (
  room: GhlRoomId,
  monthStart: Date,
  monthEnd: Date
): Promise<Set<string>> => {
  const [candidateSlots, studioEvents] = await Promise.all([
    getCandidateSlots(room, monthStart.getTime(), monthEnd.getTime()),
    getCalendarEvents(
      GHL_CALENDARS.studio.calendarId,
      monthStart.getTime(),
      monthEnd.getTime()
    ),
  ])

  const busyRanges = studioEvents.map((event) => ({
    start: new Date(event.startTime).getTime(),
    end: new Date(event.endTime).getTime(),
  }))

  const now = Date.now()
  const days = new Set<string>()

  candidateSlots.forEach((slot) => {
    const time = slot.getTime()
    if (time < now) return
    if (busyRanges.some((busy) => time >= busy.start && time < busy.end)) return
    days.add(toDateKey(slot))
  })

  return days
}
