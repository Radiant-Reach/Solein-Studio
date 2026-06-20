import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { EventDetailProps } from 'components/organisms/EventDetail'

import { EVENTS } from 'constants/events'

import { pickFromSeed } from 'utils/pickFromSeed'

const TYPE_LABELS = {
  zewnetrzne: 'Zewnętrzne',
  solein: 'Solein',
} as const

const formatLongDate = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export const useFormatQueryData = (slug: string) => {
  return useMemo(() => {
    const record = EVENTS.find((event) => event.id === slug)

    if (!record) {
      return { EVENT_DETAIL_DATA: null }
    }

    const EVENT_DETAIL_DATA = {
      backTo: '/wydarzenia',
      backLabel: 'Wszystkie wydarzenia',
      type: record.type,
      typeLabel: TYPE_LABELS[record.type],
      title: record.title,
      date: formatLongDate(record.date),
      time: record.time,
      location: record.location,
      description: record.longDescription,
      tone: pickFromSeed(record.id, PHOTO_FRAME_TONES),
    } satisfies EventDetailProps

    return { EVENT_DETAIL_DATA }
  }, [slug])
}
