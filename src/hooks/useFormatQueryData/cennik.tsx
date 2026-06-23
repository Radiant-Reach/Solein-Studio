import { useMemo } from 'react'

import { PricingAddonsProps } from 'components/organisms/Pricing/Addons'
import { PricingHeroProps } from 'components/organisms/Pricing/Hero'
import { PricingPlansProps } from 'components/organisms/Pricing/Plans'
import { PricingRulesProps } from 'components/organisms/Pricing/Rules'
import { StudioEquipmentProps } from 'components/organisms/StudioEquipment'

import slugify from 'utils/slugify'

export const useFormatQueryData = (cmsData: Queries.CennikQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.cennikFields!
    const GLOBAL = cmsData.wp?.ustawieniaGlobalne!

    const PRICING_HERO_DATA = {
      scriptLabel: FIELDS.scriptLabel!,
      heading: FIELDS.cennikHeading!,
      lead: FIELDS.cennikLead!,
    } satisfies PricingHeroProps

    // The two plans' own labels/CTAs are fixed UI structure (there are
    // always exactly these two), not editorial content — only their rows
    // come from the shared "Cennik wspólny" options (reused by the room
    // detail pages too).
    const PRICING_PLANS_DATA = {
      plans: [
        {
          id: slugify('Wynajem jednej sali'),
          scriptLabel: 'Wynajem jednej sali',
          heading: 'Sala Wschód lub Zachód',
          rows:
            GLOBAL.cennikWspolny?.pojedynczaSala?.map((row) => ({
              id: slugify(row?.label!),
              label: row?.label!,
              price: row?.price!,
              highlight: row?.highlight!,
            }))! || [],
          ctaLabel: 'Zarezerwuj salę',
          ctaTo: '/kontakt',
        },
        {
          id: slugify('Ekskluzywny wynajem'),
          scriptLabel: 'Ekskluzywny wynajem',
          heading: 'Całe studio',
          rows:
            GLOBAL.cennikWspolny?.caleStudio?.map((row) => ({
              id: slugify(row?.label!),
              label: row?.label!,
              price: row?.price!,
              highlight: row?.highlight!,
            }))! || [],
          ctaLabel: 'Zarezerwuj studio',
          ctaTo: '/kontakt',
          contrast: true,
        },
      ],
    } satisfies PricingPlansProps

    const PRICING_ADDONS_DATA = {
      addonsHeading: FIELDS.addonsHeading!,
      makeupTitle: FIELDS.makeupTitle!,
      makeupPrice: FIELDS.makeupPrice!,
      makeupUnit: FIELDS.makeupUnit!,
      makeupNote: FIELDS.makeupNote!,
      makeupDescription: FIELDS.makeupDescription!,
      extraNotes:
        FIELDS.extraNotes?.map((note) => ({
          id: slugify(note?.text!),
          text: note?.text!,
        }))! || [],
      quoteHeading: FIELDS.quoteHeading!,
      quoteItems:
        FIELDS.quoteItems?.map((item) => ({
          id: slugify(item?.text!),
          text: item?.text!,
        }))! || [],
      quoteCtaLabel: FIELDS.quoteCta?.title!,
      quoteCtaTo: FIELDS.quoteCta?.url!,
    } satisfies PricingAddonsProps

    const EQUIPMENT_DATA = {
      eyebrow: 'Wyposażenie',
      heading: 'Dostępny sprzęt',
      lead: 'W cenie wynajmu studia oferujemy profesjonalny sprzęt oświetleniowy i akcesoria. Poniżej znajdziesz szczegółową listę wyposażenia dostępnego na miejscu.',
      categories:
        GLOBAL.wyposazenie?.categories?.map((category) => ({
          id: slugify(category?.title!),
          title: category?.title!,
          items:
            category?.items?.map((item) => ({
              id: slugify(item?.text!),
              text: item?.text!,
            }))! || [],
        }))! || [],
    } satisfies StudioEquipmentProps

    const PRICING_RULES_DATA = {
      rules:
        FIELDS.rules?.map((rule) => ({
          id: slugify(rule?.text!),
          text: rule?.text!,
        }))! || [],
      notice: FIELDS.notice!,
    } satisfies PricingRulesProps

    return {
      PRICING_HERO_DATA,
      PRICING_PLANS_DATA,
      PRICING_ADDONS_DATA,
      EQUIPMENT_DATA,
      PRICING_RULES_DATA,
    }
  }, [JSON.stringify(cmsData)])
}
