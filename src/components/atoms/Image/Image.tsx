import {
  GatsbyImage,
  GatsbyImageProps,
  ImageDataLike,
  getImage,
  withArtDirection,
} from 'gatsby-plugin-image'
import React, { useMemo } from 'react'

import { TypedOmit } from 'utils/types'

import { breakpoints } from 'styles/theme'

import { ImageInner, ImageWrapper } from './Image.style'

type ClassicImageProps = {
  src: string
} & TypedOmit<ImageProps, 'src'>

export const ClassicImage: React.FC<ClassicImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit,
  objectPosition,
  className,
  id,
  radius,
  ...props
}) => {
  return (
    <ImageWrapper
      id={id}
      className={className}
      $width={width}
      $height={height}
      $objectFit={objectFit}
    >
      <ImageInner
        src={src}
        alt={alt}
        $objectFit={objectFit}
        $objectPosition={objectPosition}
        width={width}
        height={height}
        $radius={radius}
        {...props}
      />
    </ImageWrapper>
  )
}

type LazyImageProps = {
  src: ImageDataLike
  srcMobile?: ImageDataLike
} & TypedOmit<ImageProps, 'src'>

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  srcMobile,
  alt,
  width,
  height,
  objectFit,
  objectPosition,
  className,
  id,
  radius,
  ...props
}) => {
  const image = useMemo(
    () =>
      srcMobile
        ? withArtDirection(getImage(srcMobile)!, [
            {
              media: `(min-width: ${breakpoints.lg}px)`,
              image: getImage(src)!,
            },
          ])
        : getImage(src)!,
    [srcMobile, src]
  )

  return (
    <ImageWrapper
      id={id}
      className={className}
      $width={width}
      $height={height}
      $objectFit={objectFit}
      $radius={radius}
    >
      <GatsbyImage
        image={image}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
        {...props}
      />
    </ImageWrapper>
  )
}

type ImageProps = {
  src: ImageDataLike | string
  alt: string
  width?: number
  height?: number
  objectFit?: React.CSSProperties['objectFit']
  objectPosition?: React.CSSProperties['objectPosition']
  radius?: number
  className?: string
  id?: string

  onClick?: React.MouseEventHandler<HTMLImageElement>
  onLoad?: () => void
  onError?: React.ReactEventHandler<HTMLImageElement>
} & Pick<GatsbyImageProps, 'loading' | 'fetchPriority'>

export type ImageSrc = ImageProps['src']

export const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  if (typeof src === 'string') {
    return <ClassicImage src={src} {...props} />
  }
  return <LazyImage src={src} {...props} />
}
