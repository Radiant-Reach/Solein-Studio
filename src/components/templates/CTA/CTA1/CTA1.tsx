import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './CTA1.style'

const DEFAULT_IMAGE =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69adddb8e041da4849a19a8b.png'

type CTA1Props = {
  id?: string
  backgroundImage?: string
  imageSrc?: string
  imageAlt?: string
  eyebrow?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export const CTA1: React.FC<CTA1Props> = ({
  id,
  backgroundImage,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = '',
  eyebrow = 'Get the sale right now!',
  title = 'Up to 50% OFF For 1+ courses',
  description = "Kogi VHS freegan bicycle rights try-hard green juice probably haven't heard of them cliche la croix af chillwave.",
  ctaLabel = 'View Courses',
  ctaHref = '/contact-us',
}) => {
  return (
    <S.Section id={id} $bgImage={backgroundImage}>
      <S.Container>
        <S.ImageSide>
          <img src={imageSrc} alt={imageAlt} />
        </S.ImageSide>

        <S.Content>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
          <Button as="a" href={ctaHref} $variant="primary" $size="large">
            {ctaLabel}
          </Button>
        </S.Content>
      </S.Container>
    </S.Section>
  )
}
