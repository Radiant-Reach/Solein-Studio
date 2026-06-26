import { GHL_SERVICES, GhlRoomId, SLOT_DURATION_MINUTES } from 'constants/ghl'

import {
  GhlScheduleRule,
  GhlServiceBooking,
  getSchedules,
  getServiceBookings,
} from 'utils/ghl'

type BusyRange = { start: number; end: number; resourceIds: string[] }
type MinuteInterval = { from: number; to: number }

const SERVICE_ID_TO_RESOURCES: Record<string, string[]> = Object.fromEntries(
  Object.values(GHL_SERVICES).map((service) => [
    service.serviceId,
    service.resourceIds,
  ])
)

const toBusyRanges = (bookings: GhlServiceBooking[]): BusyRange[] =>
  bookings.map((booking) => ({
    start: new Date(booking.startTime).getTime(),
    end: new Date(booking.endTime).getTime(),
    resourceIds: booking.services.flatMap(
      (service) => SERVICE_ID_TO_RESOURCES[service.id] ?? []
    ),
  }))

const rangesOverlap = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd

// A slot is free for `resourceIds` only if no busy range sharing any of
// those resources overlaps it — this is what makes booking "Całe Studio"
// (both room resources) block both individual rooms, and booking either
// room block "Całe Studio", without either room blocking the other.
const isResourceFree = (
  busyRanges: BusyRange[],
  resourceIds: string[],
  slotStart: number,
  slotEnd: number
) =>
  !busyRanges.some(
    (busy) =>
      rangesOverlap(slotStart, slotEnd, busy.start, busy.end) &&
      busy.resourceIds.some((id) => resourceIds.includes(id))
  )

const WEEKDAY_NAMES: GhlScheduleRule['day'][] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const minutesSinceMidnight = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const getStaffIntervals = async (
  staffId: string,
  day: Date
): Promise<MinuteInterval[]> => {
  const schedules = await getSchedules()
  const schedule = schedules.find((item) => item.userId === staffId)
  if (!schedule) return []

  const dayName = WEEKDAY_NAMES[day.getDay()]
  const rule = schedule.rules.find((item) => item.day === dayName)

  return (rule?.intervals ?? []).map(({ from, to }) => ({
    from: minutesSinceMidnight(from),
    to: minutesSinceMidnight(to),
  }))
}

const intersectIntervals = (
  a: MinuteInterval[],
  b: MinuteInterval[]
): MinuteInterval[] => {
  const result: MinuteInterval[] = []

  a.forEach((intervalA) => {
    b.forEach((intervalB) => {
      const from = Math.max(intervalA.from, intervalB.from)
      const to = Math.min(intervalA.to, intervalB.to)
      if (from < to) result.push({ from, to })
    })
  })

  return result
}

// "Całe Studio" has its own GHL staff member/schedule (currently
// 08:00–17:00), but that's a disconnected default, not the real
// constraint — renting the whole studio just means both rooms have to be
// free, so its real available hours are the *intersection* of the two
// individual rooms' own schedules (08:00–21:00 each), not its own staff's
// schedule. Confirmed against the room schedules directly rather than
// trusting the Studio staff entry.
const getWorkingIntervals = async (
  room: GhlRoomId,
  day: Date
): Promise<MinuteInterval[]> => {
  if (room === 'studio') {
    const [zachodIntervals, wschodIntervals] = await Promise.all([
      getStaffIntervals(GHL_SERVICES.zachod.staffId, day),
      getStaffIntervals(GHL_SERVICES.wschod.staffId, day),
    ])
    return intersectIntervals(zachodIntervals, wschodIntervals)
  }

  return getStaffIntervals(GHL_SERVICES[room].staffId, day)
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
  const { resourceIds } = GHL_SERVICES[room]

  const intervals = await getWorkingIntervals(room, day)
  if (intervals.length === 0) return []

  const rangeStart = new Date(day)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(day)
  rangeEnd.setHours(23, 59, 59, 999)

  const bookings = await getServiceBookings(
    rangeStart.getTime(),
    rangeEnd.getTime()
  )
  const busyRanges = toBusyRanges(bookings)

  const slots: Date[] = []
  const now = Date.now()

  intervals.forEach(({ from: openMinute, to: closeMinute }) => {
    for (
      let startMinute = openMinute;
      startMinute + durationMinutes <= closeMinute;
      startMinute += 60
    ) {
      const slotStart = new Date(day)
      slotStart.setHours(0, startMinute, 0, 0)
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000)

      const isPast = slotStart.getTime() < now
      const isFree =
        !isPast &&
        isResourceFree(
          busyRanges,
          resourceIds,
          slotStart.getTime(),
          slotEnd.getTime()
        )

      if (isFree) {
        slots.push(slotStart)
      }
    }
  })

  return slots
}
