import { PageProps, graphql } from 'gatsby'
import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { navThemeAtom } from 'store'

import { Seo } from 'components/atoms/Seo'

import { StudioIntro } from 'components/organisms/StudioIntro'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/soleil-collective'

const SoleilCollectivePage: React.FC<
  PageProps<Queries.SoleilCollectiveQuery>
> = ({ data }) => {
  const { STUDIO_INTRO_DATA } = useFormatQueryData(data)
  const setNavTheme = useSetAtom(navThemeAtom)

  // Recolor the shared Navigation to match this page's rose palette while
  // it's mounted, restore the default theme on the way out.
  useEffect(() => {
    setNavTheme('collective')
    return () => setNavTheme('default')
  }, [setNavTheme])

  return (
    <Layout>
      <Seo
        title="Soleil Collective | Soleil Studio"
        description="Soleil Collective — wydarzenia w naszym studio organizowane przez innych. Poznaj wizję, misję i dla kogo to przestrzeń."
      />

      <StudioIntro {...STUDIO_INTRO_DATA} />
    </Layout>
  )
}

export default SoleilCollectivePage

export const query = graphql`
  query SoleilCollective {
    page: wpPage(slug: { eq: "soleil-collective" }) {
      soleilCollectiveFields {
        collectiveIntro {
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
  }
`
