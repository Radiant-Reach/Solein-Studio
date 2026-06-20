import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { RoomsOverviewProps } from 'components/organisms/RoomsOverview'

import { ROOM_OVERVIEW_CARDS } from 'constants/roomsOverview'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const ROOMS_OVERVIEW_DATA = {
      eyebrow: 'Nasze sale',
      heading: 'Dwa wnętrza, <span class="styled">jedno</span> słońce',
      rooms: ROOM_OVERVIEW_CARDS.map((card) => ({
        ...card,
        tone: pickFromSeed(slugify(`${card.title} hero`), PHOTO_FRAME_TONES),
        ctaLabel: 'Poznaj salę',
      })),
    } satisfies RoomsOverviewProps

    return { ROOMS_OVERVIEW_DATA }
  }, [])
}
