import React, { useState } from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodyBig, BodySmall, Text } from 'components/atoms/Typography'

import { Lightbox } from 'components/molecules/Lightbox'
import { SectionHeading } from 'components/molecules/SectionHeading'

import { ImageType } from 'types/page'

import {
  HeadingWrapper,
  LightboxPhoto,
  PhotoRow,
  PhotoTile,
  PhotoTileButton,
  PossibilitiesGrid,
  PossibilityCard,
  Wrapper,
} from './EventPossibilities.style'

export type EventPossibility = {
  id: string
  title: string
  description: string
}

export type EventPhoto = {
  id: string
  tone: PhotoFrameTone
  image?: ImageType
}

export type EventPossibilitiesProps = {
  eyebrow: string
  heading: string
  lead: string
  photos: EventPhoto[]
  possibilities: EventPossibility[]
}

export const EventPossibilities: React.FC<EventPossibilitiesProps> = ({
  eyebrow,
  heading,
  lead,
  photos,
  possibilities,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activePhoto = activeIndex !== null ? photos[activeIndex] : null

  return (
    <Wrapper>
      <Container $variant="wide">
        <HeadingWrapper>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>
        </HeadingWrapper>

        <PhotoRow>
          {photos.map((photo, index) => (
            <PhotoTile key={photo.id}>
              <PhotoTileButton
                type="button"
                aria-label="Powiększ zdjęcie"
                onClick={() => setActiveIndex(index)}
              >
                <PhotoFrame tone={photo.tone} image={photo.image} />
              </PhotoTileButton>
            </PhotoTile>
          ))}
        </PhotoRow>

        <PossibilitiesGrid>
          {possibilities.map((possibility) => (
            <PossibilityCard key={possibility.id}>
              <Text
                $base={BodyBig}
                $color="terracotta"
                dangerouslySetInnerHTML={{ __html: possibility.title }}
              />
              <Text
                $base={BodySmall}
                $color="ink600"
                dangerouslySetInnerHTML={{ __html: possibility.description }}
              />
            </PossibilityCard>
          ))}
        </PossibilitiesGrid>
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
