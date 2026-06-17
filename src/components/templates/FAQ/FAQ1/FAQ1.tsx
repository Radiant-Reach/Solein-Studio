import React, { useState } from 'react'

import * as S from './FAQ1.style'

type FaqItem = {
  question: string
  answer: string
}

type FAQ1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  items?: FaqItem[]
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: 'What services do you offer?',
    answer:
      'We offer a wide range of cosmetic services including lip modeling, wrinkle filling, tissue stimulators, PDO threads, mesotherapy, and more. Visit our services page for a full list.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book an appointment by calling us, sending a message through the contact form, or using the booking button at the top of the page.',
  },
  {
    question: 'Are the procedures safe?',
    answer:
      'All procedures are performed by certified specialists using certified, high-quality products. We always conduct a consultation before any treatment to ensure it is suitable for you.',
  },
  {
    question: 'How long do the effects last?',
    answer:
      'The duration of results varies depending on the procedure and individual factors. Most treatments last between 6 and 18 months. During your consultation, we will provide a detailed estimate for your specific case.',
  },
  {
    question: 'Do I need to prepare for a treatment?',
    answer:
      'Some procedures require specific preparation, such as avoiding blood-thinning medications or alcohol in the days before. Full preparation guidelines will be provided at your consultation.',
  },
]

export const FAQ1: React.FC<FAQ1Props> = ({
  id = 'faq',
  eyebrow = 'FAQ',
  title = (
    <>
      Frequently Asked <em>Questions</em>
    </>
  ),
  items = DEFAULT_ITEMS,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  return (
    <S.Section id={id}>
      <S.Container>
        <S.Header>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
        </S.Header>

        {items.map(({ question, answer }, index) => {
          const active = activeIndex === index
          return (
            <S.Item key={index}>
              <S.Question onClick={() => toggle(index)}>
                <S.QuestionText $active={active}>{question}</S.QuestionText>
                <S.Icon $active={active}>+</S.Icon>
              </S.Question>
              <S.Answer $active={active}>
                <S.AnswerText>{answer}</S.AnswerText>
              </S.Answer>
            </S.Item>
          )
        })}
      </S.Container>
    </S.Section>
  )
}
