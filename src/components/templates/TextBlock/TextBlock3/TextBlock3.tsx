import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './TextBlock3.style'

type TextBlock3Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  paragraphs?: string[]
  ctaLabel?: string
  ctaHref?: string
}

const DEFAULT_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus lacus nulla, eget varius justo tristique ut. Etiam a tellus magna, vel condimentum nulla.',
  'Aliquam vel gravida ligula. Phasellus ut purus ac libero ultrices commodo at quam. In vestibulum purus sit amet tempus euismod.',
]

export const TextBlock3: React.FC<TextBlock3Props> = ({
  id,
  eyebrow = 'O nas',
  title = (
    <>
      Piękno zaczyna się od <em>pielęgnacji</em>
    </>
  ),
  paragraphs = DEFAULT_PARAGRAPHS,
  ctaLabel = 'Dowiedz się więcej',
  ctaHref = '/o-nas',
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Eyebrow>{eyebrow}</S.Eyebrow>
        <S.Title>{title}</S.Title>
        {paragraphs.map((text, i) => (
          <S.Paragraph key={i}>{text}</S.Paragraph>
        ))}
        <Button as="a" href={ctaHref} $variant="primary" $size="large">
          {ctaLabel}
        </Button>
      </S.Container>
    </S.Section>
  )
}
