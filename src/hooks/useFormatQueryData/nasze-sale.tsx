import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { RoomsOverviewProps } from 'components/organisms/RoomsOverview'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = (cmsData: Queries.NaszeSaleQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.naszeSaleFields!

    const ROOMS_OVERVIEW_DATA = {
      eyebrow: FIELDS.naszeSaleEyebrow!,
      heading: FIELDS.naszeSaleHeading!,
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

    return { ROOMS_OVERVIEW_DATA }
  }, [JSON.stringify(cmsData)])
}
