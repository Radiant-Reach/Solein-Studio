import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import {
  B400,
  BodySmall,
  H400,
  H600,
  H700,
  Text,
} from 'components/atoms/Typography'

import {
  PlanCard,
  PlanHeading,
  PlansDivider,
  PlansGrid,
  PlansSection,
  Row,
  RowsList,
  ScriptLine,
} from './PricingPlans.style'

export type PricingRow = {
  id: string
  label: string
  price: string
  highlight?: boolean
}

export type PricingPlan = {
  id: string
  scriptLabel: string
  heading: string
  rows: PricingRow[]
  ctaLabel: string
  ctaTo: string
  contrast?: boolean
}

export type PricingPlansProps = {
  plans: PricingPlan[]
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ plans }) => (
  <PlansSection>
    <Container $variant="wide">
      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard key={plan.id} $contrast={plan.contrast}>
            <PlanHeading>
              <ScriptLine>
                <Text
                  as="span"
                  $base={H400}
                  $color={plan.contrast ? 'cream' : 'terracotta'}
                  dangerouslySetInnerHTML={{ __html: plan.scriptLabel }}
                />
              </ScriptLine>

              <Text
                as="h2"
                $base={H600}
                $md={H700}
                $transform="uppercase"
                $color={plan.contrast ? 'sand' : 'ink800'}
                dangerouslySetInnerHTML={{ __html: plan.heading }}
              />
            </PlanHeading>

            <RowsList>
              {plan.rows.map((row) => (
                <Row key={row.id} $contrast={plan.contrast}>
                  <Text
                    as="span"
                    $base={BodySmall}
                    $transform="uppercase"
                    $color={
                      row.highlight
                        ? 'terracotta'
                        : plan.contrast
                          ? 'creamA8'
                          : 'ink500'
                    }
                    dangerouslySetInnerHTML={{ __html: row.label }}
                  />
                  <Text
                    as="span"
                    $base={B400}
                    $color={
                      row.highlight
                        ? 'terracotta'
                        : plan.contrast
                          ? 'sand'
                          : 'ink800'
                    }
                    dangerouslySetInnerHTML={{ __html: row.price }}
                  />
                </Row>
              ))}
            </RowsList>

            <ArrowButton
              to={plan.ctaTo}
              label={plan.ctaLabel}
              uppercase
              variant={plan.contrast ? 'primaryContrast' : 'primary'}
              color={plan.contrast ? 'cream' : 'ink800'}
            />
          </PlanCard>
        ))}
      </PlansGrid>

      <PlansDivider />
    </Container>
  </PlansSection>
)
