import React from 'react'

import * as S from './Hero2.style'

const DEFAULT_BG =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa68381f9267864f2a9.png'

type Hero2Props = {
  id?: string
  backgroundImage?: string
  title?: React.ReactNode
  description?: string
}

export const Hero2: React.FC<Hero2Props> = ({
  id = 'home',
  backgroundImage = DEFAULT_BG,
  title = (
    <>
      Fryzjer & Kosmetyczka w Białymstoku
      <br />
      Salon EFEKT
    </>
  ),
  description = 'Test',
}) => {
  return (
    <S.HeroSection id={id} $bgImage={backgroundImage}>
      <S.HeroBg />
      <S.HeroContainer>
        <S.HeroTitle>{title}</S.HeroTitle>
        {description && <S.HeroDescription>{description}</S.HeroDescription>}
      </S.HeroContainer>
    </S.HeroSection>
  )
}
