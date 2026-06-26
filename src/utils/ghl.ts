import axios from 'axios'

import { env } from 'env'

import { GHL_LOCATION_ID } from 'constants/ghl'

// GHL's API is split across two header-versioned surfaces: classic
// endpoints (Contacts) use a dated `Version` header, while the newer
// Service Menu / Calendars v3 endpoints use the literal `Version: v3`.
const ghlClient = axios.create({
  baseURL: 'https://services.leadconnectorhq.com',
  headers: {
    Authorization: `Bearer ${env.GATSBY_GHL_API_KEY}`,
    Accept: 'application/json',
  },
})

export type GhlServiceBooking = {
  bookingId: string
  startTime: string
  endTime: string
  services: { id: string }[]
}

export const getServiceBookings = async (
  startTime: number,
  endTime: number
) => {
  const { data } = await ghlClient.get<{ bookings: GhlServiceBooking[] }>(
    '/calendars/services/bookings',
    {
      headers: { Version: 'v3' },
      params: { locationId: GHL_LOCATION_ID, startTime, endTime },
    }
  )

  return data.bookings
}

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

export type CreateServiceBookingAddOn = {
  id: string
  quantity?: number
  duration?: number
}

export type CreateServiceBookingInput = {
  contactId: string
  startTime: string // ISO 8601 with timezone offset
  endTime: string
  timezone: string
  serviceId: string
  addOns?: CreateServiceBookingAddOn[]
  title?: string
}

export const createServiceBooking = async ({
  serviceId,
  addOns,
  ...input
}: CreateServiceBookingInput) => {
  const { data } = await ghlClient.post(
    '/calendars/services/bookings',
    {
      locationId: GHL_LOCATION_ID,
      ...input,
      services: [{ id: serviceId, addOns }],
    },
    {
      headers: { Version: 'v3' },
      // GHL's own server-side availability check rejects every slot
      // here regardless of the real working-hours schedule or actual
      // conflicts — confirmed live (curl, with cleanup) that a slot well
      // within real hours and with no resource conflict still failed
      // until this was set, while `skipSchedulingNotice` alone did
      // nothing. Root cause: the team members' schedules each have an
      // empty `calendarIds`, so they aren't linked to anything GHL's
      // booking-creation check can find — a GHL-side configuration gap,
      // not something fixable from here. Safe to override because our
      // own `getAvailableSlots` already enforces the real schedule
      // hours and real cross-resource conflicts before a slot is ever
      // offered — this only skips GHL's (broken, in this account)
      // redundant check, not our own.
      params: { overrideAvailability: true, skipSchedulingNotice: true },
    }
  )

  return data
}
