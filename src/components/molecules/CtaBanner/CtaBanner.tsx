import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { BodyBig, H700, H800, Text } from 'components/atoms/Typography'

import {
  Content,
  CtaAction,
  HeadingWrapper,
  LeadWrapper,
  Watermark,
  Wrapper,
} from './CtaBanner.style'

export type CtaBannerProps = {
  heading: string
  text: string
  ctaLabel: string
  ctaTo: string
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  heading,
  text,
  ctaLabel,
  ctaTo,
}) => (
  <Wrapper>
    <Watermark />

    <Content>
      <HeadingWrapper>
        <Text
          as="h2"
          $base={H700}
          $md={H800}
          $color="cream"
          $align="center"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </HeadingWrapper>

      <LeadWrapper>
        <Text
          $base={BodyBig}
          $color="creamA8"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </LeadWrapper>

      <CtaAction>
        <ArrowButton
          to={ctaTo}
          label={ctaLabel}
          variant="primaryContrast"
          color="cream"
          uppercase
        />
      </CtaAction>
    </Content>
  </Wrapper>
)
