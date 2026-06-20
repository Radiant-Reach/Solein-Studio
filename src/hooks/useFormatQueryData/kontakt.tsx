import { useMemo } from 'react'

import { ContactProps } from 'components/organisms/Contact'

import { CONTACT } from 'constants/brand'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const CONTACT_DATA = {
      eyebrow: 'Kontakt',
      heading: 'Zarezerwuj swój <span class="styled">dzień</span>',
      lead: 'Opowiedz nam o swoim wydarzeniu — odpowiemy w ciągu 24 godzin.',
      photoLabel: CONTACT.addressLines.join(' · '),
      address: CONTACT.addressLines.join(', '),
      hours: 'Pon–Sob, 8:00 – 22:00',
      parking: 'Bezpłatny parking przy budynku',
      email: CONTACT.email,
      phone: CONTACT.phone,
    } satisfies ContactProps

    return { CONTACT_DATA }
  }, [])
}
