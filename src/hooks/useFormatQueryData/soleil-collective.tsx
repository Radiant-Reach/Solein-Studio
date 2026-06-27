import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { StudioIntroProps } from 'components/organisms/StudioIntro'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = (cmsData: Queries.SoleilCollectiveQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.soleilCollectiveFields?.collectiveIntro!

    const HERO_PHOTOS =
      FIELDS.heroPhotos?.map((photo, index) => {
        const id = slugify(`Soleil Collective hero photo ${index + 1}`)
        return {
          id,
          tone: pickFromSeed(id, PHOTO_FRAME_TONES),
          image: toImage(photo, 'Soleil Collective'),
        }
      }) || []

    const STUDIO_INTRO_DATA = {
      eyebrow: FIELDS.eyebrow!,
      heading: FIELDS.heading!,
      lead: FIELDS.lead!,
      paragraphs:
        FIELDS.paragraphs?.map((paragraph) => ({
          id: slugify(paragraph?.text!.slice(0, 40)),
          text: paragraph?.text!,
        }))! || [],
      heroPhotos: HERO_PHOTOS,
      features:
        FIELDS.features?.map((feature) => ({
          id: slugify(feature?.heading!),
          eyebrow: feature?.eyebrow!,
          heading: feature?.heading!,
          body: feature?.body!,
          tone: pickFromSeed(slugify(feature?.heading!), PHOTO_FRAME_TONES),
          image: toImage(feature?.photo, feature?.heading!),
        }))! || [],
      ctaText: FIELDS.ctaText!,
      ctaLabel: FIELDS.cta?.title!,
      ctaTo: FIELDS.cta?.url!,
      variant: 'collective',
    } satisfies StudioIntroProps

    return { STUDIO_INTRO_DATA }
  }, [JSON.stringify(cmsData)])
}
