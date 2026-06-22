import { useMemo } from 'react'

import { ContactProps } from 'components/organisms/Contact'

export const useFormatQueryData = (cmsData: Queries.KontaktQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.kontaktFields!
    const KONTAKT = cmsData.wp?.ustawieniaGlobalne?.kontakt!

    const CONTACT_DATA = {
      eyebrow: FIELDS.eyebrow!,
      heading: FIELDS.heading!,
      lead: FIELDS.lead!,
      photoLabel: `${KONTAKT.addressLine1} · ${KONTAKT.addressLine2}`,
      address: `${KONTAKT.addressLine1}, ${KONTAKT.addressLine2}`,
      hours: KONTAKT.hours!,
      parking: KONTAKT.parkingNote!,
      email: KONTAKT.email!,
      phone: KONTAKT.phone!,
    } satisfies ContactProps

    return { CONTACT_DATA }
  }, [JSON.stringify(cmsData)])
}
