import { SeoProps } from 'components/atoms/Seo'

export const formatSeoData = (
  cmsData: Queries.WpSEOFragment | undefined
): SeoProps => {
  return {
    title: cmsData?.title ?? '',
    description: cmsData?.metaDesc ?? '',
    ogTitle: cmsData?.opengraphTitle ?? cmsData?.title ?? '',
    ogDescription: cmsData?.opengraphDescription ?? cmsData?.metaDesc ?? '',
    ogImage: cmsData?.opengraphImage?.sourceUrl ?? '',
    twitterTitle: cmsData?.twitterTitle ?? cmsData?.title ?? '',
    twitterDescription: cmsData?.twitterDescription ?? cmsData?.metaDesc ?? '',
    twitterImage: cmsData?.twitterImage?.sourceUrl ?? '',
  }
}
