import { useMemo } from 'react'

import { NotFoundProps } from 'components/organisms/NotFound'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const NOT_FOUND_DATA = {
      code: '404',
      heading: 'Ta strona zniknęła w <span class="styled">słońcu</span>',
      lead: 'Nie znaleźliśmy strony, której szukasz. Sprawdź adres albo wróć na stronę główną.',
      primaryCtaLabel: 'Wróć na stronę główną',
      primaryCtaTo: '/',
      secondaryCtaLabel: 'Skontaktuj się z nami',
      secondaryCtaTo: '/kontakt',
    } satisfies NotFoundProps

    return { NOT_FOUND_DATA }
  }, [])
}
