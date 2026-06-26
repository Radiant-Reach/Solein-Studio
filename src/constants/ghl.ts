export const GHL_LOCATION_ID = '7MfabSjyJOaPp1679hg2'

export type GhlRoomId = 'zachod' | 'wschod' | 'studio'

export const GHL_SERVICES: Record<
  GhlRoomId,
  {
    serviceId: string
    resourceIds: string[]
    // The team member GHL has assigned to this service — used to look up
    // their real working-hours schedule (`/calendars/schedules/search`)
    // instead of guessing business hours. Each room currently has its
    // own staff member with its own schedule (e.g. Całe Studio's staff
    // only works 08:00–17:00, the individual rooms' staff 08:00–21:00),
    // so a single hardcoded business-hours constant doesn't hold.
    staffId: string
    label: string
    price: number
  }
> = {
  zachod: {
    serviceId: '6a36f64c42b3186c1bfcc566',
    resourceIds: ['6a3d46ddf0464fb9b2776f98'],
    staffId: 'YnFBbO48RfYZPEK51o84',
    label: 'Wynajem Sala Zachód',
    price: 140,
  },
  wschod: {
    serviceId: '6a36f6527a6c027b57377f73',
    resourceIds: ['6a3d46d4ff349c6e406289bc'],
    staffId: 'n7ckKpyhTN09pvXaufYm',
    label: 'Wynajem Sala Wschód',
    price: 140,
  },
  studio: {
    serviceId: '6a36f67edbf106f7ea2b7599',
    resourceIds: ['6a3d46d4ff349c6e406289bc', '6a3d46ddf0464fb9b2776f98'],
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
  id: string
  label: string
  description?: string
  pricePerUnit: number
  // Each unit's length in minutes. Only set on add-ons that occupy the
  // room itself (extend the actual booked/blocked window) — omitted
  // entirely for add-ons that don't touch the room's calendar (e.g. the
  // makeup station can be used before the booked slot starts, so its
  // hours never get sent as `duration` to GHL and never factor into our
  // own cross-resource conflict computation).
  unitDurationMinutes?: number
  allowsQuantity: boolean
}

export const GHL_ADD_ONS: Record<GhlAddOnId, GhlAddOn> = {
  'extra-hours': {
    id: '6a36f6cacf7fefb95cdb9ee6',
    label: 'Dodatkowe godziny wynajęcia',
    description:
      'Studio działa od 8.00 do 20.00, ale w przypadku eventów, warsztatów czy wydarzeń możemy otworzyć szybciej i zamknąć później. Jeżeli chcesz zorganizować u nas swoje wydarzenie, napisz wiadomość podczas finalizacji rezerwacji i wszystko ustalimy.',
    pricePerUnit: 140,
    unitDurationMinutes: 60,
    allowsQuantity: true,
  },
  lighting: {
    id: '6a3ab057edee28d62ac4d251',
    label: 'Wynajęcie sprzętu: Oświetlenie',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  'extra-equipment': {
    id: '6a3ab06ac6e7ffb4787631d9',
    label: 'Wynajęcie sprzętu: Wyposażenie dodatkowe',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  modifiers: {
    id: '6a3ab07ce16da4f055e1e318',
    label: 'Wynajęcie sprzętu: Modyfikatory',
    pricePerUnit: 0,
    allowsQuantity: false,
  },
  'makeup-station': {
    id: '6a3ab0eead47f0a9263b2b37',
    label: 'Stanowisko do makijażu',
    description:
      'Dopłata obowiązuje tylko wtedy, gdy chcesz skorzystać ze stanowiska przed czasem rezerwacji sali. W trakcie wynajmu sali stanowisko jest dostępne bezpłatnie.',
    pricePerUnit: 50,
    allowsQuantity: true,
  },
}

export const SLOT_DURATION_MINUTES = 60
