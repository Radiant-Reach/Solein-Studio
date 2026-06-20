import { useMemo } from 'react'

import { PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import {
  EventPhoto,
  EventPossibilitiesProps,
} from 'components/organisms/EventPossibilities'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

const RANDOM_TONES = [
  'terracotta',
  'espresso',
  'brick',
] satisfies PhotoFrameTone[]

export const useFormatQueryData = () => {
  return useMemo(() => {
    const PHOTO_IDS = [
      slugify('Urodziny balony'),
      slugify('Urodziny slodki stol'),
      slugify('Urodziny photo corner'),
    ]

    const PHOTOS = PHOTO_IDS.map((id) => ({
      id,
      tone: pickFromSeed(id, RANDOM_TONES),
    })) satisfies EventPhoto[]

    const POSSIBILITIES = [
      {
        id: slugify('Przestrzen do dekoracji'),
        title: 'Przestrzeń do dekoracji',
        description:
          'Udekoruj salę według własnego pomysłu — balony, baner, słodki stół. Dajemy pełną swobodę.',
      },
      {
        id: slugify('Catering i tort'),
        title: 'Catering i tort',
        description:
          'Skorzystaj z własnego cateringu lub poproś nas o rekomendację sprawdzonych dostawców z Wrocławia.',
      },
      {
        id: slugify('Muzyka i naglosnienie'),
        title: 'Muzyka i nagłośnienie',
        description:
          'Podstawowe nagłośnienie w cenie wynajmu — puszczaj playlistę przez całą imprezę.',
      },
      {
        id: slugify('Miejsce na zdjecia'),
        title: 'Miejsce na zdjęcia',
        description:
          'Naturalne światło i neutralne tło sali świetnie sprawdzą się jako photo corner.',
      },
      {
        id: slugify('Elastyczny czas'),
        title: 'Elastyczny czas',
        description:
          'Wynajem od 2 godzin, z możliwością wydłużenia na pół dnia lub cały dzień.',
      },
      {
        id: slugify('Dla kazdej grupy wiekowej'),
        title: 'Dla każdej grupy wiekowej',
        description:
          'Sala sprawdzi się na urodziny dzieci, młodzieży i dorosłych — dopasujemy układ do Twoich gości.',
      },
    ]

    const EVENT_POSSIBILITIES_DATA = {
      eyebrow: 'Możliwości wydarzeń',
      heading: 'Urodziny w stylu <span class="styled">Soleil</span>',
      lead: 'Sala pełna naturalnego światła, gotowa na balony, tort i wszystkie selfie dnia — zorganizuj niezapomniane urodziny w sercu Wrocławia.',
      photos: PHOTOS,
      possibilities: POSSIBILITIES,
    } satisfies EventPossibilitiesProps

    const CTA_BANNER_DATA = {
      heading: 'Zarezerwuj salę na wymarzone urodziny',
      text: 'Napisz do nas — odpowiemy w ciągu 24 godzin i pomożemy dobrać termin dla Twoich urodzin.',
      ctaLabel: 'Zapytaj o termin',
      ctaTo: '/rezerwacja',
    } satisfies CtaBannerProps

    return { EVENT_POSSIBILITIES_DATA, CTA_BANNER_DATA }
  }, [])
}
