import React from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodyBig, BodySmall, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  HeadingWrapper,
  PhotoRow,
  PhotoTile,
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
}) => (
  <Wrapper>
    <Container $variant="wide">
      <HeadingWrapper>
        <SectionHeading eyebrow={eyebrow} lead={lead}>
          {heading}
        </SectionHeading>
      </HeadingWrapper>

      <PhotoRow>
        {photos.map((photo) => (
          <PhotoTile key={photo.id}>
            <PhotoFrame tone={photo.tone} />
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
  </Wrapper>
)
