import React from 'react'

import { Button } from 'components/atoms/Button'
import { Image } from 'components/atoms/Image'

import * as S from './Hero1.style'

type Hero1Props = {
  id?: string
  backgroundImage?: string
  sideImage?: string
  sideImageAlt?: string
  description?: string
  reviewsBadgeSrc?: string
  reviewsText?: string
  ctaLabel?: string
  ctaHref?: string
}

const DEFAULT_BG =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69adddb8e041da4849a19a8b.png'
const DEFAULT_BADGE =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69b6a0ddeaf0816cf079ea95.png'

export const Hero1: React.FC<Hero1Props> = ({
  id = 'home',
  backgroundImage = DEFAULT_BG,
  sideImage = DEFAULT_BG,
  sideImageAlt = 'Hero image',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere a erat vel fermentum. Aenean nisl enim, facilisis non ex in, fringilla placerat nisl.',
  reviewsBadgeSrc = DEFAULT_BADGE,
  reviewsText = '300 pięciogwiazdkowych opinii',
  ctaLabel = 'Zobacz nasze Usługi',
  ctaHref = '#collections',
}) => {
  return (
    <S.HeroSection id={id} $bgImage={backgroundImage}>
      <S.HeroBg />
      <S.HeroContainer>
        <S.HeroLeft>
          <S.HeroTitle>
            <S.HeroLine $delay={0.2}>
              <span>Redefine</span>
            </S.HeroLine>
            <S.HeroLine $delay={0.3}>
              <span>
                Your <S.HeroAccent>Style</S.HeroAccent>
              </span>
            </S.HeroLine>
            <S.HeroLine $delay={0.4}>
              <span>Revolution</span>
            </S.HeroLine>
          </S.HeroTitle>

          <S.HeroDescription>{description}</S.HeroDescription>

          <S.HeroGoogleReviews>
            <img src={reviewsBadgeSrc} alt="Google 5 stars" />
            <S.HeroGoogleReviewsText>{reviewsText}</S.HeroGoogleReviewsText>
          </S.HeroGoogleReviews>

          <S.HeroCtaGroup>
            <Button as="a" href={ctaHref} $variant="primary" $size="large">
              {ctaLabel}
            </Button>
          </S.HeroCtaGroup>
        </S.HeroLeft>

        <S.HeroRight>
          <S.HeroImageWrapper>
            <S.HeroImage>
              <Image src={sideImage} alt={sideImageAlt} />
              <S.HeroImageOverlay />
            </S.HeroImage>
          </S.HeroImageWrapper>
        </S.HeroRight>
      </S.HeroContainer>

      <S.HeroScrollIndicator>
        <span />
      </S.HeroScrollIndicator>
    </S.HeroSection>
  )
}
