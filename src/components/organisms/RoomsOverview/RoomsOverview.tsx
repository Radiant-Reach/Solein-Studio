import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodyMedium, BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  HeaderRow,
  RoomCard,
  RoomCardBody,
  RoomCardEyebrow,
  RoomCardFooter,
  RoomCardPhoto,
  RoomCardTitle,
  RoomTag,
  RoomsGrid,
  Wrapper,
} from './RoomsOverview.style'

export type RoomOverviewCard = {
  id: string
  tone: PhotoFrameTone
  tagLabel: string
  tagTone: 'cream' | 'orange'
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaTo: string
}

export type RoomsOverviewProps = {
  eyebrow: string
  heading: string
  rooms: RoomOverviewCard[]
}

export const RoomsOverview: React.FC<RoomsOverviewProps> = ({
  eyebrow,
  heading,
  rooms,
}) => (
  <Wrapper>
    <Container $variant="normal">
      <HeaderRow>
        <SectionHeading eyebrow={eyebrow}>{heading}</SectionHeading>
      </HeaderRow>

      <RoomsGrid>
        {rooms.map((room) => (
          <RoomCard key={room.id} to={room.ctaTo}>
            <RoomCardPhoto>
              <PhotoFrame tone={room.tone} />

              <RoomTag $tone={room.tagTone}>
                <Text
                  as="span"
                  $base={BodySmall}
                  $color="ink800"
                  dangerouslySetInnerHTML={{ __html: room.tagLabel }}
                />
              </RoomTag>
            </RoomCardPhoto>

            <RoomCardBody>
              <RoomCardEyebrow>
                <Text
                  as="span"
                  $base={BodySmall}
                  $transform="uppercase"
                  $color="terracotta"
                  dangerouslySetInnerHTML={{ __html: room.eyebrow }}
                />
              </RoomCardEyebrow>

              <RoomCardTitle>
                <Text
                  as="h3"
                  $base={H400}
                  $color="ink800"
                  dangerouslySetInnerHTML={{ __html: room.title }}
                />
              </RoomCardTitle>

              <Text
                $base={BodyMedium}
                $color="ink600"
                dangerouslySetInnerHTML={{ __html: room.description }}
              />

              <RoomCardFooter>
                <ArrowButton label={room.ctaLabel} color="ink800" uppercase />
              </RoomCardFooter>
            </RoomCardBody>
          </RoomCard>
        ))}
      </RoomsGrid>
    </Container>
  </Wrapper>
)
