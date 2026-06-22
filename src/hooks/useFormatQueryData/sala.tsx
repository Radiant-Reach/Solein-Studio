import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { RoomDetailsProps } from 'components/organisms/Room/Details'
import { RoomGalleryProps } from 'components/organisms/Room/Gallery'
import { RoomHeroProps } from 'components/organisms/Room/Hero'
import { RoomPricingProps } from 'components/organisms/Room/Pricing'
import { StudioEquipmentProps } from 'components/organisms/StudioEquipment'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

// One generic hook serves every "Sala" post (the template is created once
// per post by create/pages/sala.ts) — there's no per-room hook anymore.
export const useFormatQueryData = (cmsData: Queries.SalaQuery) => {
  return useMemo(() => {
    const SALA = cmsData.sala?.salaFields!
    const SLUG = cmsData.sala?.slug!
    const NAME = cmsData.sala?.title!
    const GLOBAL = cmsData.wp?.ustawieniaGlobalne!

    const HERO_PHOTO_ID = slugify(`${SLUG} hero`)

    const ROOM_HERO_DATA = {
      backTo: '/nasze-sale',
      backLabel: 'Wszystkie sale',
      eyebrow: SALA.tagline!,
      name: NAME,
      description: SALA.description!,
      heroTone: pickFromSeed(HERO_PHOTO_ID, PHOTO_FRAME_TONES),
      heroImage: toImage(SALA.heroPhoto, NAME),
      primaryCtaLabel: SALA.heroPrimaryCta?.title!,
      primaryCtaTo: SALA.heroPrimaryCta?.url!,
      secondaryCtaLabel: SALA.heroSecondaryCta?.title!,
      secondaryCtaTo: SALA.heroSecondaryCta?.url!,
    } satisfies RoomHeroProps

    const ROOM_GALLERY_DATA = {
      photos:
        SALA.gallery?.map((photo, index) => {
          const id = slugify(`${SLUG} galeria ${index + 1}`)
          return {
            id,
            tone: pickFromSeed(id, PHOTO_FRAME_TONES),
            image: toImage(photo, NAME),
          }
        }) || [],
    } satisfies RoomGalleryProps

    const ROOM_DETAILS_DATA = {
      specsEyebrow: SALA.specsEyebrow!,
      specsHeading: SALA.specsHeading!,
      specs:
        SALA.specs?.map((spec) => ({
          id: slugify(spec?.label!),
          label: spec?.label!,
          value: spec?.value!,
        }))! || [],
      amenitiesEyebrow: SALA.amenitiesEyebrow!,
      amenitiesHeading: SALA.amenitiesHeading!,
      amenities:
        SALA.amenities?.map((amenity) => ({
          id: slugify(amenity?.label!),
          icon: amenity?.icon?.sourceUrl!,
          label: amenity?.label!,
        }))! || [],
    } satisfies RoomDetailsProps

    const ROOM_PRICING_DATA = {
      eyebrow: SALA.pricingEyebrow!,
      heading: SALA.pricingHeading!,
      lead: SALA.pricingLead!,
      rows:
        GLOBAL.cennikWspolny?.pojedynczaSala?.map((row) => ({
          id: slugify(row?.label!),
          label: row?.label!,
          price: row?.price!,
          highlight: row?.highlight!,
        }))! || [],
      primaryCtaLabel: SALA.pricingPrimaryCta?.title!,
      primaryCtaTo: SALA.pricingPrimaryCta?.url!,
      secondaryCtaLabel: SALA.pricingSecondaryCta?.title!,
      secondaryCtaTo: SALA.pricingSecondaryCta?.url!,
    } satisfies RoomPricingProps

    const EQUIPMENT_DATA = {
      eyebrow: SALA.equipmentEyebrow!,
      heading: SALA.equipmentHeading!,
      lead: SALA.equipmentLead!,
      categories:
        GLOBAL.wyposazenie?.categories?.map((category) => ({
          id: slugify(category?.title!),
          title: category?.title!,
          items:
            category?.items?.map((item) => ({
              id: slugify(item?.text!),
              text: item?.text!,
            }))! || [],
        }))! || [],
    } satisfies StudioEquipmentProps

    return {
      ROOM_HERO_DATA,
      ROOM_GALLERY_DATA,
      ROOM_DETAILS_DATA,
      ROOM_PRICING_DATA,
      EQUIPMENT_DATA,
    }
  }, [JSON.stringify(cmsData)])
}
