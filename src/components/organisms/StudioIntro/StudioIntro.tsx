import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import {
  BodyMedium,
  BodySmall,
  H500,
  H600,
  H800,
  Text,
} from 'components/atoms/Typography'

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
}) => (
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
        {heroPhotos.map((photo) => (
          <HeroPhotoTile key={photo.id}>
            <PhotoFrame tone={photo.tone} />
          </HeroPhotoTile>
        ))}
      </HeroPhotoRow>

      {features.map((feature, index) => (
        <FeatureRow key={feature.id}>
          {index % 2 === 1 ? (
            <>
              <FeatureTextBlock feature={feature} />
              <FeaturePhoto>
                <PhotoFrame tone={feature.tone} />
              </FeaturePhoto>
            </>
          ) : (
            <>
              <FeaturePhoto>
                <PhotoFrame tone={feature.tone} />
              </FeaturePhoto>
              <FeatureTextBlock feature={feature} />
            </>
          )}
        </FeatureRow>
      ))}

      <CtaWrapper>
        <Text
          $base={BodyMedium}
          $color="ink600"
          dangerouslySetInnerHTML={{ __html: ctaText }}
        />
        <ArrowButton to={ctaTo} label={ctaLabel} color="ink800" />
      </CtaWrapper>
    </Container>
  </Wrapper>
)
