import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { RoomDetails } from 'components/organisms/Room/Details'
import { RoomGallery } from 'components/organisms/Room/Gallery'
import { RoomHero } from 'components/organisms/Room/Hero'
import { RoomPricing } from 'components/organisms/Room/Pricing'
import { StudioEquipment } from 'components/organisms/StudioEquipment'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/sala'

const SalaTemplate: React.FC<
  PageProps<Queries.SalaQuery, { slug: string }>
> = ({ data }) => {
  const {
    ROOM_HERO_DATA,
    ROOM_GALLERY_DATA,
    ROOM_DETAILS_DATA,
    ROOM_PRICING_DATA,
    EQUIPMENT_DATA,
  } = useFormatQueryData(data)

  const title = data.sala?.title!

  return (
    <Layout>
      <Seo
        title={`${title} | Soleil Studio Wrocław`}
        description={data.sala?.salaFields?.shortDescription!}
      />

      <RoomHero {...ROOM_HERO_DATA} />
      <RoomGallery {...ROOM_GALLERY_DATA} />
      <RoomDetails {...ROOM_DETAILS_DATA} />
      <RoomPricing {...ROOM_PRICING_DATA} />
      <StudioEquipment {...EQUIPMENT_DATA} />
    </Layout>
  )
}

export default SalaTemplate

export const query = graphql`
  query Sala($slug: String) {
    sala: wpSala(slug: { eq: $slug }) {
      title
      slug
      salaFields {
        tagline
        shortDescription
        description
        heroPhoto {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        heroPrimaryCta {
          title
          url
        }
        heroSecondaryCta {
          title
          url
        }
        gallery {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        specsEyebrow
        specsHeading
        specs {
          label
          value
        }
        amenitiesEyebrow
        amenitiesHeading
        amenities {
          label
          icon {
            sourceUrl
          }
        }
        pricingEyebrow
        pricingHeading
        pricingLead
        pricingPrimaryCta {
          title
          url
        }
        pricingSecondaryCta {
          title
          url
        }
        equipmentEyebrow
        equipmentHeading
        equipmentLead
      }
    }
    wp {
      ustawieniaGlobalne {
        cennikWspolny {
          pojedynczaSala {
            label
            price
            highlight
          }
        }
        wyposazenie {
          categories {
            title
            items {
              text
            }
          }
        }
      }
    }
  }
`
