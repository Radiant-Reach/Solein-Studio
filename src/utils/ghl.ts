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

// Response is keyed by date string (e.g. "2026-06-29"), each holding the
// real bookable start times for that calendar's own assigned team
// member — this is what's missing for Service Menu bookings (their
// schedules aren't linked to anything), but works correctly here.
export const getFreeSlots = async (
  calendarId: string,
  startDate: number,
  endDate: number,
  timezone: string
): Promise<Date[]> => {
  const { data } = await ghlClient.get<Record<string, { slots?: string[] }>>(
    `/calendars/${calendarId}/free-slots`,
    {
      headers: { Version: 'v3' },
      params: { startDate, endDate, timezone },
    }
  )

  return Object.values(data)
    .flatMap((day) => day.slots ?? [])
    .map((slot) => new Date(slot))
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
    { locationId: GHL_LOCATION_ID, ...input },
    { headers: { Version: 'v3' } }
  )

  return data
}
