import React, { useState } from 'react'

import { Icon } from 'components/atoms/Icon'
import { BodyBig, BodySmall, Text } from 'components/atoms/Typography'

import { ReactComponent as ChevronDown } from 'assets/icons/arrows/chevron-down.svg'

import {
  AnswerInner,
  AnswerWrapper,
  Chevron,
  Item,
  List,
  Question,
} from './Accordion.style'

export type AccordionItem = {
  id: string
  question: string
  answer: string
}

const AccordionRow: React.FC<{ item: AccordionItem }> = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <Item>
      <Question
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text
          as="span"
          $base={BodyBig}
          $color="ink800"
          dangerouslySetInnerHTML={{ __html: item.question }}
        />
        <Chevron $open={open}>
          <Icon src={ChevronDown} size={14} />
        </Chevron>
      </Question>

      <AnswerWrapper $open={open}>
        <AnswerInner $open={open}>
          <Text
            $base={BodySmall}
            $color="ink600"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </AnswerInner>
      </AnswerWrapper>
    </Item>
  )
}

export type AccordionProps = {
  items: AccordionItem[]
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => (
  <List>
    {items.map((item) => (
      <AccordionRow key={item.id} item={item} />
    ))}
  </List>
)
