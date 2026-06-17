import React from 'react'

import * as S from './Services1.style'

type Service = {
  href: string
  imageSrc: string
  imageAlt: string
  title: string
  description?: string
}

type Services1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  services?: Service[]
}

const DEFAULT_SERVICES: Service[] = [
  {
    href: '/uslugi/fryzjerstwo',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee31b0e5e2bb7fd5526e.jpg',
    imageAlt: 'Strzyżenie damskie',
    title: 'Strzyżenie damskie',
    description:
      'Precyzyjne strzyżenie dopasowane do kształtu twarzy i typu włosów — krótkie, półdługie i długie.',
  },
  {
    href: '/uslugi/fryzjerstwo',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee042db6a3cb826362a7.jpg',
    imageAlt: 'Strzyżenie męskie',
    title: 'Strzyżenie męskie',
    description:
      'Schludne i szybkie strzyżenie, w tym maszynką — zawsze z dbałością o każdy szczegół.',
  },
  {
    href: '/uslugi/farbowanie',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ed2a5df4011c24e6c4d4.jpg',
    imageAlt: 'Farbowanie i koloryzacja',
    title: 'Farbowanie i koloryzacja',
    description:
      'Koloryzacja na jeden kolor, farbowanie odrostów, pasemka i tonowanie — szeroka gama odcieni.',
  },
  {
    href: '/uslugi/fryzjerstwo',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4c.jpg',
    imageAlt: 'Stylizacja włosów',
    title: 'Stylizacja włosów',
    description:
      'Modelowanie i loki na każdą okazję, od codziennych stylizacji po wyjątkowe kreacje.',
  },
  {
    href: '/uslugi/manicure',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4d.jpg',
    imageAlt: 'Manicure',
    title: 'Manicure',
    description: 'Manicure klasyczny, hybrydowy, żelowy i męski.',
  },
  {
    href: '/uslugi/pedicure',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7da11eeea68cb82ca.jpg',
    imageAlt: 'Pedicure',
    title: 'Pedicure',
    description:
      'Pedicure klasyczny i hybrydowy, z pełnym opracowaniem stóp lub bez.',
  },
  {
    href: '/uslugi/brwi-depilacja',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7bde8da11eeea68e4adb2.png',
    imageAlt: 'Brwi i depilacja',
    title: 'Brwi i depilacja',
    description: 'Regulacja i farbowanie brwi henną oraz depilacja wąsika.',
  },
  {
    href: '/uslugi/podologia',
    imageSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69ea28bbe25664983647e10e.jpg',
    imageAlt: 'Podologia',
    title: 'Podologia',
    description:
      'Profesjonalna pielęgnacja i leczenie stóp w naszym salonie.',
  },
]

export const Services1: React.FC<Services1Props> = ({
  id = 'services',
  eyebrow = 'Nasze Usługi',
  title = (
    <>
      To, co robimy <em>najlepiej</em>
    </>
  ),
  services = DEFAULT_SERVICES,
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Header>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
        </S.Header>

        <S.Grid>
          {services.map(({ href, imageSrc, imageAlt, title: serviceTitle, description }, index) => (
            <S.ServiceItem
              key={href + serviceTitle}
              href={href}
              $delay={0.1 * (index + 1)}
            >
              <S.ImageWrapper>
                <img src={imageSrc} alt={imageAlt} />
              </S.ImageWrapper>
              <S.ServiceTitle>{serviceTitle}</S.ServiceTitle>
              {description && (
                <S.ServiceDescription>{description}</S.ServiceDescription>
              )}
            </S.ServiceItem>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  )
}
