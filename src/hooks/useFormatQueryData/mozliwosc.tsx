import { useMemo } from 'react'

import { PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import {
  EventPhoto,
  EventPossibilitiesProps,
} from 'components/organisms/EventPossibilities'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

const RANDOM_TONES = [
  'terracotta',
  'espresso',
  'brick',
] satisfies PhotoFrameTone[]

// One generic hook serves every "Mozliwosc" post (the template is created
// once per post by create/pages/mozliwosc.ts) — there's no per-occasion
// hook anymore ("Urodziny" was just one example).
export const useFormatQueryData = (cmsData: Queries.MozliwoscQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.mozliwosc?.mozliwoscFields!
    const SLUG = cmsData.mozliwosc?.title!

    const PHOTOS =
      FIELDS.photos?.map((photo, index) => {
        const id = slugify(`${SLUG} photo ${index + 1}`)
        return {
          id,
          tone: pickFromSeed(id, RANDOM_TONES),
          image: toImage(photo, SLUG),
        }
      }) || ([] satisfies EventPhoto[])

    const EVENT_POSSIBILITIES_DATA = {
      eyebrow: FIELDS.eyebrow!,
      heading: FIELDS.heading!,
      lead: FIELDS.lead!,
      photos: PHOTOS,
      possibilities:
        FIELDS.items?.map((item) => ({
          id: slugify(item?.title!),
          title: item?.title!,
          description: item?.description!,
        }))! || [],
    } satisfies EventPossibilitiesProps

    const CTA_BANNER_DATA = {
      heading: FIELDS.ctaBanner?.heading!,
      text: FIELDS.ctaBanner?.text!,
      ctaLabel: FIELDS.ctaBanner?.cta?.title!,
      ctaTo: FIELDS.ctaBanner?.cta?.url!,
    } satisfies CtaBannerProps

    return { EVENT_POSSIBILITIES_DATA, CTA_BANNER_DATA }
  }, [JSON.stringify(cmsData)])
}
