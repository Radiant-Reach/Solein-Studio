import slugify from 'utils/slugify'

const toItems = (texts: string[]) =>
  texts.map((text) => ({ id: slugify(text), text }))

// Shared studio-wide equipment list — identical across all room pages, so it
// lives here once instead of being duplicated in every room's data hook.
export const EQUIPMENT_CATEGORIES = [
  {
    id: slugify('Oswietlenie'),
    title: 'Oświetlenie',
    items: toItems([
      '2 x Nanlite FS-300B Bicolor (stałe)',
      '1 x Glare one led 600d (stałe)',
      '1 x Quadralite Pulse X 600 (błyskowe)',
      '1 x Quadralite Move X 300 (błyskowe)',
      '1 x Latarka ze zmiennymi barwami temperatury',
      '1 x Lampa LED Newell Tara 40 RGB',
      '1 x Wyzwalacz Quadralite Navigator X2 do Canon',
      '1 x Wyzwalacz Quadralite Stroboss Navigator uniwersalny',
    ]),
  },
  {
    id: slugify('Wyposazenie dodatkowe'),
    title: 'Wyposażenie dodatkowe',
    items: toItems([
      '2 x statyw do telefonu',
      '1 x prompter mini',
      '1 x projektor z tłem',
      '1 x biała pościel do zdjeć',
      '1 x wiatrak',
      '1 x statyw fotograficzny 170cm K&F Concept',
      '1 x mini mikrofony DJI Mic Mini',
    ]),
  },
  {
    id: slugify('Modyfikatory'),
    title: 'Modyfikatory',
    items: toItems([
      '1 x Newell Strumienica optyczna Perseo-33',
      '1 x panel dyfuzyjny',
      '1 x blenda zakrzywiona',
      '1 x softbox sferyczny 85 cm YONGNUO',
      '1 x softbox sferyczny 65 cm YONGNUO',
      '1 x Softbox oktagonalny GlareOne 120 cm',
      '1 x Beauty dish 42 cm',
      '1 x blenda owalna 5w1 110 cm',
    ]),
  },
]
