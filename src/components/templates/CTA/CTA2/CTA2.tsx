import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './CTA2.style'

type CTA2Props = {
  id?: string
  backgroundImage?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export const CTA2: React.FC<CTA2Props> = ({
  id,
  backgroundImage,
  title = 'Up to 50% OFF For 1+ courses',
  description = 'Kogi VHS freegan bicycle rights try-hard green juice probably haven’t heard of them cliche la croix af chillwave.',
  ctaLabel = 'View Courses',
  ctaHref = '/contact-us',
}) => {
  return (
    <S.Section id={id} $bgImage={backgroundImage}>
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <Button as="a" href={ctaHref} $variant="primary" $size="large">
          {ctaLabel}
        </Button>
      </S.Container>
    </S.Section>
  )
}
