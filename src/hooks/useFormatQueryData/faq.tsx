import { useMemo } from 'react'

import { CtaBannerProps } from 'components/molecules/CtaBanner'

import { FAQProps } from 'components/organisms/FAQ'

import slugify from 'utils/slugify'

export const useFormatQueryData = (cmsData: Queries.FaqQuery) => {
  return useMemo(() => {
    const FIELDS = cmsData.page?.faqFields!

    const FAQ_DATA = {
      eyebrow: FIELDS.faqEyebrow!,
      heading: FIELDS.faqHeading!,
      lead: FIELDS.faqLead!,
      items:
        FIELDS.items?.map((item) => ({
          id: slugify(item?.question!),
          question: item?.question!,
          answer: item?.answer!,
        }))! || [],
    } satisfies FAQProps

    const CTA_BANNER_DATA = {
      heading: FIELDS.faqCtaBanner?.heading!,
      text: FIELDS.faqCtaBanner?.text!,
      ctaLabel: FIELDS.faqCtaBanner?.cta?.title!,
      ctaTo: FIELDS.faqCtaBanner?.cta?.url!,
    } satisfies CtaBannerProps

    return { FAQ_DATA, CTA_BANNER_DATA }
  }, [JSON.stringify(cmsData)])
}
