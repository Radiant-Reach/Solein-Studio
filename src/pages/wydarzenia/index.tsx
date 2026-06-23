import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { EventsBoard } from 'components/organisms/EventsBoard'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/wydarzenia'

const WydarzeniaPage: React.FC<PageProps<Queries.WydarzeniaQuery>> = ({
  data,
}) => {
  const { EVENTS_BOARD_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title="Wydarzenia | Soleil Studio Wrocław"
        description="Wydarzenia w Soleil Studio we Wrocławiu — przegląd wydarzeń własnych i organizowanych przez gości studia, oraz nadchodzące terminy."
      />

      <EventsBoard {...EVENTS_BOARD_DATA} />
    </Layout>
  )
}

export default WydarzeniaPage

export const query = graphql`
  query Wydarzenia {
    page: wpPage(slug: { eq: "wydarzenia" }) {
      wydarzeniaFields {
        wydarzeniaEyebrow
        wydarzeniaHeading
        wydarzeniaLead
      }
    }
    events: allWpWydarzenie(sort: { wydarzenieFields: { date: ASC } }) {
      nodes {
        slug
        title
        wydarzenieFields {
          date
          description
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
          }
        }
      }
    }
    types: allWpWydarzenieTyp {
      nodes {
        slug
        name
      }
    }
  }
`
