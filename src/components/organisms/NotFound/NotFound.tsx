import React from 'react'

import { Button } from 'components/atoms/Button'
import { Link } from 'components/atoms/Link'
import {
  BodyBig,
  H500,
  H600,
  H700,
  H900,
  Text,
} from 'components/atoms/Typography'

import {
  Actions,
  CodeWrapper,
  Content,
  HeadingWrapper,
  LeadWrapper,
  Watermark,
  Wrapper,
} from './NotFound.style'

export type NotFoundProps = {
  code: string
  heading: string
  lead: string
  primaryCtaLabel: string
  primaryCtaTo: string
  secondaryCtaLabel: string
  secondaryCtaTo: string
}

export const NotFound: React.FC<NotFoundProps> = ({
  code,
  heading,
  lead,
  primaryCtaLabel,
  primaryCtaTo,
  secondaryCtaLabel,
  secondaryCtaTo,
}) => (
  <Wrapper>
    <Watermark />

    <Content>
      <CodeWrapper>
        <Text
          as="span"
          $base={H700}
          $md={H900}
          $color="terracotta"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </CodeWrapper>

      <HeadingWrapper>
        <Text
          as="h1"
          $base={H500}
          $md={H600}
          $color="ink800"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      </HeadingWrapper>

      <LeadWrapper>
        <Text
          $base={BodyBig}
          $color="ink600"
          dangerouslySetInnerHTML={{ __html: lead }}
        />
      </LeadWrapper>

      <Actions>
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
      </Actions>
    </Content>
  </Wrapper>
)
