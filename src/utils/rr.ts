import axios from 'axios'

import { env } from 'env'

import { RR_LOCATION_ID } from 'constants/rr'

// Bearer-token auth (an RR Dashboard API key), same shape as the GHL client
// this replaces -- RR Dashboard's API has CORS enabled for exactly this kind
// of direct-from-browser call (see RR Dashboard's apps/api/src/proxy.ts).
const rrClient = axios.create({
  baseURL: env.GATSBY_RR_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.GATSBY_RR_API_KEY}`,
  },
})

export type RrAddOn = {
  id: string
  name: string
  description: string | null
  price: number // grosze
  durationMinutes: number | null
  allowsQuantity: boolean
  isActive: boolean
}

// Add-ons (name, description, price, whether they extend the booking's
// duration) are now configured in RR Dashboard's Settings rather than
// hardcoded here -- this site no longer has its own opinion on what add-ons
// exist or what they cost.
export const getAddOns = async (): Promise<RrAddOn[]> => {
  const { data } = await rrClient.get<RrAddOn[]>(
    `/api/locations/${RR_LOCATION_ID}/add-ons`
  )
  return data.filter((addOn) => addOn.isActive)
}

export type RrService = {
  id: string
  name: string
  price: number | null // grosze
  requiresOnlinePayment: boolean
  isActive: boolean
}

// Price and "requires online payment" now live in RR Dashboard's Settings
// too -- constants/rr.ts's RR_CALENDARS keeps its serviceId mapping (which
// room maps to which service is still a static fact about this site's three
// rooms), but no longer owns the price or payment flag, so toggling either
// in Settings takes effect here without a deploy.
export const getServices = async (): Promise<RrService[]> => {
  const { data } = await rrClient.get<RrService[]>(
    `/api/locations/${RR_LOCATION_ID}/services`
  )
  return data.filter((service) => service.isActive)
}

export type GetAvailableSlotsRawInput = {
  assignedUserId: string
  calendarId: string
  serviceId: string
  start: string // ISO 8601, UTC
  end: string
  durationMinutes: number
}

// Returns the slot start times RR Dashboard has already computed as
// genuinely bookable -- staff working hours, existing bookings, and (for
// "Całe Studio") both rooms' resources are all checked server-side now, none
// of that logic lives in this codebase anymore.
export const getAvailableSlotsRaw = async (
  input: GetAvailableSlotsRawInput
): Promise<Date[]> => {
  const { data } = await rrClient.get<{ slots: string[] }>(
    `/api/locations/${RR_LOCATION_ID}/availability`,
    { params: input }
  )

  return data.slots.map((slot) => new Date(slot))
}

export type CreateAppointmentInput = {
  calendarId: string
  serviceId: string
  assignedUserId: string
  startTime: string // ISO 8601 with timezone offset
  endTime: string
  title: string
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  addOns?: { addOnId: string; quantity: number }[]
  formId?: string
  formResponses?: Record<string, unknown>
  // Omit entirely when the service requires online payment -- RR Dashboard
  // forces the appointment to "pending_payment" server-side in that case
  // and ignores whatever status is sent; sending 'confirmed' unconditionally
  // would be irrelevant there but is still the correct, explicit value for
  // every pay-in-person booking (today's only behavior until this flag
  // exists), so callers opt out rather than this function guessing.
  requiresOnlinePayment?: boolean
}

export type CreateAppointmentResponse = {
  id: string
  paymentClientSecret?: string
  stripeAccountId?: string
}

// RR Dashboard upserts the contact itself from customerName/Email/Phone --
// unlike GHL, there's no separate "create a contact, then book against its
// id" step. assignedUserId has to be passed here too (not just to the
// availability check above) -- RR Dashboard only enforces staff working
// hours server-side on a write when assignedUserId is set; omitting it here
// would silently skip that check even though the availability read used it.
export const createAppointment = async (
  input: CreateAppointmentInput
): Promise<CreateAppointmentResponse> => {
  const { data } = await rrClient.post<CreateAppointmentResponse>(
    `/api/locations/${RR_LOCATION_ID}/appointments`,
    {
      calendarId: input.calendarId,
      serviceId: input.serviceId,
      assignedUserId: input.assignedUserId,
      eventType: 'appointment',
      status: input.requiresOnlinePayment ? undefined : 'confirmed',
      title: input.title,
      startTime: input.startTime,
      endTime: input.endTime,
      notes: input.notes,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      addOns: input.addOns,
      formId: input.formId,
      formResponses: input.formResponses,
    }
  )

  return data
}
