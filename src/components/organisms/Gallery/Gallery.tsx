import React, { useState } from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodySmall, Text } from 'components/atoms/Typography'

import { Lightbox } from 'components/molecules/Lightbox'
import { SectionHeading } from 'components/molecules/SectionHeading'

import { ImageType } from 'types/page'

import {
  FilterChip,
  FilterRow,
  Grid,
  GridItem,
  HeadingWrapper,
  LightboxPhoto,
  Tile,
  Wrapper,
} from './Gallery.style'

export type GalleryFilter = {
  id: string
  label: string
}

export type GalleryShot = {
  id: string
  category: string
  tone: PhotoFrameTone
  image?: ImageType
  colSpan?: 2
  rowSpan?: 2
}

export type GalleryProps = {
  eyebrow: string
  heading: string
  lead: string
  filters: GalleryFilter[]
  shots: GalleryShot[]
}

const ALL_FILTER_ID = 'all'

export const Gallery: React.FC<GalleryProps> = ({
  eyebrow,
  heading,
  lead,
  filters,
  shots,
}) => {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER_ID)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visibleShots =
    activeFilter === ALL_FILTER_ID
      ? shots
      : shots.filter((shot) => shot.category === activeFilter)

  const activeShot = activeIndex !== null ? visibleShots[activeIndex] : null

  return (
    <Wrapper>
      <Container $variant="slim">
        <HeadingWrapper>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>

          <FilterRow>
            {filters.map((item) => (
              <FilterChip
                key={item.id}
                type="button"
                $active={activeFilter === item.id}
                onClick={() => {
                  setActiveFilter(item.id)
                  setActiveIndex(null)
                }}
              >
                <Text
                  as="span"
                  $base={BodySmall}
                  $color="inherit"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </FilterChip>
            ))}
          </FilterRow>
        </HeadingWrapper>

        <Grid>
          {visibleShots.map((shot, index) => (
            <GridItem
              key={shot.id}
              $colSpan={shot.colSpan}
              $rowSpan={shot.rowSpan}
            >
              <Tile
                type="button"
                aria-label="Powiększ zdjęcie"
                onClick={() => setActiveIndex(index)}
              >
                <PhotoFrame tone={shot.tone} image={shot.image} />
              </Tile>
            </GridItem>
          ))}
        </Grid>
      </Container>

      <Lightbox
        isOpen={activeShot !== null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          visibleShots.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + visibleShots.length) % visibleShots.length
                )
            : undefined
        }
        onNext={
          visibleShots.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev + 1) % visibleShots.length
                )
            : undefined
        }
      >
        {activeShot && (
          <LightboxPhoto>
            <PhotoFrame tone={activeShot.tone} image={activeShot.image} />
          </LightboxPhoto>
        )}
      </Lightbox>
    </Wrapper>
  )
}
