import React from 'react'

import { AmenityChip } from 'components/atoms/AmenityChip'
import { Container } from 'components/atoms/Container'
import { BodyBig, BodySmall, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  AmenityList,
  DetailsGrid,
  DetailsWrapper,
  SpecRow,
  SpecsList,
  TopDivider,
} from './RoomDetails.style'

export type RoomSpec = {
  id: string
  label: string
  value: string
}

export type RoomAmenity = {
  id: string
  icon: string
  label: string
}

export type RoomDetailsProps = {
  specsEyebrow: string
  specsHeading: string
  specs: RoomSpec[]
  amenitiesEyebrow: string
  amenitiesHeading: string
  amenities: RoomAmenity[]
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({
  specsEyebrow,
  specsHeading,
  specs,
  amenitiesEyebrow,
  amenitiesHeading,
  amenities,
}) => (
  <DetailsWrapper>
    <Container $variant="wide">
      <DetailsGrid>
        <div>
          <SectionHeading eyebrow={specsEyebrow}>{specsHeading}</SectionHeading>

          <SpecsList>
            {specs.map((spec) => (
              <SpecRow key={spec.id}>
                <Text
                  as="dt"
                  $base={BodySmall}
                  $color="ink500"
                  dangerouslySetInnerHTML={{ __html: spec.label }}
                />
                <Text
                  as="dd"
                  $base={BodyBig}
                  $color="ink800"
                  dangerouslySetInnerHTML={{ __html: spec.value }}
                />
              </SpecRow>
            ))}
          </SpecsList>
        </div>

        <div>
          <SectionHeading eyebrow={amenitiesEyebrow}>
            {amenitiesHeading}
          </SectionHeading>

          <AmenityList>
            {amenities.map((amenity) => (
              <AmenityChip
                key={amenity.id}
                icon={amenity.icon}
                label={amenity.label}
              />
            ))}
          </AmenityList>
        </div>
      </DetailsGrid>
    </Container>
  </DetailsWrapper>
)
