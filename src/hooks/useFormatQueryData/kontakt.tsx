import { useMemo } from 'react'

import { ContactProps } from 'components/organisms/Contact'

export const useFormatQueryData = (cmsData: Queries.KontaktQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.kontaktFields!
    const KONTAKT = cmsData.wp?.ustawieniaGlobalne?.kontakt!

    const CONTACT_DATA = {
      eyebrow: FIELDS.kontaktEyebrow!,
      heading: FIELDS.kontaktHeading!,
      lead: FIELDS.kontaktLead!,
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
