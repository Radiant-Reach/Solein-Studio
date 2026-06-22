import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { EventsTeaser } from 'components/organisms/EventsTeaser'
import { GalleryTeaser } from 'components/organisms/GalleryTeaser'
import { HomeHero } from 'components/organisms/HomeHero'
import { RoomsOverview } from 'components/organisms/RoomsOverview'
import { StudioIntro } from 'components/organisms/StudioIntro'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/home'

const IndexPage: React.FC<PageProps<Queries.HomeQuery>> = ({ data }) => {
  const {
    HOME_HERO_DATA,
    ROOMS_OVERVIEW_DATA,
    EVENTS_TEASER_DATA,
    STUDIO_INTRO_DATA,
    GALLERY_TEASER_DATA,
    CTA_BANNER_DATA,
  } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title="Soleil Studio Wrocław | Wynajem studia na wydarzenia i sesje"
        description="Słoneczne studio do wynajęcia w sercu Wrocławia — sala Wschód i Zachód na warsztaty, sesje zdjęciowe i wydarzenia."
      />

      <HomeHero {...HOME_HERO_DATA} />
      <RoomsOverview {...ROOMS_OVERVIEW_DATA} />
      <EventsTeaser {...EVENTS_TEASER_DATA} />
      <StudioIntro {...STUDIO_INTRO_DATA} />
      <GalleryTeaser {...GALLERY_TEASER_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query Home {
    page: wpPage(slug: { eq: "strona-glowna" }) {
      homeFields {
        heroLeftPhoto {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        heroRightPhoto {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        heroCta {
          title
          url
        }
        roomsEyebrow
        roomsHeading
        eventsEyebrow
        eventsHeading
        eventsLead
        eventsCta {
          title
          url
        }
        studioIntro {
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
        galleryEyebrow
        galleryHeading
        galleryLead
        galleryPhotos {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        galleryCta {
          title
          url
        }
        ctaBanner {
          heading
          text
          cta {
            title
            url
          }
        }
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
    events: allWpWydarzenie(sort: { wydarzenieFields: { date: ASC } }) {
      nodes {
        slug
        title
        wydarzenieFields {
          date
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
  }
`
