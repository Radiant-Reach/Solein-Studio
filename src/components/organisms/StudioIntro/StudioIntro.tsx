import React, { useState } from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import {
  BodyMedium,
  BodySmall,
  H200,
  H300,
  H400,
  H500,
  H600,
  H700,
  H800,
  Text,
} from 'components/atoms/Typography'

import { Lightbox } from 'components/molecules/Lightbox'
import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  CtaWrapper,
  FeaturePhoto,
  FeatureRow,
  FeatureText,
  HeroPhotoRow,
  HeroPhotoTile,
  IntroParagraphs,
  IntroWrapper,
  LightboxPhoto,
  PhotoTileButton,
  Wrapper,
} from './StudioIntro.style'

export type StudioParagraph = {
  id: string
  text: string
}

export type StudioPhoto = {
  id: string
  tone: PhotoFrameTone
}

export type StudioFeature = {
  id: string
  eyebrow: string
  heading: string
  body: string
  tone: PhotoFrameTone
}

export type StudioIntroProps = {
  eyebrow: string
  heading: string
  lead: string
  paragraphs: StudioParagraph[]
  heroPhotos: StudioPhoto[]
  features: StudioFeature[]
  ctaText: string
  ctaLabel: string
  ctaTo: string
}

const FeatureTextBlock: React.FC<{ feature: StudioFeature }> = ({
  feature,
}) => (
  <FeatureText>
    <Text
      as="span"
      $base={BodySmall}
      $transform="uppercase"
      $color="terracotta"
      dangerouslySetInnerHTML={{ __html: feature.eyebrow }}
    />
    <Text
      as="h3"
      $base={H500}
      $md={H600}
      $lg={H800}
      $color="ink800"
      dangerouslySetInnerHTML={{ __html: feature.heading }}
    />
    <Text
      $base={BodyMedium}
      $color="ink600"
      dangerouslySetInnerHTML={{ __html: feature.body }}
    />
  </FeatureText>
)

export const StudioIntro: React.FC<StudioIntroProps> = ({
  eyebrow,
  heading,
  lead,
  paragraphs,
  heroPhotos,
  features,
  ctaText,
  ctaLabel,
  ctaTo,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const galleryPhotos: StudioPhoto[] = [
    ...heroPhotos,
    ...features.map((feature) => ({ id: feature.id, tone: feature.tone })),
  ]

  const activePhoto = activeIndex !== null ? galleryPhotos[activeIndex] : null

  return (
    <Wrapper>
      <Container $variant="normal">
        <IntroWrapper>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>

          <IntroParagraphs>
            {paragraphs.map((paragraph) => (
              <Text
                key={paragraph.id}
                $base={BodyMedium}
                $color="ink600"
                dangerouslySetInnerHTML={{ __html: paragraph.text }}
              />
            ))}
          </IntroParagraphs>
        </IntroWrapper>

        <HeroPhotoRow>
          {heroPhotos.map((photo, index) => (
            <HeroPhotoTile key={photo.id}>
              <PhotoTileButton
                type="button"
                aria-label="Powiększ zdjęcie"
                onClick={() => setActiveIndex(index)}
              >
                <PhotoFrame tone={photo.tone} />
              </PhotoTileButton>
            </HeroPhotoTile>
          ))}
        </HeroPhotoRow>

        {features.map((feature, index) => {
          const galleryIndex = heroPhotos.length + index

          return (
            <FeatureRow key={feature.id}>
              {index % 2 === 1 ? (
                <>
                  <FeatureTextBlock feature={feature} />
                  <FeaturePhoto>
                    <PhotoTileButton
                      type="button"
                      aria-label="Powiększ zdjęcie"
                      onClick={() => setActiveIndex(galleryIndex)}
                    >
                      <PhotoFrame tone={feature.tone} />
                    </PhotoTileButton>
                  </FeaturePhoto>
                </>
              ) : (
                <>
                  <FeaturePhoto>
                    <PhotoTileButton
                      type="button"
                      aria-label="Powiększ zdjęcie"
                      onClick={() => setActiveIndex(galleryIndex)}
                    >
                      <PhotoFrame tone={feature.tone} />
                    </PhotoTileButton>
                  </FeaturePhoto>
                  <FeatureTextBlock feature={feature} />
                </>
              )}
            </FeatureRow>
          )
        })}

        <CtaWrapper>
          <Text
            $base={H400}
            $md={H500}
            $lg={H700}
            $color="ink600"
            $align="center"
            dangerouslySetInnerHTML={{ __html: ctaText }}
          />
          <ArrowButton to={ctaTo} label={ctaLabel} color="ink800" />
        </CtaWrapper>
      </Container>

      <Lightbox
        isOpen={activePhoto !== null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          galleryPhotos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + galleryPhotos.length) % galleryPhotos.length
                )
            : undefined
        }
        onNext={
          galleryPhotos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev + 1) % galleryPhotos.length
                )
            : undefined
        }
      >
        {activePhoto && (
          <LightboxPhoto>
            <PhotoFrame tone={activePhoto.tone} />
          </LightboxPhoto>
        )}
      </Lightbox>
    </Wrapper>
  )
}
