import { GHL_SERVICES, GhlRoomId, SLOT_DURATION_MINUTES } from 'constants/ghl'

import {
  GhlScheduleRule,
  GhlServiceBooking,
  getSchedules,
  getServiceBookings,
} from 'utils/ghl'

type BusyRange = { start: number; end: number; resourceIds: string[] }

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

// Each room is assigned to a different GHL team member, and each one has
// their own real working-hours schedule configured in GHL (confirmed
// live: the two individual rooms' staff work 08:00–21:00, "Całe Studio"'s
// staff only 08:00–17:00, none work weekends) — there's no single
// business-hours constant that holds across all three, so the actual
// schedule has to be fetched and used instead of guessed.
const getWorkingIntervals = async (staffId: string, day: Date) => {
  const schedules = await getSchedules()
  const schedule = schedules.find((item) => item.userId === staffId)
  if (!schedule) return []

  const dayName = WEEKDAY_NAMES[day.getDay()]
  const rule = schedule.rules.find((item) => item.day === dayName)

  return rule?.intervals ?? []
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
  const { resourceIds, staffId } = GHL_SERVICES[room]

  const intervals = await getWorkingIntervals(staffId, day)
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

  intervals.forEach(({ from, to }) => {
    const openMinute = minutesSinceMidnight(from)
    const closeMinute = minutesSinceMidnight(to)

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
