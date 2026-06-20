import React from 'react'

import { Button } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Link } from 'components/atoms/Link'
import { B400, BodySmall, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  Card,
  Ctas,
  HeadingWrapper,
  Row,
  RowsList,
  Wrapper,
} from './RoomPricing.style'

export type RoomPricingRow = {
  id: string
  label: string
  price: string
  highlight?: boolean
}

export type RoomPricingProps = {
  eyebrow: string
  heading: string
  lead?: string
  rows: RoomPricingRow[]
  primaryCtaLabel: string
  primaryCtaTo: string
  secondaryCtaLabel: string
  secondaryCtaTo: string
}

export const RoomPricing: React.FC<RoomPricingProps> = ({
  eyebrow,
  heading,
  lead,
  rows,
  primaryCtaLabel,
  primaryCtaTo,
  secondaryCtaLabel,
  secondaryCtaTo,
}) => (
  <Wrapper>
    <Container $variant="wide">
      <HeadingWrapper>
        <SectionHeading eyebrow={eyebrow} lead={lead} align="center">
          {heading}
        </SectionHeading>
      </HeadingWrapper>

      <Card>
        <RowsList>
          {rows.map((row) => (
            <Row key={row.id}>
              <Text
                as="span"
                $base={BodySmall}
                $transform="uppercase"
                $color={row.highlight ? 'terracotta' : 'ink500'}
                dangerouslySetInnerHTML={{ __html: row.label }}
              />
              <Text
                as="span"
                $base={B400}
                $color={row.highlight ? 'terracotta' : 'ink800'}
                dangerouslySetInnerHTML={{ __html: row.price }}
              />
            </Row>
          ))}
        </RowsList>

        <Ctas>
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
        </Ctas>
      </Card>
    </Container>
  </Wrapper>
)
