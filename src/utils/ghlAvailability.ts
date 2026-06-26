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

// Shared by getAvailableSlots and getDaysWithAvailability — both need the
// exact same "is this 30-minute candidate actually bookable for the full
// requested duration" check. They used to diverge (the day-level check
// didn't account for duration at all), which meant a day could show as
// available with only a single trailing half-hour slot that doesn't
// actually fit a full booking — exactly the "no slots that day" surprise
// this was built to avoid.
const filterBookableStarts = (
  candidateSlots: Date[],
  busyRanges: { start: number; end: number }[],
  durationMinutes: number
): Date[] => {
  const candidateSet = toTimestampSet(candidateSlots)
  const durationMs = durationMinutes * 60000
  const now = Date.now()

  const isFullySpanned = (start: number) => {
    for (let offset = 0; offset < durationMs; offset += STEP_MS) {
      if (!candidateSet.has(start + offset)) return false
    }
    return true
  }

  const hasNoStudioConflict = (start: number, end: number) =>
    !busyRanges.some((busy) => rangesOverlap(start, end, busy.start, busy.end))

  return candidateSlots.filter((slot) => {
    const start = slot.getTime()
    if (start < now) return false
    if (!isFullySpanned(start)) return false
    return hasNoStudioConflict(start, start + durationMs)
  })
}

const getStudioBusyRanges = async (rangeStart: number, rangeEnd: number) => {
  const studioEvents = await getCalendarEvents(
    GHL_CALENDARS.studio.calendarId,
    rangeStart,
    rangeEnd
  )

  return studioEvents.map((event) => ({
    start: new Date(event.startTime).getTime(),
    end: new Date(event.endTime).getTime(),
  }))
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

  const [candidateSlots, busyRanges] = await Promise.all([
    getCandidateSlots(room, rangeStart.getTime(), rangeEnd.getTime()),
    // Whichever room this is for, an existing "Całe Studio" booking
    // blocks it (and blocks itself, preventing double-booking the whole
    // studio) — Studio's calendar is the only one a room booking never
    // shows up on by itself, so this is the one cross-check every room
    // needs regardless of which one we're computing slots for.
    getStudioBusyRanges(rangeStart.getTime(), rangeEnd.getTime()),
  ])

  return filterBookableStarts(candidateSlots, busyRanges, durationMinutes)
}

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// Coarser-grained than getAvailableSlots (covers the whole visible month
// in one pair of API calls instead of one call per day), but uses the
// exact same duration-spanning + conflict check, so a day is only ever
// marked available here if getAvailableSlots would actually return a
// real slot for it too.
export const getDaysWithAvailability = async (
  room: GhlRoomId,
  monthStart: Date,
  monthEnd: Date,
  durationMinutes: number = SLOT_DURATION_MINUTES
): Promise<Set<string>> => {
  const [candidateSlots, busyRanges] = await Promise.all([
    getCandidateSlots(room, monthStart.getTime(), monthEnd.getTime()),
    getStudioBusyRanges(monthStart.getTime(), monthEnd.getTime()),
  ])

  const bookableSlots = filterBookableStarts(
    candidateSlots,
    busyRanges,
    durationMinutes
  )

  return new Set(bookableSlots.map(toDateKey))
}
