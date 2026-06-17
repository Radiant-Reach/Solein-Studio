import React from 'react'

import * as S from './Footer1.style'

type FooterLink = {
  label: string
  href: string
}

type SocialLink = {
  href: string
  iconSrc: string
  iconAlt: string
  ariaLabel: string
}

type OpeningHour = {
  day: string
  hours: string
}

type Footer1Props = {
  servicesHeading?: string
  serviceLinks?: FooterLink[]
  locationsHeading?: string
  locationLinks?: FooterLink[]
  salonHeading?: string
  address?: React.ReactNode
  socialLinks?: SocialLink[]
  hoursHeading?: string
  openingHours?: OpeningHour[]
  companyName?: string
  creditLabel?: string
  creditHref?: string
}

const DEFAULT_SERVICE_LINKS: FooterLink[] = [
  { label: 'Fryzjerstwo', href: '/uslugi/fryzjerstwo' },
  { label: 'Farbowanie', href: '/uslugi/farbowanie' },
  { label: 'Manicure', href: '/uslugi/manicure' },
  { label: 'Pedicure', href: '/uslugi/pedicure' },
  { label: 'Brwi & Depilacja', href: '/uslugi/brwi-depilacja' },
  { label: 'Podologia', href: '/uslugi/podologia' },
]

const DEFAULT_LOCATION_LINKS: FooterLink[] = [
  { label: 'Białystok', href: '/bialystok' },
]

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    href: '#',
    iconSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7dc59a691ce6ea0a522d7.svg',
    iconAlt: 'Facebook',
    ariaLabel: 'Facebook',
  },
  {
    href: '#',
    iconSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7dc5903c24196d24ab6f0.svg',
    iconAlt: 'Instagram',
    ariaLabel: 'Instagram',
  },
  {
    href: '#',
    iconSrc:
      'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e7dc596fc69286f3b0197f.svg',
    iconAlt: 'TikTok',
    ariaLabel: 'TikTok',
  },
]

const DEFAULT_HOURS: OpeningHour[] = [
  { day: 'Poniedziałek', hours: '9:00 – 18:00' },
  { day: 'Wtorek', hours: '9:00 – 18:00' },
  { day: 'Środa', hours: '9:00 – 18:00' },
  { day: 'Czwartek', hours: '9:00 – 18:00' },
  { day: 'Piątek', hours: '9:00 – 18:00' },
  { day: 'Sobota', hours: '9:00 – 15:00' },
  { day: 'Niedziela', hours: 'Nieczynne' },
]

export const Footer1: React.FC<Footer1Props> = ({
  servicesHeading = 'Usługi',
  serviceLinks = DEFAULT_SERVICE_LINKS,
  locationsHeading = 'Lokalizacje',
  locationLinks = DEFAULT_LOCATION_LINKS,
  salonHeading = 'Nasze salony:',
  address,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  hoursHeading = 'Godziny otwarcia',
  openingHours = DEFAULT_HOURS,
  companyName = 'Salon EFEKT',
  creditLabel = 'Radiant Reach',
  creditHref = 'https://radiantreach.agency/',
}) => {
  const year = new Date().getFullYear()

  return (
    <S.FooterEl>
      <S.Container>
        <S.Col>
          <S.ColHeading>{servicesHeading}</S.ColHeading>
          <S.LinksList $grid>
            {serviceLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </S.LinksList>
        </S.Col>

        <S.Col>
          <S.ColHeading>{locationsHeading}</S.ColHeading>
          <S.LinksList>
            {locationLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </S.LinksList>
        </S.Col>

        <S.Col>
          <S.ColHeading>{salonHeading}</S.ColHeading>
          {address && <S.ColText>{address}</S.ColText>}
          <S.SocialList>
            {socialLinks.map(({ href, iconSrc, iconAlt, ariaLabel }) => (
              <S.SocialItem key={ariaLabel}>
                <a
                  href={href}
                  aria-label={ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={iconSrc} alt={iconAlt} />
                </a>
              </S.SocialItem>
            ))}
          </S.SocialList>
        </S.Col>

        <S.Col>
          <S.ColHeading>{hoursHeading}</S.ColHeading>
          <S.HoursList>
            {openingHours.map(({ day, hours }) => (
              <S.HoursItem key={day}>
                <span>{day}</span>
                <span>{hours}</span>
              </S.HoursItem>
            ))}
          </S.HoursList>
        </S.Col>
      </S.Container>

      <S.BottomBar>
        <S.BottomText>
          Copyright &copy; {year} {companyName}
        </S.BottomText>
        <S.BottomText>
          Strona stworzona przez:{' '}
          <a href={creditHref} target="_blank" rel="noopener noreferrer">
            {creditLabel}
          </a>
        </S.BottomText>
      </S.BottomBar>
    </S.FooterEl>
  )
}
