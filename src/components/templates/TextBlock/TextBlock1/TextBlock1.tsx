import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './TextBlock1.style'

const DEFAULT_IMAGE =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7bc3c033b8ae4a4a689a4.png'

type TextBlock1Props = {
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
  'Wierzymy, że dobre strzyżenie to podstawa każdej stylizacji. Fryzjerka Hanna z wieloletnim doświadczeniem dopasuje fryzurę do kształtu Twojej twarzy, typu włosów i Twojego stylu życia.',
  'Każda wizyta to indywidualne podejście — słuchamy, doradzamy i dbamy o to, żebyś wyszła z fotela dokładnie tak jak sobie wymarzyłaś.',
]

export const TextBlock1: React.FC<TextBlock1Props> = ({
  id,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Fryzjerstwo — Salon EFEKT',
  eyebrow = 'Nasza misja',
  title = (
    <>
      Dbamy o Twoje <em>włosy</em>
    </>
  ),
  paragraphs = DEFAULT_PARAGRAPHS,
  ctaLabel = 'Dowiedz się więcej',
  ctaHref = '/o-nas',
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.ImageSide>
          <img src={imageSrc} alt={imageAlt} />
        </S.ImageSide>

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
      </S.Container>
    </S.Section>
  )
}
