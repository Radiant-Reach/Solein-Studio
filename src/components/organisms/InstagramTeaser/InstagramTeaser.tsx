import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Icon } from 'components/atoms/Icon'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodySmall, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import InstagramIcon from 'assets/images/icons/social/instagram.png'

import {
  HandleRow,
  HeaderRow,
  PhotoBadge,
  PhotoGrid,
  PhotoTile,
  Wrapper,
} from './InstagramTeaser.style'

export type InstagramTeaserPhoto = {
  id: string
  tone: PhotoFrameTone
}

export type InstagramTeaserProps = {
  eyebrow: string
  heading: string
  handle: string
  photos: InstagramTeaserPhoto[]
  ctaLabel: string
  ctaTo: string
}

export const InstagramTeaser: React.FC<InstagramTeaserProps> = ({
  eyebrow,
  heading,
  handle,
  photos,
  ctaLabel,
  ctaTo,
}) => (
  <Wrapper>
    <Container $variant="wide">
      <HeaderRow>
        <div>
          <SectionHeading eyebrow={eyebrow}>{heading}</SectionHeading>

          <HandleRow>
            <Icon src={InstagramIcon} size={16} />
            <Text
              as="span"
              $base={BodySmall}
              $color="ink600"
              dangerouslySetInnerHTML={{ __html: handle }}
            />
          </HandleRow>
        </div>

        <ArrowButton to={ctaTo} label={ctaLabel} color="ink800" />
      </HeaderRow>

      <PhotoGrid>
        {photos.map((photo) => (
          <PhotoTile key={photo.id}>
            <PhotoFrame tone={photo.tone} />

            <PhotoBadge>
              <Icon src={InstagramIcon} size={12} />
            </PhotoBadge>
          </PhotoTile>
        ))}
      </PhotoGrid>
    </Container>
  </Wrapper>
)
