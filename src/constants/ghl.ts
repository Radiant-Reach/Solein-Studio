export const GHL_LOCATION_ID = '7MfabSjyJOaPp1679hg2'

export type GhlRoomId = 'zachod' | 'wschod' | 'studio'

// Classic GHL Calendars (not the "Service Menu" feature) — each room is
// its own calendar with its own assigned team member. Classic calendars'
// `/free-slots` endpoint correctly computes real availability from that
// team member's schedule, unlike Service Menu bookings (confirmed live:
// that path's schedules had an empty `calendarIds` link, so GHL's own
// availability check rejected every slot regardless of correctness).
export const GHL_CALENDARS: Record<
  GhlRoomId,
  { calendarId: string; label: string; price: number }
> = {
  zachod: {
    calendarId: '2TPSootBZjyb1kZ86aLa',
    label: 'Wynajem Sala Zachód',
    price: 140,
  },
  wschod: {
    calendarId: 'Uq30Zy5hNFsuwVwrBnyd',
    label: 'Wynajem Sala Wschód',
    price: 140,
  },
  studio: {
    calendarId: 'roWuwGwZhJdhFrJ542Yn',
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
