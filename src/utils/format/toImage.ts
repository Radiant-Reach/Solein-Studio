import { ImageDataLike } from 'gatsby-plugin-image'

import { ImageType } from 'types/page'

type QueriedMediaItem =
  | {
      altText?: string | null
      localFile?: {
        childImageSharp?: {
          gatsbyImageData?: unknown
        } | null
      } | null
    }
  | null
  | undefined

export const toImage = (
  media: QueriedMediaItem,
  fallbackAlt: string
): ImageType | undefined => {
  const gatsbyImageData = media?.localFile?.childImageSharp?.gatsbyImageData

  if (!gatsbyImageData) return undefined

  return {
    src: gatsbyImageData as ImageDataLike,
    alt: media?.altText || fallbackAlt,
  }
}
