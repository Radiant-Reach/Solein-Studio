import React, { useMemo } from 'react'

import { Weight } from 'components/atoms/Typography'

import { PricingAddonsProps } from 'components/organisms/PricingAddons'
import { PricingHeroProps } from 'components/organisms/PricingHero'
import { PricingPlansProps } from 'components/organisms/PricingPlans'
import { PricingRulesProps } from 'components/organisms/PricingRules'
import { StudioEquipmentProps } from 'components/organisms/StudioEquipment'

import { EQUIPMENT_CATEGORIES } from 'constants/equipment'

import slugify from 'utils/slugify'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const PRICING_HERO_DATA = {
      scriptLabel: 'Inwestycja w jakość',
      heading: 'Cennik',
      lead: 'Przejrzyste zasady, elastyczne opcje wynajmu studia. Podane ceny są cenami brutto — wystawiamy faktury VAT 23%.',
    } satisfies PricingHeroProps

    const PRICING_PLANS_DATA = {
      plans: [
        {
          id: slugify('Wynajem jednej sali'),
          scriptLabel: 'Wynajem jednej sali',
          heading: 'Sala Wschód lub Zachód',
          rows: [
            {
              id: slugify('1 godzina sala'),
              label: '1 godzina',
              price: '140 zł',
            },
            {
              id: slugify('2 godziny sala'),
              label: '2 godziny',
              price: '280 zł',
            },
            {
              id: slugify('3 godziny sala'),
              label: '3 godziny',
              price: '420 zł',
            },
            {
              id: slugify('4 godziny sala'),
              label: '4 godziny',
              price: '560 zł',
            },
            {
              id: slugify('5 godzin sala'),
              label: '5 godzin',
              price: '700 zł',
            },
            {
              id: slugify('Caly dzien sala'),
              label: 'Cały dzień (8.00–20.00)',
              price: '1200 zł',
              highlight: true,
            },
          ],
          ctaLabel: 'Zarezerwuj salę',
          ctaTo: '/kontakt',
        },
        {
          id: slugify('Ekskluzywny wynajem'),
          scriptLabel: 'Ekskluzywny wynajem',
          heading: 'Całe studio',
          rows: [
            {
              id: slugify('1 godzina studio'),
              label: '1 godzina',
              price: '240 zł',
            },
            {
              id: slugify('2 godziny studio'),
              label: '2 godziny',
              price: '440 zł',
            },
            {
              id: slugify('3 godziny studio'),
              label: '3 godziny',
              price: '640 zł',
            },
            {
              id: slugify('4 godziny studio'),
              label: '4 godziny',
              price: '840 zł',
            },
            {
              id: slugify('5 godzin studio'),
              label: '5 godzin',
              price: '1040 zł',
            },
            {
              id: slugify('Caly dzien studio'),
              label: 'Cały dzień (8.00–20.00)',
              price: '2040 zł',
              highlight: true,
            },
          ],
          ctaLabel: 'Zarezerwuj studio',
          ctaTo: '/kontakt',
          contrast: true,
        },
      ],
    } satisfies PricingPlansProps

    const PRICING_ADDONS_DATA = {
      addonsHeading: 'Usługi dodatkowe',
      makeupTitle: 'Stanowisko do makijażu',
      makeupPrice: '50 zł',
      makeupUnit: '/h',
      makeupNote: 'przed sesją',
      makeupDescription:
        'Dopłata obowiązuje tylko wtedy, gdy chcesz skorzystać ze stanowiska przed czasem rezerwacji sali. W trakcie wynajmu sali stanowisko jest dostępne bezpłatnie.',
      extraNotes: [
        {
          id: slugify('Ponadnormatywne sprzatanie'),
          text: 'Ponadnormatywne sprzątanie po sesji — 200 zł.',
        },
      ],
      quoteHeading: 'Wycena indywidualna',
      quoteItems: [
        {
          id: slugify('Eventy warsztaty szkolenia quote'),
          text: 'Eventy, warsztaty i szkolenia',
        },
        {
          id: slugify('Niestandardowa aranzacja quote'),
          text: 'Przygotowanie niestandardowej aranżacji',
        },
        {
          id: slugify('Catering quote'),
          text: 'Organizacja cateringu pod sesje zdjęciowe oraz wydarzenia',
        },
        {
          id: slugify('Fotograf quote'),
          text: 'Zatrudnienie fotografa do Twojej sesji',
        },
      ],
      quoteCtaLabel: 'Skontaktuj się w celu wyceny',
      quoteCtaTo: '/kontakt',
    } satisfies PricingAddonsProps

    const EQUIPMENT_DATA = {
      eyebrow: 'Wyposażenie',
      heading: 'Dostępny sprzęt',
      lead: 'W cenie wynajmu studia oferujemy profesjonalny sprzęt oświetleniowy i akcesoria. Poniżej znajdziesz szczegółową listę wyposażenia dostępnego na miejscu.',
      categories: EQUIPMENT_CATEGORIES,
    } satisfies StudioEquipmentProps

    const PRICING_RULES_DATA = {
      rules: [
        {
          id: slugify('Dane do formularza'),
          text: 'Podczas rezerwacji prosimy o wpisanie danych do formularza. Fakturę prześlemy na maila do 7 dni.',
        },
        {
          id: slugify('Oplacenie zamowienia'),
          text: 'Warunkiem rezerwacji jest opłacenie zamówienia. Nieopłacona rezerwacja po 2 godzinach anuluje się automatycznie.',
        },
        {
          id: slugify('Akceptacja regulaminu'),
          text: 'Akceptacja regulaminu oraz cennika jest wymagana przed rozpoczęciem korzystania ze studia.',
        },
      ],
      notice: (
        <Weight $weight={700}>
          Odwołanie wynajmu lub zmiana terminu musi być potwierdzona mailowo.
        </Weight>
      ),
    } satisfies PricingRulesProps

    return {
      PRICING_HERO_DATA,
      PRICING_PLANS_DATA,
      PRICING_ADDONS_DATA,
      EQUIPMENT_DATA,
      PRICING_RULES_DATA,
    }
  }, [])
}
