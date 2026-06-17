import React from 'react'

import * as S from './About2.style'

const DEFAULT_IMAGE =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa68381f9267864f2ac.png'

type FeatureCard = {
  iconSrc: string
  iconAlt: string
  title: string
  description: string
}

type About2Props = {
  id?: string
  imageSrc?: string
  imageAlt?: string
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  cards?: FeatureCard[]
}

const DEFAULT_DESCRIPTION = (
  <>
    Salon fryzjersko-kosmetyczny EFEKT to nowoczesne miejsce w sercu
    Białegostoku, gdzie wysoka jakość idzie w parze z wygodą i szybką obsługą.
    Możesz przyjść bez zapisu i poczekać w kolejce, albo umówić wizytę online z
    wyprzedzeniem — jak Ci wygodniej.
    <br />
    <br />
    Oferujemy profesjonalne strzyżenia damskie i męskie, koloryzację włosów,
    manicure, pedicure i wiele więcej. Naszym celem jest, aby każda wizyta była
    szybka, komfortowa i zakończona efektem, który naprawdę cieszy.
  </>
)

const DEFAULT_CARDS: FeatureCard[] = [
  {
    iconSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69ecf22005d4199001849c44.svg',
    iconAlt: 'Szybka obsługa',
    title: 'Szybka obsługa',
    description:
      'Cenimy Twój czas. Sprawna obsługa bez zbędnego czekania. Umów wizytę online lub przyjdź bez zapisu.',
  },
  {
    iconSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69ecf630b0e5e2bb7fb1f80f.svg',
    iconAlt: 'Jakość & Profesjonalizm',
    title: 'Jakość & Profesjonalizm',
    description:
      'Doświadczone specjalistki, precyzja w każdym detalu i dbałość o efekt końcowy — to nasza wizytówka.',
  },
]

export const About2: React.FC<About2Props> = ({
  id,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Salon fryzjersko-kosmetyczny EFEKT',
  eyebrow = 'O nas',
  title = (
    <>
      Poznaj nas <em>bliżej</em>
    </>
  ),
  description = DEFAULT_DESCRIPTION,
  cards = DEFAULT_CARDS,
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Left>
          <S.LeftImage src={imageSrc} alt={imageAlt} />
        </S.Left>

        <S.Right>
          <S.Header>
            <S.Eyebrow>{eyebrow}</S.Eyebrow>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Header>

          <S.CardsGrid>
            {cards.map(({ iconSrc, iconAlt, title: cardTitle, description: cardDesc }) => (
              <S.Card key={cardTitle}>
                <S.CardIcon>
                  <img src={iconSrc} alt={iconAlt} />
                </S.CardIcon>
                <S.CardTitle>{cardTitle}</S.CardTitle>
                <S.CardText>{cardDesc}</S.CardText>
              </S.Card>
            ))}
          </S.CardsGrid>
        </S.Right>
      </S.Container>
    </S.Section>
  )
}
