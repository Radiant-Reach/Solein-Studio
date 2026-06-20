import { useMemo } from 'react'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import { FAQProps } from 'components/organisms/FAQ'

import slugify from 'utils/slugify'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const FAQ_ITEMS = [
      {
        id: slugify('Jak zarezerwowac sale'),
        question: 'Jak zarezerwować salę?',
        answer:
          'Wypełnij formularz w zakładce Kontakt albo napisz do nas maila. Potwierdzimy dostępność i szczegóły w ciągu 24 godzin.',
      },
      {
        id: slugify('Czy moge przyjsc z psem'),
        question: 'Czy mogę przyjść z psem?',
        answer:
          'Tak! Soleil jest pet friendly — Twój pupil jest u nas mile widziany. Daj nam tylko znać przy rezerwacji.',
      },
      {
        id: slugify('Czy jest parking'),
        question: 'Czy jest parking?',
        answer:
          'Tak, bezpłatny parking znajduje się bezpośrednio przy budynku studia. Dojazd jest dogodny zarówno autem, jak i komunikacją miejską.',
      },
      {
        id: slugify('Co jest wliczone w cene wynajmu'),
        question: 'Co jest wliczone w cenę wynajmu?',
        answer:
          'Każda rezerwacja obejmuje kawę, herbatę i wodę dla gości, podstawowe wyposażenie (stoły, krzesła, nagłośnienie) oraz sprzątanie po wydarzeniu.',
      },
      {
        id: slugify('Czy moge zorganizowac catering'),
        question: 'Czy mogę zorganizować catering?',
        answer:
          'Oczywiście. Możesz skorzystać z własnego cateringu lub poprosić nas o rekomendację sprawdzonych dostawców z Wrocławia.',
      },
      {
        id: slugify('Jaki jest minimalny czas wynajmu'),
        question: 'Jaki jest minimalny czas wynajmu?',
        answer:
          'Salę wynajmujemy na minimum 2 godziny. Dostępne są też pakiety na pół dnia i cały dzień — szczegóły znajdziesz w cenniku.',
      },
      {
        id: slugify('Czy da sie wynajac obie sale naraz'),
        question: 'Czy da się wynająć obie sale naraz?',
        answer:
          'Tak — przy większych wydarzeniach możesz zarezerwować obie sale. Napisz do nas, a przygotujemy ofertę indywidualną.',
      },
    ]

    const FAQ_DATA = {
      eyebrow: 'FAQ',
      heading: 'Dobrze <span class="styled">wiedzieć</span>',
      lead: 'Najczęstsze pytania o wynajem, wyposażenie i organizację wydarzeń.',
      items: FAQ_ITEMS,
    } satisfies FAQProps

    const CTA_BANNER_DATA = {
      heading: 'Nie znalazłeś odpowiedzi?',
      text: 'Chętnie pomożemy — napisz do nas, odpowiemy w ciągu 24 godzin.',
      ctaLabel: 'Napisz do nas',
      ctaTo: '/kontakt',
    } satisfies CtaBannerProps

    return { FAQ_DATA, CTA_BANNER_DATA }
  }, [])
}
