import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import {
  EventCategory,
  EventsBoardProps,
} from 'components/organisms/EventsBoard'

import { toImage } from 'utils/format/toImage'
import { pickFromSeed } from 'utils/pickFromSeed'

export const useFormatQueryData = (cmsData: Queries.WydarzeniaQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.wydarzeniaFields!

    const EVENTS_BOARD_DATA = {
      eyebrow: FIELDS.wydarzeniaEyebrow!,
      heading: FIELDS.wydarzeniaHeading!,
      lead: FIELDS.wydarzeniaLead!,
      categories:
        cmsData.types?.nodes?.map((term) => ({
          id: term.slug as EventCategory,
          label: term.name!,
        }))! || [],
      events:
        cmsData.events?.nodes?.map((event) => ({
          id: event.slug!,
          title: event.title!,
          date: event.wydarzenieFields?.date!,
          // Only "Zewnętrzne"/"Solein" exist as taxonomy terms today —
          // if a third type is ever added, EventsBoard's tag styling
          // (TypeTag/UpcomingDot) needs a real color per term, not just
          // this cast.
          type: event.wydarzenieTypy?.nodes?.[0]?.slug as EventCategory,
          tone: pickFromSeed(event.slug!, PHOTO_FRAME_TONES),
          image: toImage(event.wydarzenieFields?.photo, event.title!),
          description: event.wydarzenieFields?.description!,
        }))! || [],
      upcomingHeading: 'Nadchodzące wydarzenia',
      emptyLabel: 'Brak wydarzeń w tym miesiącu.',
      upcomingEmptyLabel: 'Brak zaplanowanych nadchodzących wydarzeń.',
    } satisfies EventsBoardProps

    return { EVENTS_BOARD_DATA }
  }, [JSON.stringify(cmsData)])
}
