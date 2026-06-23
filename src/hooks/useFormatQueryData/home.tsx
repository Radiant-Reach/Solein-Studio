import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import {
  EventsTeaserItem,
  EventsTeaserProps,
} from 'components/organisms/EventsTeaser'
import { GalleryTeaserProps } from 'components/organisms/GalleryTeaser'
import { HomeHeroProps } from 'components/organisms/HomeHero'
import { RoomsOverviewProps } from 'components/organisms/RoomsOverview'
import { StudioIntroProps } from 'components/organisms/StudioIntro'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

const UPCOMING_EVENTS_LIMIT = 3

const formatEventDate = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })

export const useFormatQueryData = (cmsData: Queries.HomeQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.homeFields!
    const INTRO = FIELDS.studioIntro!

    const HOME_HERO_DATA = {
      leftTone: pickFromSeed(slugify('Home hero left'), PHOTO_FRAME_TONES),
      leftImage: toImage(FIELDS.heroLeftPhoto, 'Soleil Studio'),
      rightTone: pickFromSeed(slugify('Home hero right'), PHOTO_FRAME_TONES),
      rightImage: toImage(FIELDS.heroRightPhoto, 'Soleil Studio'),
      ctaLabel: FIELDS.heroCta?.title!,
      ctaTo: FIELDS.heroCta?.url!,
    } satisfies HomeHeroProps

    const ROOMS_OVERVIEW_DATA = {
      eyebrow: FIELDS.roomsEyebrow!,
      heading: FIELDS.roomsHeading!,
      rooms:
        cmsData.rooms?.nodes?.map((sala) => ({
          id: sala.slug!,
          tone: pickFromSeed(slugify(`${sala.title} hero`), PHOTO_FRAME_TONES),
          image: toImage(sala.salaFields?.heroPhoto, sala.title!),
          tagLabel: sala.salaFields?.tagline!,
          tagColor: sala.salaFields?.tagColor!,
          eyebrow: sala.salaFields?.capacityLabel!,
          title: sala.title!,
          description: sala.salaFields?.shortDescription!,
          ctaLabel: 'Poznaj salę',
          ctaTo: `/nasze-sale/${sala.slug}`,
        }))! || [],
    } satisfies RoomsOverviewProps

    const todayIso = new Date().toISOString().slice(0, 10)

    const EVENTS_TEASER_DATA = {
      eyebrow: FIELDS.eventsEyebrow!,
      heading: FIELDS.eventsHeading!,
      lead: FIELDS.eventsLead!,
      events:
        cmsData.events?.nodes
          ?.filter((event) => event.wydarzenieFields?.date! >= todayIso)
          .slice(0, UPCOMING_EVENTS_LIMIT)
          .map((event) => {
            const term = event.wydarzenieTypy?.nodes?.[0]

            return {
              id: event.slug!,
              title: event.title!,
              date: formatEventDate(event.wydarzenieFields?.date!),
              type: term?.slug as EventsTeaserItem['type'],
              typeLabel: term?.name!,
              tone: pickFromSeed(event.slug!, PHOTO_FRAME_TONES),
              image: toImage(event.wydarzenieFields?.photo, event.title!),
            }
          })! || [],
      emptyLabel: 'Brak zaplanowanych wydarzeń.',
      ctaLabel: FIELDS.eventsCta?.title!,
      ctaTo: FIELDS.eventsCta?.url!,
    } satisfies EventsTeaserProps

    const HERO_PHOTOS =
      INTRO.heroPhotos?.map((photo, index) => {
        const id = slugify(`Home hero photo ${index + 1}`)
        return {
          id,
          tone: pickFromSeed(id, PHOTO_FRAME_TONES),
          image: toImage(photo, INTRO.heading!),
        }
      }) || []

    const STUDIO_INTRO_DATA = {
      eyebrow: INTRO.eyebrow!,
      heading: INTRO.heading!,
      lead: INTRO.lead!,
      paragraphs:
        INTRO.paragraphs?.map((paragraph) => ({
          id: slugify(paragraph?.text!.slice(0, 40)),
          text: paragraph?.text!,
        }))! || [],
      heroPhotos: HERO_PHOTOS,
      features:
        INTRO.features?.map((feature) => ({
          id: slugify(feature?.heading!),
          eyebrow: feature?.eyebrow!,
          heading: feature?.heading!,
          body: feature?.body!,
          tone: pickFromSeed(slugify(feature?.heading!), PHOTO_FRAME_TONES),
          image: toImage(feature?.photo, feature?.heading!),
        }))! || [],
      ctaText: INTRO.ctaText!,
      ctaLabel: INTRO.cta?.title!,
      ctaTo: INTRO.cta?.url!,
    } satisfies StudioIntroProps

    const GALLERY_TEASER_DATA = {
      eyebrow: FIELDS.galleryEyebrow!,
      heading: FIELDS.galleryHeading!,
      lead: FIELDS.galleryLead!,
      photos:
        FIELDS.galleryPhotos?.map((photo, index) => {
          const id = slugify(`Home galeria ${index + 1}`)
          return {
            id,
            tone: pickFromSeed(id, PHOTO_FRAME_TONES),
            image: toImage(photo, FIELDS.galleryHeading!),
          }
        }) || [],
      ctaLabel: FIELDS.galleryCta?.title!,
      ctaTo: FIELDS.galleryCta?.url!,
    } satisfies GalleryTeaserProps

    const CTA_BANNER_DATA = {
      heading: FIELDS.homeCtaBanner?.heading!,
      text: FIELDS.homeCtaBanner?.text!,
      ctaLabel: FIELDS.homeCtaBanner?.cta?.title!,
      ctaTo: FIELDS.homeCtaBanner?.cta?.url!,
    } satisfies CtaBannerProps

    return {
      HOME_HERO_DATA,
      ROOMS_OVERVIEW_DATA,
      EVENTS_TEASER_DATA,
      STUDIO_INTRO_DATA,
      GALLERY_TEASER_DATA,
      CTA_BANNER_DATA,
    }
  }, [JSON.stringify(cmsData)])
}
