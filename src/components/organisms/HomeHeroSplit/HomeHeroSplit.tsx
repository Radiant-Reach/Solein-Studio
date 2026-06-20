import React from 'react'

import { Button } from 'components/atoms/Button'
import { Image } from 'components/atoms/Image'
import { Link } from 'components/atoms/Link'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { LOGO_FULL_CREAM_SRC } from 'constants/brand'

import {
  BrandPanel,
  Content,
  HeroWrapper,
  Logo,
  PhotoPanel,
  Texture,
} from './HomeHeroSplit.style'

export type HomeHeroSplitProps = {
  leftTone: PhotoFrameTone
  rightTone: PhotoFrameTone
  ctaLabel: string
  ctaTo: string
}

export const HomeHeroSplit: React.FC<HomeHeroSplitProps> = ({
  leftTone,
  rightTone,
  ctaLabel,
  ctaTo,
}) => (
  <HeroWrapper>
    <PhotoPanel>
      <PhotoFrame tone={leftTone} radius={0} />
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
      <PhotoFrame tone={rightTone} radius={0} />
    </PhotoPanel>
  </HeroWrapper>
)
