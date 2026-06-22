import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { GalleryProps } from 'components/organisms/Gallery'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = (cmsData: Queries.GaleriaQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.galeriaFields!

    const GALLERY_DATA = {
      eyebrow: FIELDS.eyebrow!,
      heading: FIELDS.heading!,
      lead: FIELDS.lead!,
      filters:
        FIELDS.filters?.map((filter) => ({
          id: filter?.filterId!,
          label: filter?.label!,
        }))! || [],
      shots:
        FIELDS.shots?.map((shot, index) => {
          const id = slugify(`${shot?.category} shot ${index + 1}`)

          return {
            id,
            category: shot?.category!,
            tone: pickFromSeed(id, PHOTO_FRAME_TONES),
            image: toImage(shot?.photo, FIELDS.heading!),
            colSpan: shot?.spanWide ? 2 : undefined,
            rowSpan: shot?.spanTall ? 2 : undefined,
          }
        })! || [],
    } satisfies GalleryProps

    return { GALLERY_DATA }
  }, [JSON.stringify(cmsData)])
}
