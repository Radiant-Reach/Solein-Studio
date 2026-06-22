import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { RoomsOverview } from 'components/organisms/RoomsOverview'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/nasze-sale'

const NaszeSalePage: React.FC<PageProps<Queries.NaszeSaleQuery>> = ({
  data,
}) => {
  const { ROOMS_OVERVIEW_DATA } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title="Nasze sale | Soleil Studio Wrocław"
        description="Sala Wschód i Sala Zachód — dwa wnętrza Soleil Studio we Wrocławiu, każde w innym świetle. Sprawdź pojemność, wyposażenie i ceny."
      />

      <RoomsOverview {...ROOMS_OVERVIEW_DATA} />
    </Layout>
  )
}

export default NaszeSalePage

export const query = graphql`
  query NaszeSale {
    page: wpPage(slug: { eq: "nasze-sale" }) {
      naszeSaleFields {
        eyebrow
        heading
      }
    }
    rooms: allWpSala(sort: { title: ASC }) {
      nodes {
        slug
        title
        salaFields {
          tagline
          tagColor
          capacityLabel
          shortDescription
          heroPhoto {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
