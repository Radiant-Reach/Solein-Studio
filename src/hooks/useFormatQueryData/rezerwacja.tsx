import { useMemo } from 'react'

import { BookingProps } from 'components/organisms/Booking'

// The GHL booking iframe URL has no ACF field (removed deliberately — it's
// an integration detail, not editorial content) and stays hardcoded here.
const BOOKING_SRC =
  'https://links.radiantreach.agency/booking/soleil-studio-x6mjd2dx7so?heightMode=full&showHeader=false'

export const useFormatQueryData = (cmsData: Queries.RezerwacjaQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.rezerwacjaFields!

    const BOOKING_DATA = {
      eyebrow: FIELDS.rezerwacjaEyebrow!,
      heading: FIELDS.rezerwacjaHeading!,
      lead: FIELDS.rezerwacjaLead!,
      src: BOOKING_SRC,
    } satisfies BookingProps

    return { BOOKING_DATA }
  }, [JSON.stringify(cmsData)])
}
