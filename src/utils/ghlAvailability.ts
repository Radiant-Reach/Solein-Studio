import { GHL_CALENDARS, GhlRoomId, SLOT_DURATION_MINUTES } from 'constants/ghl'

import {
  GhlSchedule,
  GhlScheduleRule,
  getCalendarEvents,
  getSchedules,
} from 'utils/ghl'

const STEP_MS = 60 * 60000 // candidates are generated hourly, matching SLOT_DURATION_MINUTES

const rangesOverlap = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd

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

type MinuteInterval = { from: number; to: number }
type BusyRange = { start: number; end: number }

// Reads the *primary* team member's own "Work Hours" schedule directly,
// rather than a calendar's `/free-slots` — collective calendars compute
// that from the joint availability of every attached member, so a
// non-primary member with a narrower personal schedule would otherwise
// silently shrink the room's real bookable hours (confirmed live: adding
// one shrank 08:00–21:00 down to roughly 08:00–17:00).
const getStaffOpenIntervals = (
  schedules: GhlSchedule[],
  staffId: string,
  day: Date
): MinuteInterval[] => {
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

// "Całe Studio" is bookable whenever *both* rooms' own staff schedules
// say they're open — not Studio's own (disconnected) staff schedule.
const getOpenIntervals = (
  schedules: GhlSchedule[],
  room: GhlRoomId,
  day: Date
): MinuteInterval[] => {
  if (room !== 'studio') {
    return getStaffOpenIntervals(schedules, GHL_CALENDARS[room].staffId, day)
  }

  return intersectIntervals(
    getStaffOpenIntervals(schedules, GHL_CALENDARS.zachod.staffId, day),
    getStaffOpenIntervals(schedules, GHL_CALENDARS.wschod.staffId, day)
  )
}

const toCandidateStarts = (day: Date, intervals: MinuteInterval[]) => {
  const starts: Date[] = []

  intervals.forEach(({ from, to }) => {
    for (
      let minute = from;
      minute + SLOT_DURATION_MINUTES <= to;
      minute += 60
    ) {
      const start = new Date(day)
      start.setHours(0, minute, 0, 0)
      starts.push(start)
    }
  })

  return starts
}

const toBusyRanges = (
  events: { startTime: string; endTime: string }[]
): BusyRange[] =>
  events.map((event) => ({
    start: new Date(event.startTime).getTime(),
    end: new Date(event.endTime).getTime(),
  }))

// Whichever room this is for, an existing "Całe Studio" booking blocks
// it (and blocks itself, preventing double-booking the whole studio) —
// Studio's calendar is the only one a room booking never shows up on by
// itself, so this is the one cross-check every room needs regardless of
// which one we're computing slots for.
const getBusyRanges = async (
  room: GhlRoomId,
  rangeStart: number,
  rangeEnd: number
): Promise<BusyRange[]> => {
  const ownCalendarId = GHL_CALENDARS[room].calendarId
  const calendarIds =
    room === 'studio'
      ? [ownCalendarId]
      : [ownCalendarId, GHL_CALENDARS.studio.calendarId]

  const eventLists = await Promise.all(
    calendarIds.map((id) => getCalendarEvents(id, rangeStart, rangeEnd))
  )

  return toBusyRanges(eventLists.flat())
}

const filterBookableStarts = (
  candidateStarts: Date[],
  busyRanges: BusyRange[],
  durationMinutes: number
): Date[] => {
  const durationMs = durationMinutes * 60000
  const now = Date.now()

  // `durationMinutes` can exceed the hour each candidate was generated
  // for (the "Dodatkowe godziny wynajęcia" add-on) — check every
  // following hour is also a real candidate, not just the start.
  const candidateSet = new Set(candidateStarts.map((slot) => slot.getTime()))
  const isFullySpanned = (start: number) => {
    for (let offset = 0; offset < durationMs; offset += STEP_MS) {
      if (!candidateSet.has(start + offset)) return false
    }
    return true
  }

  const hasNoConflict = (start: number, end: number) =>
    !busyRanges.some((busy) => rangesOverlap(start, end, busy.start, busy.end))

  return candidateStarts.filter((slot) => {
    const start = slot.getTime()
    if (start < now) return false
    if (!isFullySpanned(start)) return false
    return hasNoConflict(start, start + durationMs)
  })
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

  const [schedules, busyRanges] = await Promise.all([
    getSchedules(),
    getBusyRanges(room, rangeStart.getTime(), rangeEnd.getTime()),
  ])

  const candidateStarts = toCandidateStarts(
    day,
    getOpenIntervals(schedules, room, day)
  )

  return filterBookableStarts(candidateStarts, busyRanges, durationMinutes)
}

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// Coarser-grained than getAvailableSlots, but fetches schedules and
// calendar events just once for the whole visible month (instead of
// once per day, which would mean ~30 redundant API calls) and reuses the
// exact same duration-spanning + conflict check per day, so a day is
// only ever marked available here if getAvailableSlots would actually
// return a real slot for it too.
export const getDaysWithAvailability = async (
  room: GhlRoomId,
  monthStart: Date,
  monthEnd: Date,
  durationMinutes: number = SLOT_DURATION_MINUTES
): Promise<Set<string>> => {
  const [schedules, busyRanges] = await Promise.all([
    getSchedules(),
    getBusyRanges(room, monthStart.getTime(), monthEnd.getTime()),
  ])

  const days = new Set<string>()
  const cursor = new Date(monthStart)

  while (cursor.getTime() <= monthEnd.getTime()) {
    const candidateStarts = toCandidateStarts(
      cursor,
      getOpenIntervals(schedules, room, cursor)
    )
    const bookable = filterBookableStarts(
      candidateStarts,
      busyRanges,
      durationMinutes
    )

    if (bookable.length > 0) days.add(toDateKey(cursor))

    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}
