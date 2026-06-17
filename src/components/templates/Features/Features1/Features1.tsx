import React from 'react'

import { Button } from 'components/atoms/Button'
import { Image } from 'components/atoms/Image'

import * as S from './Features1.style'

type Feature = {
  icon: string
  title: string
  description: string
}

type FeatureImage = {
  src: string
  alt: string
}

type Features1Props = {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  features?: Feature[]
  images?: [FeatureImage, FeatureImage, FeatureImage]
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: '✂️',
    title: 'Precyzyjne cięcie',
    description:
      'Każde strzyżenie poprzedzone konsultacją i doborem techniki do typu włosów i kształtu twarzy',
  },
  {
    icon: '🌿',
    title: 'Dopasowane do Ciebie',
    description:
      'Indywidualne podejście — słuchamy i doradzamy, żeby efekt spełnił Twoje oczekiwania',
  },
  {
    icon: '✨',
    title: 'Precyzja i dbałość',
    description:
      'Każde strzyżenie wykonujemy z pełnym zaangażowaniem i starannością — od grzywki po końcówki',
  },
]

const DEFAULT_IMAGES: [FeatureImage, FeatureImage, FeatureImage] = [
  {
    src: 'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7bc3c033b8ae4a4a689a4.png',
    alt: 'Strzyżenie damskie',
  },
  {
    src: 'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7bd835e482c379bb71d76.jpg',
    alt: 'Strzyżenie męskie',
  },
  {
    src: 'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4c.jpg',
    alt: 'Stylizacja włosów',
  },
]

export const Features1: React.FC<Features1Props> = ({
  id = 'featured',
  eyebrow = 'Tworzone z pasją',
  title = 'Sztuka strzyżenia i stylizacji',
  description = 'Łączymy klasyczne techniki cięcia z nowoczesnymi metodami stylizacji, aby każda fryzura była precyzyjna, trwała i dopasowana do Ciebie. U nas dbałość o szczegóły to standard.',
  ctaLabel = 'Umów wizytę',
  ctaHref = '/umow-wizyte',
  features = DEFAULT_FEATURES,
  images = DEFAULT_IMAGES,
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Inner>
          <S.Content>
            <S.Label>{eyebrow}</S.Label>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>

            <S.FeatureGrid>
              {features.map(({ icon, title: featureTitle, description: featureDesc }) => (
                <S.FeatureItem key={featureTitle}>
                  <S.FeatureIcon>{icon}</S.FeatureIcon>
                  <S.FeatureItemTitle>{featureTitle}</S.FeatureItemTitle>
                  <S.FeatureItemDesc>{featureDesc}</S.FeatureItemDesc>
                </S.FeatureItem>
              ))}
            </S.FeatureGrid>

            <Button as="a" href={ctaHref} $variant="primary" $size="large">
              {ctaLabel}
            </Button>
          </S.Content>

          <S.ImageSection>
            <S.ImageGrid>
              {images.map(({ src, alt }) => (
                <S.ImageItem key={src}>
                  <Image src={src} alt={alt} objectFit="cover" />
                </S.ImageItem>
              ))}
            </S.ImageGrid>
          </S.ImageSection>
        </S.Inner>
      </S.Container>
    </S.Section>
  )
}
