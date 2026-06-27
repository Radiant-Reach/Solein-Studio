export const GHL_LOCATION_ID = '7MfabSjyJOaPp1679hg2'

export type GhlRoomId = 'zachod' | 'wschod' | 'studio'

// Classic GHL Calendars, `calendarType: 'collective'` — each room's
// calendar has a primary team member plus (potentially) other non-primary
// members attached so they show up in every appointment's `users` array.
//
// Collective calendars compute `/free-slots` from the *joint* availability
// of every attached member, not just the primary — confirmed live that
// adding a second, more narrowly-scheduled member shrank a room's real
// bookable hours (08:00–21:00 → 08:00–17:00) purely because of their
// personal schedule, even though they're not the one being booked. So we
// don't use `/free-slots` for hours at all here — `staffId` is the
// *primary* member's id, used to read their own schedule directly via
// `/calendars/schedules/search` and compute real hours ourselves,
// ignoring whoever else is attached. Appointment creation always passes
// `ignoreFreeSlotValidation` for the same reason (see ghl.ts).
export const GHL_CALENDARS: Record<
  GhlRoomId,
  { calendarId: string; staffId: string; label: string; price: number }
> = {
  zachod: {
    calendarId: 'c5gtemCR6OHVNER1Kqfw',
    staffId: 'YnFBbO48RfYZPEK51o84',
    label: 'Wynajem Sala Zachód',
    price: 140,
  },
  wschod: {
    calendarId: 'J0mQVSdtEWNyxWYbPsMn',
    staffId: 'n7ckKpyhTN09pvXaufYm',
    label: 'Wynajem Sala Wschód',
    price: 140,
  },
  studio: {
    calendarId: 'r326KX87VRc9xKNGo0GI',
    staffId: '0eK0YqEl7PVC16RV2fzS',
    label: 'Wynajem Całe Studio',
    price: 240,
  },
}

export type GhlAddOnId =
  | 'extra-hours'
  | 'lighting'
  | 'extra-equipment'
  | 'modifiers'
  | 'makeup-station'

export type GhlAddOn = {
  label: string
  description?: string
  pricePerUnit: number
  // Each unit's length in minutes. Only set on add-ons that occupy the
  // room itself (extend the actual booked/blocked window) — omitted
  // entirely for add-ons that don't touch the room's calendar (e.g. the
  // makeup station can be used before the booked slot starts, so its
  // hours never extend the appointment and never factor into the
  // cross-calendar conflict computation).
  unitDurationMinutes?: number
  allowsQuantity: boolean
}

// Classic Calendar Appointments have no native add-ons concept (that was
// a Service Menu-specific feature) — these stay purely client-side for
// pricing/display, and the selected ones get folded into the
// appointment's description as plain text for staff to see in GHL.
export const GHL_ADD_ONS: Record<GhlAddOnId, GhlAddOn> = {
  'extra-hours': {
    label: 'Dodatkowe godziny wynajęcia',
    description:
      'Studio działa od 8.00 do 20.00, ale w przypadku eventów, warsztatów czy wydarzeń możemy otworzyć szybciej i zamknąć później. Jeżeli chcesz zorganizować u nas swoje wydarzenie, napisz wiadomość podczas finalizacji rezerwacji i wszystko ustalimy.',
    pricePerUnit: 140,
    unitDurationMinutes: 60,
    allowsQuantity: true,
  },
  lighting: {
    label: 'Wynajęcie sprzętu: Oświetlenie',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  'extra-equipment': {
    label: 'Wynajęcie sprzętu: Wyposażenie dodatkowe',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  modifiers: {
    label: 'Wynajęcie sprzętu: Modyfikatory',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  'makeup-station': {
    label: 'Stanowisko do makijażu',
    description:
      'Dopłata obowiązuje tylko wtedy, gdy chcesz skorzystać ze stanowiska przed czasem rezerwacji sali. W trakcie wynajmu sali stanowisko jest dostępne bezpłatnie.',
    pricePerUnit: 50,
    allowsQuantity: true,
  },
}

export const SLOT_DURATION_MINUTES = 60
