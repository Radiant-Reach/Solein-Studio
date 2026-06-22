import React, { useState } from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { Lightbox } from 'components/molecules/Lightbox'
import { SectionHeading } from 'components/molecules/SectionHeading'
import { Swiper } from 'components/molecules/Swiper'

import { ImageType } from 'types/page'

import {
  HeaderRow,
  LightboxPhoto,
  PhotoTile,
  Wrapper,
} from './GalleryTeaser.style'

export type GalleryTeaserPhoto = {
  id: string
  tone: PhotoFrameTone
  image?: ImageType
}

export type GalleryTeaserProps = {
  eyebrow: string
  heading: string
  lead?: string
  photos: GalleryTeaserPhoto[]
  ctaLabel: string
  ctaTo: string
}

export const GalleryTeaser: React.FC<GalleryTeaserProps> = ({
  eyebrow,
  heading,
  lead,
  photos,
  ctaLabel,
  ctaTo,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activePhoto = activeIndex !== null ? photos[activeIndex] : null

  return (
    <Wrapper>
      <Container $variant="wide">
        <HeaderRow>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>

          <ArrowButton to={ctaTo} label={ctaLabel} color="ink800" />
        </HeaderRow>

        <Swiper
          items={photos}
          withNavigation
          extractKey={(photo) => photo.id}
          renderItem={(photo, _active, index) => (
            <PhotoTile
              type="button"
              aria-label="Powiększ zdjęcie"
              onClick={() => setActiveIndex(index)}
            >
              <PhotoFrame tone={photo.tone} image={photo.image} />
            </PhotoTile>
          )}
        />
      </Container>

      <Lightbox
        isOpen={activePhoto !== null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          photos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + photos.length) % photos.length
                )
            : undefined
        }
        onNext={
          photos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev + 1) % photos.length
                )
            : undefined
        }
      >
        {activePhoto && (
          <LightboxPhoto>
            <PhotoFrame tone={activePhoto.tone} image={activePhoto.image} />
          </LightboxPhoto>
        )}
      </Lightbox>
    </Wrapper>
  )
}
