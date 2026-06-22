import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { EventDetail } from 'components/organisms/EventDetail'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/wydarzenia-detail'

const WydarzenieTemplate: React.FC<
  PageProps<Queries.WydarzenieQuery, { slug: string }>
> = ({ data }) => {
  const { EVENT_DETAIL_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title={`${EVENT_DETAIL_DATA.title} | Soleil Studio Wrocław`}
        description={EVENT_DETAIL_DATA.description}
      />

      <EventDetail {...EVENT_DETAIL_DATA} />
    </Layout>
  )
}

export default WydarzenieTemplate

export const query = graphql`
  query Wydarzenie($slug: String) {
    wydarzenie: wpWydarzenie(slug: { eq: $slug }) {
      title
      wydarzenieFields {
        date
        time
        location
        longDescription
        photo {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      wydarzenieTypy {
        nodes {
          slug
          name
        }
      }
    }
  }
`
