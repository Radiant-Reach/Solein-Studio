import React from 'react'

import { Container } from 'components/atoms/Container'
import {
  BodyBig,
  H400,
  H500,
  H900,
  H1000,
  Text,
} from 'components/atoms/Typography'

import {
  HeroDivider,
  HeroLead,
  HeroSection,
  ScriptLine,
} from './PricingHero.style'

export type PricingHeroProps = {
  scriptLabel: string
  heading: string
  lead: string
}

export const PricingHero: React.FC<PricingHeroProps> = ({
  scriptLabel,
  heading,
  lead,
}) => (
  <HeroSection>
    <Container $variant="wide">
      <ScriptLine>
        <Text
          as="span"
          $base={H400}
          $md={H500}
          $color="terracotta"
          $align="center"
          dangerouslySetInnerHTML={{ __html: scriptLabel }}
        />
      </ScriptLine>

      <Text
        as="h1"
        $base={H900}
        $md={H1000}
        $transform="uppercase"
        $color="ink800"
        $align="center"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      <HeroLead>
        <Text
          as="span"
          $base={BodyBig}
          $color="ink600"
          $align="center"
          dangerouslySetInnerHTML={{ __html: lead }}
        />
      </HeroLead>

      <HeroDivider />
    </Container>
  </HeroSection>
)
