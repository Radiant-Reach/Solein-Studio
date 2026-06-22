import React from 'react'

import { Button } from 'components/atoms/Button'
import { Image } from 'components/atoms/Image'
import { Link } from 'components/atoms/Link'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { LOGO_FULL_CREAM_SRC } from 'constants/brand'

import { ImageType } from 'types/page'

import {
  BrandPanel,
  Content,
  HeroWrapper,
  Logo,
  PhotoPanel,
  Texture,
} from './HomeHero.style'

export type HomeHeroProps = {
  leftTone: PhotoFrameTone
  leftImage?: ImageType
  rightTone: PhotoFrameTone
  rightImage?: ImageType
  ctaLabel: string
  ctaTo: string
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  leftTone,
  leftImage,
  rightTone,
  rightImage,
  ctaLabel,
  ctaTo,
}) => (
  <HeroWrapper>
    <PhotoPanel>
      <PhotoFrame tone={leftTone} image={leftImage} radius={0} />
    </PhotoPanel>

    <BrandPanel>
      <Texture />

      <Content>
        <Logo>
          <Image
            src={LOGO_FULL_CREAM_SRC}
            alt="Soleil Studio"
            objectFit="contain"
          />
        </Logo>

        <Button
          as={Link}
          to={ctaTo}
          $variant="primaryContrast"
          $size="large"
          dangerouslySetInnerHTML={{ __html: ctaLabel }}
        />
      </Content>
    </BrandPanel>

    <PhotoPanel>
      <PhotoFrame tone={rightTone} image={rightImage} radius={0} />
    </PhotoPanel>
  </HeroWrapper>
)
