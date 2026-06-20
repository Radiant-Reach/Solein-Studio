import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { EventsBoardProps } from 'components/organisms/EventsBoard'

import { EVENTS } from 'constants/events'

import { pickFromSeed } from 'utils/pickFromSeed'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const EVENTS_BOARD_DATA = {
      eyebrow: 'Kalendarz wydarzeń',
      heading: 'Wydarzenia u <span class="styled">nas</span>',
      lead: 'Przegląd wydarzeń odbywających się w Soleil Studio — naszych własnych i organizowanych przez gości studia.',
      categories: [
        { id: 'zewnetrzne', label: 'Zewnętrzne' },
        { id: 'solein', label: 'Solein' },
      ],
      events: EVENTS.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        type: event.type,
        tone: pickFromSeed(event.id, PHOTO_FRAME_TONES),
        description: event.description,
      })),
      upcomingHeading: 'Nadchodzące wydarzenia',
      emptyLabel: 'Brak wydarzeń w tym miesiącu.',
      upcomingEmptyLabel: 'Brak zaplanowanych nadchodzących wydarzeń.',
    } satisfies EventsBoardProps

    return { EVENTS_BOARD_DATA }
  }, [])
}
