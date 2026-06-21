import { useMemo } from 'react'

import { BookingProps } from 'components/organisms/Booking'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const BOOKING_DATA = {
      eyebrow: 'Rezerwacja',
      heading: 'Zarezerwuj swój dzień w <span class="styled">słońcu</span>',
      lead: 'Wybierz termin i salę — potwierdzimy dostępność i odezwiemy się z dalszymi szczegółami.',
      src: 'https://links.radiantreach.agency/booking/soleil-studio-x6mjd2dx7so?heightMode=full&showHeader=false',
    } satisfies BookingProps

    return { BOOKING_DATA }
  }, [])
}
