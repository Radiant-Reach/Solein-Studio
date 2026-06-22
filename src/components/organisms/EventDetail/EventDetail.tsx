import React from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import {
  BodyBig,
  BodySmall,
  H700,
  H800,
  Text,
} from 'components/atoms/Typography'

import { ImageType } from 'types/page'

import {
  BackLink,
  Description,
  DetailGrid,
  DetailInfo,
  DetailPhoto,
  MetaRow,
  TypeTag,
  Wrapper,
} from './EventDetail.style'

export type EventDetailProps = {
  backTo: string
  backLabel: string
  type: 'zewnetrzne' | 'solein'
  typeLabel: string
  title: string
  date: string
  time?: string
  location?: string
  description: string
  tone: PhotoFrameTone
  image?: ImageType
}

export const EventDetail: React.FC<EventDetailProps> = ({
  backTo,
  backLabel,
  type,
  typeLabel,
  title,
  date,
  time,
  location,
  description,
  tone,
  image,
}) => (
  <Wrapper>
    <Container $variant="wide">
      <BackLink
        to={backTo}
        dangerouslySetInnerHTML={{ __html: `← ${backLabel}` }}
      />

      <DetailGrid>
        <DetailPhoto>
          <PhotoFrame tone={tone} image={image} />
        </DetailPhoto>

        <DetailInfo>
          <TypeTag $type={type}>
            <Text
              as="span"
              $base={BodySmall}
              $color="inherit"
              dangerouslySetInnerHTML={{ __html: typeLabel }}
            />
          </TypeTag>

          <Text
            as="h1"
            $base={H700}
            $md={H800}
            $color="ink800"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <MetaRow>
            <Text
              as="span"
              $base={BodySmall}
              $color="ink500"
              dangerouslySetInnerHTML={{
                __html: time ? `${date} · ${time}` : date,
              }}
            />

            {location && (
              <Text
                as="span"
                $base={BodySmall}
                $color="ink500"
                dangerouslySetInnerHTML={{ __html: location }}
              />
            )}
          </MetaRow>

          <Description>
            <Text
              $base={BodyBig}
              $color="ink600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Description>
        </DetailInfo>
      </DetailGrid>
    </Container>
  </Wrapper>
)
