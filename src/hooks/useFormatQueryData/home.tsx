import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import { EventsTeaserProps } from 'components/organisms/EventsTeaser'
import { GalleryTeaserProps } from 'components/organisms/GalleryTeaser'
import { HomeHeroProps } from 'components/organisms/HomeHero'
import { InstagramTeaserProps } from 'components/organisms/InstagramTeaser'
import { RoomsOverviewProps } from 'components/organisms/RoomsOverview'
import { StudioIntroProps } from 'components/organisms/StudioIntro'

import { SOCIAL_LINKS } from 'constants/brand'
import { EVENTS } from 'constants/events'
import { ROOM_OVERVIEW_CARDS } from 'constants/roomsOverview'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

const EVENT_TYPE_LABELS = {
  zewnetrzne: 'Zewnętrzne',
  solein: 'Solein',
} as const

const UPCOMING_EVENTS_LIMIT = 3

const formatEventDate = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })

export const useFormatQueryData = () => {
  return useMemo(() => {
    const HOME_HERO_DATA = {
      leftTone: pickFromSeed(slugify('Home hero left'), PHOTO_FRAME_TONES),
      rightTone: pickFromSeed(slugify('Home hero right'), PHOTO_FRAME_TONES),
      ctaLabel: 'Zarezerwuj',
      ctaTo: '/kontakt',
    } satisfies HomeHeroProps

    const ROOMS_OVERVIEW_DATA = {
      eyebrow: 'Nasze sale',
      heading: 'Dwa wnętrza, <span class="styled">jedno</span> słońce',
      rooms: ROOM_OVERVIEW_CARDS.map((card) => ({
        ...card,
        tone: pickFromSeed(slugify(`${card.title} hero`), PHOTO_FRAME_TONES),
        ctaLabel: 'Poznaj salę',
      })),
    } satisfies RoomsOverviewProps

    const EVENTS_TEASER_DATA = {
      eyebrow: 'Co u nas',
      heading: 'Wydarzenia u <span class="styled">nas</span>',
      lead: 'Przegląd nadchodzących wydarzeń własnych i organizowanych przez gości studia.',
      events: [...EVENTS]
        .sort((a, b) => a.date.localeCompare(b.date))
        .filter((event) => event.date >= new Date().toISOString().slice(0, 10))
        .slice(0, UPCOMING_EVENTS_LIMIT)
        .map((event) => ({
          id: event.id,
          title: event.title,
          date: formatEventDate(event.date),
          type: event.type,
          typeLabel: EVENT_TYPE_LABELS[event.type],
          tone: pickFromSeed(event.id, PHOTO_FRAME_TONES),
        })),
      ctaLabel: 'Zobacz wszystkie wydarzenia',
      ctaTo: '/wydarzenia',
    } satisfies EventsTeaserProps

    const STUDIO_INTRO_DATA = {
      eyebrow: 'Lokalizacja',
      heading: 'Poznaj Studio <span class="styled">Soleil</span>',
      lead: 'W zabytkowej kamienicy we Wrocławiu znajduje się niemal 100 m² przestrzeni, w której każdy detal daje przestrzeń do tworzenia.',
      paragraphs: [
        {
          id: slugify('Wysokie sufity akcenty'),
          text: 'Wysokie sufity i przemyślane akcenty dekoracyjne pozwalają poczuć komfort i swobodę pracy.',
        },
      ],
      heroPhotos: [
        slugify('Studio wysokie sufity'),
        slugify('Studio francuskie drzwi'),
        slugify('Studio minimalistyczne wnetrze'),
      ].map((id) => ({ id, tone: pickFromSeed(id, PHOTO_FRAME_TONES) })),
      features: [
        {
          id: slugify('Gdzie jestesmy home'),
          eyebrow: 'Gdzie jesteśmy',
          heading: 'W samym sercu <span class="styled" >Wrocławia</span>',
          body: 'Studio znajduje się zaledwie kilka minut od Galerii Dominikańskiej, Dworca PKP i Bastionu Sakwowego, z wygodnym parkowaniem tuż przy budynku.',
          tone: pickFromSeed(slugify('Gdzie jestesmy home'), PHOTO_FRAME_TONES),
        },
        {
          id: slugify('O Soleil home'),
          eyebrow: 'O Soleil',
          heading: 'Wnętrze, które inspiruje',
          body: 'Studio w zabytkowej kamienicy z wysokimi sufitami i francuskimi drzwiami, które wypełniają wnętrze naturalnym światłem.',
          tone: pickFromSeed(slugify('O Soleil home'), PHOTO_FRAME_TONES),
        },
      ],
      ctaText: 'Chcesz dowiedzieć się więcej o studio?',
      ctaLabel: 'Poznaj Studio Soleil',
      ctaTo: '/lokacje/wroclaw',
    } satisfies StudioIntroProps

    const GALLERY_TEASER_DATA = {
      eyebrow: 'Galeria',
      heading: 'Studio w <span class="styled">kadrach</span>',
      lead: 'Zajrzyj do środka Soleil Studio — zdjęcia z sal Wschód i Zachód oraz wydarzeń.',
      photos: Array.from({ length: 12 }, (_, index) =>
        slugify(`Home galeria ${index + 1}`)
      ).map((id) => ({ id, tone: pickFromSeed(id, PHOTO_FRAME_TONES) })),
      ctaLabel: 'Zobacz galerię',
      ctaTo: '/galeria',
    } satisfies GalleryTeaserProps

    const INSTAGRAM_TEASER_DATA = {
      eyebrow: 'Instagram',
      heading: 'Soleil na <span class="styled">Instagramie</span>',
      handle: '@soleilstudio.wro',
      photos: [
        slugify('Home instagram 1'),
        slugify('Home instagram 2'),
        slugify('Home instagram 3'),
        slugify('Home instagram 4'),
        slugify('Home instagram 5'),
        slugify('Home instagram 6'),
      ].map((id) => ({ id, tone: pickFromSeed(id, PHOTO_FRAME_TONES) })),
      ctaLabel: 'Obserwuj nas na Instagramie',
      ctaTo: SOCIAL_LINKS.find((social) => social.id === 'instagram')!.to,
    } satisfies InstagramTeaserProps

    const CTA_BANNER_DATA = {
      heading: 'Zarezerwuj swój dzień w słońcu',
      text: 'Napisz do nas — odpowiemy w ciągu 24 godzin i pomożemy dobrać salę do Twojego wydarzenia.',
      ctaLabel: 'Skontaktuj się',
      ctaTo: '/kontakt',
    } satisfies CtaBannerProps

    return {
      HOME_HERO_DATA,
      ROOMS_OVERVIEW_DATA,
      EVENTS_TEASER_DATA,
      STUDIO_INTRO_DATA,
      GALLERY_TEASER_DATA,
      INSTAGRAM_TEASER_DATA,
      CTA_BANNER_DATA,
    }
  }, [])
}
