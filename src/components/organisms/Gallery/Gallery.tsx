import React, { useState } from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodySmall, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  FilterChip,
  FilterRow,
  Grid,
  GridItem,
  HeadingWrapper,
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

  const visibleShots =
    activeFilter === ALL_FILTER_ID
      ? shots
      : shots.filter((shot) => shot.category === activeFilter)

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
                onClick={() => setActiveFilter(item.id)}
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
          {visibleShots.map((shot) => (
            <GridItem
              key={shot.id}
              $colSpan={shot.colSpan}
              $rowSpan={shot.rowSpan}
            >
              <PhotoFrame tone={shot.tone} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  )
}
