import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { FAQ } from 'components/organisms/FAQ'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/faq'

const FaqPage: React.FC<PageProps<Queries.FaqQuery>> = ({ data }) => {
  const { FAQ_DATA, CTA_BANNER_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title="FAQ | Soleil Studio"
        description="Najczęstsze pytania o wynajem, wyposażenie i organizację wydarzeń w Soleil Studio."
      />

      <FAQ {...FAQ_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default FaqPage

export const query = graphql`
  query Faq {
    page: wpPage(slug: { eq: "faq" }) {
      faqFields {
        faqEyebrow
        faqHeading
        faqLead
        items {
          question
          answer
        }
        faqCtaBanner {
          heading
          text
          cta {
            title
            url
          }
        }
      }
    }
  }
`
