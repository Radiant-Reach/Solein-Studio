import axios from 'axios'

import { env } from 'env'

import { GHL_LOCATION_ID } from 'constants/ghl'

// GHL's API is split across two header-versioned surfaces: classic
// endpoints (Contacts) use a dated `Version` header, while the newer
// Calendars v3 endpoints use the literal `Version: v3`.
const ghlClient = axios.create({
  baseURL: 'https://services.leadconnectorhq.com',
  headers: {
    Authorization: `Bearer ${env.GATSBY_GHL_API_KEY}`,
    Accept: 'application/json',
  },
})

export type UpsertContactInput = {
  firstName: string
  lastName?: string
  email: string
  phone: string
}

export const upsertContact = async (contact: UpsertContactInput) => {
  const { data } = await ghlClient.post<{ contact: { id: string } }>(
    '/contacts/upsert',
    { locationId: GHL_LOCATION_ID, ...contact },
    { headers: { Version: '2021-07-28' } }
  )

  return data.contact
}

export type GhlScheduleInterval = { from: string; to: string }
export type GhlScheduleRule = {
  day:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  intervals?: GhlScheduleInterval[]
}
export type GhlSchedule = {
  id: string
  userId: string
  rules: GhlScheduleRule[]
}

// We read a specific team member's own "Work Hours" schedule directly
// rather than using a calendar's `/free-slots` — collective calendars
// compute that from the *joint* availability of every attached member,
// so a non-primary member with a narrower schedule would otherwise
// silently shrink the room's real bookable hours (confirmed live).
export const getSchedules = async () => {
  const { data } = await ghlClient.get<{ schedules: GhlSchedule[] }>(
    '/calendars/schedules/search',
    {
      headers: { Version: 'v3' },
      params: { locationId: GHL_LOCATION_ID },
    }
  )

  return data.schedules
}

export type GhlCalendarEvent = { startTime: string; endTime: string }

export const getCalendarEvents = async (
  calendarId: string,
  startTime: number,
  endTime: number
): Promise<GhlCalendarEvent[]> => {
  const { data } = await ghlClient.get<{ events: GhlCalendarEvent[] }>(
    '/calendars/events',
    {
      headers: { Version: 'v3' },
      params: { locationId: GHL_LOCATION_ID, calendarId, startTime, endTime },
    }
  )

  return data.events
}

export type CreateAppointmentInput = {
  calendarId: string
  contactId: string
  startTime: string // ISO 8601 with timezone offset
  endTime: string
  title: string
  description?: string
}

export const createAppointment = async (input: CreateAppointmentInput) => {
  const { data } = await ghlClient.post(
    '/calendars/events/appointments',
    {
      locationId: GHL_LOCATION_ID,
      ...input,
      // GHL would otherwise validate this against the calendar's *joint*
      // free-slots (every attached team member, not just the primary —
      // see constants/ghl.ts), which doesn't reflect the room's real
      // hours. We already compute and show the visitor real availability
      // ourselves, so this only skips GHL's redundant (and here,
      // incorrect) re-check, not our own.
      ignoreFreeSlotValidation: true,
    },
    { headers: { Version: 'v3' } }
  )

  return data
}
