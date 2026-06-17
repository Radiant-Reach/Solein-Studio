import React, { useEffect, useState } from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './Nav2.style'

const DEFAULT_LOGO =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69ece679b0e5e2bb7fadbf27.svg'
const DEFAULT_PHONE_ICON =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69b49681fb38ca2a98a0add6.svg'

type DropdownItem = {
  label: string
  href: string
}

type NavLink = {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

type Nav2Props = {
  logoSrc?: string
  logoAlt?: string
  logoHref?: string
  links?: NavLink[]
  phoneHref?: string
  phoneLabel?: string
  phoneIconSrc?: string
  ctaLabel?: string
  ctaHref?: string
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'O nas', href: '/o-nas' },
  {
    label: 'Usługi',
    href: '/uslugi',
    dropdown: [
      { label: 'Fryzjerstwo', href: '/uslugi/fryzjerstwo' },
      { label: 'Farbowanie', href: '/uslugi/farbowanie' },
      { label: 'Manicure', href: '/uslugi/manicure' },
      { label: 'Pedicure', href: '/uslugi/pedicure' },
      { label: 'Brwi & Depilacja', href: '/uslugi/brwi-depilacja' },
      { label: 'Podologia', href: '/uslugi/podologia' },
    ],
  },
  { label: 'Cennik', href: '/cennik' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'FAQ', href: '/pytania' },
  { label: 'Kariera', href: '/kariera' },
]

export const Nav2: React.FC<Nav2Props> = ({
  logoSrc = DEFAULT_LOGO,
  logoAlt = 'Logo',
  logoHref = '/',
  links = DEFAULT_LINKS,
  phoneHref = 'tel:',
  phoneLabel = '',
  phoneIconSrc = DEFAULT_PHONE_ICON,
  ctaLabel = 'Umów wizytę',
  ctaHref = '/rezerwacja',
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <S.NavMobile $open={mobileOpen}>
        <S.NavMobileClose onClick={closeMenu}>✕</S.NavMobileClose>

        {links.map(link => (
          <S.NavMobileLink key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </S.NavMobileLink>
        ))}

        <S.NavMobileActions>
          <S.NavMobileActionBtn
            as="a"
            href={phoneHref}
            $variant="secondary"
            $size="medium"
            onClick={closeMenu}
          >
            <img src={phoneIconSrc} alt="" />
            {phoneLabel}
          </S.NavMobileActionBtn>
          <S.NavMobileActionBtn
            as="a"
            href={ctaHref}
            $variant="primary"
            $size="medium"
            onClick={closeMenu}
          >
            {ctaLabel}
          </S.NavMobileActionBtn>
        </S.NavMobileActions>
      </S.NavMobile>

      <S.NavBar $scrolled={scrolled}>
        <S.NavInner $scrolled={scrolled}>
          <S.NavLogo href={logoHref}>
            <img src={logoSrc} alt={logoAlt} />
          </S.NavLogo>

          <S.NavLinks>
            {links.map(link => (
              <S.NavItem key={link.href}>
                <S.NavItemLink href={link.href}>
                  {link.label}
                  {link.dropdown && <S.NavChevron>▼</S.NavChevron>}
                </S.NavItemLink>

                {link.dropdown && (
                  <S.NavDropdown>
                    <S.NavDropdownInner>
                      {link.dropdown.map(item => (
                        <S.NavDdItem key={item.href} href={item.href}>
                          <S.NavDdText>
                            <S.NavDdName>{item.label}</S.NavDdName>
                          </S.NavDdText>
                          <S.NavDdArrow>→</S.NavDdArrow>
                        </S.NavDdItem>
                      ))}
                    </S.NavDropdownInner>
                  </S.NavDropdown>
                )}
              </S.NavItem>
            ))}
          </S.NavLinks>

          <S.NavActions>
            <S.NavPhoneAction>
              <S.NavPhoneBtn
                as="a"
                href={phoneHref}
                $variant="secondary"
                $size="medium"
              >
                <img src={phoneIconSrc} alt="" />
                {phoneLabel}
              </S.NavPhoneBtn>
            </S.NavPhoneAction>
            <Button as="a" href={ctaHref} $variant="primary" $size="medium">
              {ctaLabel}
            </Button>
          </S.NavActions>

          <S.NavHamburger
            $open={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </S.NavHamburger>
        </S.NavInner>
      </S.NavBar>
    </>
  )
}
