import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import {
  B400,
  BodyMedium,
  BodySmall,
  H100,
  H600,
  H700,
  Text,
} from 'components/atoms/Typography'

import {
  AddonBlock,
  AddonPriceLine,
  AddonsColumn,
  AddonsGrid,
  AddonsHeadingWrapper,
  AddonsSection,
  ColumnDivider,
  QuoteBullet,
  QuoteList,
  QuoteRow,
} from './PricingAddons.style'

export type PricingAddonNote = {
  id: string
  text: React.ReactNode
}

export type PricingQuoteItem = {
  id: string
  text: string
}

export type PricingAddonsProps = {
  addonsHeading: string
  makeupTitle: string
  makeupPrice: string
  makeupUnit: string
  makeupNote: string
  makeupDescription: string
  extraNotes: PricingAddonNote[]
  quoteHeading: string
  quoteItems: PricingQuoteItem[]
  quoteCtaLabel: string
  quoteCtaTo: string
}

export const PricingAddons: React.FC<PricingAddonsProps> = ({
  addonsHeading,
  makeupTitle,
  makeupPrice,
  makeupUnit,
  makeupNote,
  makeupDescription,
  extraNotes,
  quoteHeading,
  quoteItems,
  quoteCtaLabel,
  quoteCtaTo,
}) => (
  <AddonsSection>
    <Container $variant="wide">
      <AddonsHeadingWrapper>
        <Text
          as="h2"
          $base={H600}
          $md={H700}
          $transform="uppercase"
          $color="ink800"
          $align="center"
          dangerouslySetInnerHTML={{ __html: addonsHeading }}
        />
      </AddonsHeadingWrapper>

      <AddonsGrid>
        <AddonsColumn>
          <ColumnDivider />

          <AddonBlock>
            <Text
              as="h4"
              $base={H100}
              $transform="uppercase"
              $color="ink800"
              dangerouslySetInnerHTML={{ __html: makeupTitle }}
            />

            <AddonPriceLine>
              <Text
                as="span"
                $base={B400}
                $color="terracotta"
                dangerouslySetInnerHTML={{
                  __html: `${makeupPrice}${makeupUnit}`,
                }}
              />
              <Text
                as="span"
                $base={BodySmall}
                $transform="uppercase"
                $color="ink500"
                dangerouslySetInnerHTML={{ __html: makeupNote }}
              />
            </AddonPriceLine>

            <Text
              $base={BodyMedium}
              $color="ink600"
              dangerouslySetInnerHTML={{ __html: makeupDescription }}
            />
          </AddonBlock>

          {extraNotes.map((note) => (
            <AddonBlock key={note.id}>
              <Text $base={BodyMedium} $color="ink600">
                {note.text}
              </Text>
            </AddonBlock>
          ))}
        </AddonsColumn>

        <AddonsColumn>
          <ColumnDivider />

          <Text
            as="h4"
            $base={H100}
            $transform="uppercase"
            $color="ink800"
            dangerouslySetInnerHTML={{ __html: quoteHeading }}
          />

          <QuoteList>
            {quoteItems.map((item) => (
              <QuoteRow key={item.id}>
                <QuoteBullet>•</QuoteBullet>
                <Text
                  as="span"
                  $base={BodyMedium}
                  $color="ink600"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </QuoteRow>
            ))}
          </QuoteList>

          <ArrowButton
            to={quoteCtaTo}
            label={quoteCtaLabel}
            color="ink800"
            uppercase
          />
        </AddonsColumn>
      </AddonsGrid>
    </Container>
  </AddonsSection>
)
