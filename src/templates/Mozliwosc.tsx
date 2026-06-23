import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { EventPossibilities } from 'components/organisms/EventPossibilities'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/mozliwosc'

const MozliwoscTemplate: React.FC<
  PageProps<Queries.MozliwoscQuery, { slug: string }>
> = ({ data }) => {
  const { EVENT_POSSIBILITIES_DATA, CTA_BANNER_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title={`${data.mozliwosc?.title} | Soleil Studio Wrocław`}
        description={EVENT_POSSIBILITIES_DATA.lead}
      />

      <EventPossibilities {...EVENT_POSSIBILITIES_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default MozliwoscTemplate

export const query = graphql`
  query Mozliwosc($slug: String) {
    mozliwosc: wpMozliwosc(slug: { eq: $slug }) {
      title
      mozliwoscFields {
        eyebrow
        heading
        lead
        photos {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        items {
          title
          description
        }
        mozliwoscCtaBanner {
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
