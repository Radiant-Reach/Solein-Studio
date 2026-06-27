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

import { ImageType } from 'types/page'

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
  StudioIntroVariant,
  Wrapper,
} from './StudioIntro.style'

export type StudioParagraph = {
  id: string
  text: string
}

export type StudioPhoto = {
  id: string
  tone: PhotoFrameTone
  image?: ImageType
}

export type StudioFeature = {
  id: string
  eyebrow: string
  heading: string
  body: string
  tone: PhotoFrameTone
  image?: ImageType
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
  // Soleil Collective subpage reuses this exact content shape but with the
  // sub-brand's reddish/pink accent instead of the site's usual terracotta.
  variant?: StudioIntroVariant
}

const FeatureTextBlock: React.FC<{
  feature: StudioFeature
  variant: StudioIntroVariant
}> = ({ feature, variant }) => (
  <FeatureText>
    <Text
      as="span"
      $base={BodySmall}
      $transform="uppercase"
      $color={variant === 'collective' ? 'rose600' : 'terracotta'}
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
  variant = 'studio',
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const galleryPhotos: StudioPhoto[] = [
    ...heroPhotos,
    ...features.map((feature) => ({
      id: feature.id,
      tone: feature.tone,
      image: feature.image,
    })),
  ]

  const activePhoto = activeIndex !== null ? galleryPhotos[activeIndex] : null

  // Text-only sections read better narrower; photo/feature rows keep the
  // full-width container. Soleil Collective also moves the photo grid to
  // sit right before the CTA instead of right after the intro — kept
  // behind the variant check so the existing Lokalizacja usage (variant
  // "studio") renders exactly as before.
  const isCollective = variant === 'collective'
  const textContainerVariant = isCollective ? 'slim' : 'normal'

  const introBlock = (
    <Container $variant={textContainerVariant}>
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
    </Container>
  )

  const galleryBlock = (
    <Container $variant="normal">
      <HeroPhotoRow>
        {heroPhotos.map((photo, index) => (
          <HeroPhotoTile key={photo.id}>
            <PhotoTileButton
              type="button"
              aria-label="Powiększ zdjęcie"
              onClick={() => setActiveIndex(index)}
            >
              <PhotoFrame tone={photo.tone} image={photo.image} />
            </PhotoTileButton>
          </HeroPhotoTile>
        ))}
      </HeroPhotoRow>
    </Container>
  )

  const featuresBlock = (
    <Container $variant="normal">
      {features.map((feature, index) => {
        const galleryIndex = heroPhotos.length + index

        return (
          <FeatureRow key={feature.id} $variant={variant}>
            {index % 2 === 1 ? (
              <>
                <FeatureTextBlock feature={feature} variant={variant} />
                <FeaturePhoto>
                  <PhotoTileButton
                    type="button"
                    aria-label="Powiększ zdjęcie"
                    onClick={() => setActiveIndex(galleryIndex)}
                  >
                    <PhotoFrame tone={feature.tone} image={feature.image} />
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
                    <PhotoFrame tone={feature.tone} image={feature.image} />
                  </PhotoTileButton>
                </FeaturePhoto>
                <FeatureTextBlock feature={feature} variant={variant} />
              </>
            )}
          </FeatureRow>
        )
      })}
    </Container>
  )

  const ctaBlock = (
    <Container $variant={textContainerVariant}>
      <CtaWrapper>
        <Text
          $base={H400}
          $md={H500}
          $lg={H700}
          $color="ink600"
          $align="center"
          dangerouslySetInnerHTML={{ __html: ctaText }}
        />
        <ArrowButton
          to={ctaTo}
          label={ctaLabel}
          color={isCollective ? 'rose700' : 'ink800'}
        />
      </CtaWrapper>
    </Container>
  )

  return (
    <Wrapper $variant={variant}>
      {introBlock}

      {isCollective ? (
        <>
          {featuresBlock}
          {galleryBlock}
        </>
      ) : (
        <>
          {galleryBlock}
          {featuresBlock}
        </>
      )}

      {ctaBlock}

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
            <PhotoFrame tone={activePhoto.tone} image={activePhoto.image} />
          </LightboxPhoto>
        )}
      </Lightbox>
    </Wrapper>
  )
}
