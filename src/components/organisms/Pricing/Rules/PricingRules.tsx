import React from 'react'

import { Container } from 'components/atoms/Container'
import { BodySmall, Text } from 'components/atoms/Typography'

import {
  Notice,
  NoticeDivider,
  RulesList,
  RulesSection,
} from './PricingRules.style'

export type PricingRuleItem = {
  id: string
  text: React.ReactNode
}

export type PricingRulesProps = {
  rules: PricingRuleItem[]
  notice: React.ReactNode
}

export const PricingRules: React.FC<PricingRulesProps> = ({
  rules,
  notice,
}) => (
  <RulesSection>
    <Container $variant="wide">
      <RulesList>
        {rules.map((rule) => (
          <li key={rule.id}>
            <Text
              as="span"
              $base={BodySmall}
              $color="ink500"
              $align="center"
              dangerouslySetInnerHTML={{ __html: rule.text }}
            />
          </li>
        ))}
      </RulesList>

      <NoticeDivider />

      <Notice>
        <Text
          as="span"
          $base={BodySmall}
          $color="ink800"
          $align="center"
          dangerouslySetInnerHTML={{ __html: notice }}
        />
      </Notice>
    </Container>
  </RulesSection>
)
