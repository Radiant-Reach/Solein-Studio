import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { StudioIntro } from 'components/organisms/StudioIntro'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/lokalizacja'

const LokalizacjaTemplate: React.FC<
  PageProps<Queries.LokalizacjaQuery, { slug: string }>
> = ({ data }) => {
  const { STUDIO_INTRO_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title={`${data.lokalizacja?.title} | Soleil Studio`}
        description={STUDIO_INTRO_DATA.lead}
      />

      <StudioIntro {...STUDIO_INTRO_DATA} />
    </Layout>
  )
}

export default LokalizacjaTemplate

export const query = graphql`
  query Lokalizacja($slug: String) {
    lokalizacja: wpLokalizacja(slug: { eq: $slug }) {
      title
      lokalizacjaFields {
        eyebrow
        heading
        lead
        paragraphs {
          text
        }
        heroPhotos {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        features {
          eyebrow
          heading
          body
          photo {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        ctaText
        cta {
          title
          url
        }
      }
    }
  }
`
