import slugify from 'utils/slugify'

export type RoomPricingRow = {
  id: string
  label: string
  price: string
  highlight?: boolean
}

// Real per-room rates, matching the "Wynajem jednej sali" plan on /cennik.
export const ROOM_PRICING_ROWS: RoomPricingRow[] = [
  { id: slugify('1 godzina sala'), label: '1 godzina', price: '140 zł' },
  { id: slugify('2 godziny sala'), label: '2 godziny', price: '280 zł' },
  { id: slugify('3 godziny sala'), label: '3 godziny', price: '420 zł' },
  { id: slugify('4 godziny sala'), label: '4 godziny', price: '560 zł' },
  { id: slugify('5 godzin sala'), label: '5 godzin', price: '700 zł' },
  {
    id: slugify('Caly dzien sala'),
    label: 'Cały dzień (8.00–20.00)',
    price: '1200 zł',
    highlight: true,
  },
]
