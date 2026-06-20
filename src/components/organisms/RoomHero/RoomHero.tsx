import React from 'react'

import { Button } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Link } from 'components/atoms/Link'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import {
  BodyBig,
  BodySmall,
  H700,
  H800,
  Text,
} from 'components/atoms/Typography'

import {
  BackLink,
  HeroButtons,
  HeroDescription,
  HeroGrid,
  HeroPhoto,
  HeroText,
  HeroWrapper,
} from './RoomHero.style'

export type RoomHeroProps = {
  backTo: string
  backLabel: string
  eyebrow: string
  name: string
  description: string
  heroTone: PhotoFrameTone
  primaryCtaLabel: string
  primaryCtaTo: string
  secondaryCtaLabel: string
  secondaryCtaTo: string
}

export const RoomHero: React.FC<RoomHeroProps> = ({
  backTo,
  backLabel,
  eyebrow,
  name,
  description,
  heroTone,
  primaryCtaLabel,
  primaryCtaTo,
  secondaryCtaLabel,
  secondaryCtaTo,
}) => (
  <HeroWrapper>
    <Container $variant="wide">
      <BackLink
        to={backTo}
        dangerouslySetInnerHTML={{ __html: `← ${backLabel}` }}
      />

      <HeroGrid>
        <HeroText>
          <Text
            as="span"
            $base={BodySmall}
            $transform="uppercase"
            $color="terracotta"
            dangerouslySetInnerHTML={{ __html: eyebrow }}
          />

          <Text
            as="h1"
            $base={H700}
            $md={H800}
            $color="ink800"
            dangerouslySetInnerHTML={{ __html: name }}
          />

          <HeroDescription>
            <Text
              $base={BodyBig}
              $color="ink600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </HeroDescription>

          <HeroButtons>
            <Button
              as={Link}
              to={primaryCtaTo}
              $variant="primary"
              $size="large"
              dangerouslySetInnerHTML={{ __html: primaryCtaLabel }}
            />
            <Button
              as={Link}
              to={secondaryCtaTo}
              $variant="secondary"
              $size="large"
              dangerouslySetInnerHTML={{ __html: secondaryCtaLabel }}
            />
          </HeroButtons>
        </HeroText>

        <HeroPhoto>
          <PhotoFrame tone={heroTone} />
        </HeroPhoto>
      </HeroGrid>
    </Container>
  </HeroWrapper>
)
