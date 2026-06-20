import React from 'react'

import { Container } from 'components/atoms/Container'

import { Accordion, AccordionItem } from 'components/molecules/Accordion'
import { SectionHeading } from 'components/molecules/SectionHeading'

import { HeadingWrapper, Wrapper } from './FAQ.style'

export type FAQProps = {
  eyebrow: string
  heading: string
  lead: string
  items: AccordionItem[]
}

export const FAQ: React.FC<FAQProps> = ({ eyebrow, heading, lead, items }) => (
  <Wrapper>
    <Container $variant="slim">
      <HeadingWrapper>
        <SectionHeading eyebrow={eyebrow} align="center" lead={lead}>
          {heading}
        </SectionHeading>
      </HeadingWrapper>

      <Accordion items={items} />
    </Container>
  </Wrapper>
)
