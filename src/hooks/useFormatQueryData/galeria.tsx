import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { GalleryProps, GalleryShot } from 'components/organisms/Gallery'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const GALLERY_FILTERS = [
      { id: 'all', label: 'Wszystko' },
      { id: 'wschod', label: 'Sala Wschód' },
      { id: 'zachod', label: 'Sala Zachód' },
      { id: 'eventy', label: 'Eventy' },
    ]

    const GALLERY_SHOTS_BASE = [
      {
        id: slugify('Sala Wschod jasne wnetrze'),
        category: 'wschod',
        colSpan: 2 as const,
        rowSpan: 2 as const,
      },
      {
        id: slugify('Wieczorny event w espresso tonach'),
        category: 'eventy',
      },
      {
        id: slugify('Sala Zachod terakota'),
        category: 'zachod',
      },
      {
        id: slugify('Sala Zachod ciemny akcent'),
        category: 'zachod',
      },
      {
        id: slugify('Sala Wschod krem'),
        category: 'wschod',
      },
      {
        id: slugify('Event w slonecznym pomaranczu'),
        category: 'eventy',
        colSpan: 2 as const,
      },
      {
        id: slugify('Sala Wschod piaskowy odcien'),
        category: 'wschod',
      },
      {
        id: slugify('Sala Zachod terakota detal'),
        category: 'zachod',
      },
      {
        id: slugify('Event espresso detal'),
        category: 'eventy',
      },
    ]

    const GALLERY_SHOTS = GALLERY_SHOTS_BASE.map((shot) => ({
      ...shot,
      tone: pickFromSeed(shot.id, PHOTO_FRAME_TONES),
    })) satisfies GalleryShot[]

    const GALLERY_DATA = {
      eyebrow: 'Galeria',
      heading: 'Studio w <span class="styled">kadrach</span>',
      lead: 'Zajrzyj do środka — światło, detale i prawdziwe wydarzenia w Soleil.',
      filters: GALLERY_FILTERS,
      shots: GALLERY_SHOTS,
    } satisfies GalleryProps

    return { GALLERY_DATA }
  }, [])
}
