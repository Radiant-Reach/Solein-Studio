import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './TextBlock2.style'

const DEFAULT_IMAGE =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7bd835e482c379bb71d76.jpg'

type TextBlock2Props = {
  id?: string
  imageSrc?: string
  imageAlt?: string
  eyebrow?: string
  title?: React.ReactNode
  paragraphs?: string[]
  ctaLabel?: string
  ctaHref?: string
}

const DEFAULT_PARAGRAPHS = [
  'Strzyżenie u nas to nie tylko cięcie — to konsultacja, dobór techniki i precyzja w każdym detalu. Hanna zadba o to, żeby efekt był dokładnie taki, jakiego oczekujesz.',
  'Możesz przyjść bez zapisu i poczekać w kolejce, albo zarezerwować termin online — szybko, wygodnie, bez czekania.',
]

export const TextBlock2: React.FC<TextBlock2Props> = ({
  id,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Fryzjerka Hanna — Salon EFEKT',
  eyebrow = 'Dlaczego my',
  title = (
    <>
      Twój komfort jest dla nas <em>priorytetem</em>
    </>
  ),
  paragraphs = DEFAULT_PARAGRAPHS,
  ctaLabel = 'Zobacz nasze usługi',
  ctaHref = '/uslugi',
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Content>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
          {paragraphs.map((text, i) => (
            <S.Paragraph key={i}>{text}</S.Paragraph>
          ))}
          <Button as="a" href={ctaHref} $variant="primary" $size="large">
            {ctaLabel}
          </Button>
        </S.Content>

        <S.ImageSide>
          <img src={imageSrc} alt={imageAlt} />
        </S.ImageSide>
      </S.Container>
    </S.Section>
  )
}
