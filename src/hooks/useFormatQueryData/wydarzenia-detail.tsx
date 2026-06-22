import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { EventDetailProps } from 'components/organisms/EventDetail'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

const formatLongDate = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

// One generic hook serves every "Wydarzenie" post (the template is created
// once per post by create/pages/wydarzenie.ts) — the page only ever exists
// for a real slug, so there's no "not found" branch to handle here.
export const useFormatQueryData = (cmsData: Queries.WydarzenieQuery) => {
  return useMemo(() => {
    const record = cmsData.wydarzenie!
    const term = record.wydarzenieTypy?.nodes?.[0]

    const EVENT_DETAIL_DATA = {
      backTo: '/wydarzenia',
      backLabel: 'Wszystkie wydarzenia',
      type: term?.slug as EventDetailProps['type'],
      typeLabel: term?.name!,
      title: record.title!,
      date: formatLongDate(record.wydarzenieFields?.date!),
      time: record.wydarzenieFields?.time!,
      location: record.wydarzenieFields?.location!,
      description: record.wydarzenieFields?.longDescription!,
      tone: pickFromSeed(slugify(record.title!), PHOTO_FRAME_TONES),
      image: toImage(record.wydarzenieFields?.photo, record.title!),
    } satisfies EventDetailProps

    return { EVENT_DETAIL_DATA }
  }, [JSON.stringify(cmsData)])
}
