import { useMemo } from 'react'

import { BookingProps } from 'components/organisms/Booking'

import { GhlRoomId } from 'constants/ghl'

import { toImage } from 'utils/format/toImage'

export const useFormatQueryData = (cmsData: Queries.RezerwacjaQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.rezerwacjaFields!

    // "Całe Studio" has no single matching Sala post, so it keeps the
    // PhotoFrame placeholder tone — only the two real rooms get a photo.
    const ROOM_IMAGES: BookingProps['roomImages'] = {}

    cmsData.rooms?.nodes?.forEach((sala) => {
      const title = sala.title?.toLowerCase() ?? ''
      // Match by title, not slug — "Sala Zachód" currently has a stale
      // numeric fallback slug ("61") from a known WP content issue, so
      // slug matching would silently miss its photo.
      const id: GhlRoomId | undefined = title.includes('zachód')
        ? 'zachod'
        : title.includes('wschód')
          ? 'wschod'
          : undefined

      if (id) {
        ROOM_IMAGES[id] = toImage(sala.salaFields?.heroPhoto, sala.title!)
      }
    })

    const BOOKING_DATA = {
      eyebrow: FIELDS.rezerwacjaEyebrow!,
      heading: FIELDS.rezerwacjaHeading!,
      lead: FIELDS.rezerwacjaLead!,
      roomImages: ROOM_IMAGES,
    } satisfies BookingProps

    return { BOOKING_DATA }
  }, [JSON.stringify(cmsData)])
}
