import React, { useEffect, useState } from 'react'

import * as S from './Nav1.style'

const DEFAULT_LOGO =
  'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69a883dd4dd4285a13998586.png'

type DropdownItem = {
  label: string
  href: string
}

type NavLink = {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

type Nav1Props = {
  logoSrc?: string
  logoAlt?: string
  logoHref?: string
  links?: NavLink[]
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'O nas', href: '/o-nas' },
  {
    label: 'Usługi',
    href: '/uslugi',
    dropdown: [
      { label: 'Usługa 1', href: '/uslugi/usluga-1' },
      { label: 'Usługa 2', href: '/uslugi/usluga-2' },
      { label: 'Usługa 3', href: '/uslugi/usluga-3' },
      { label: 'Usługa 4', href: '/uslugi/usluga-4' },
      { label: 'Usługa 5', href: '/uslugi/usluga-5' },
      { label: 'Usługa 6', href: '/uslugi/usluga-6' },
      { label: 'Usługa 7', href: '/uslugi/usluga-7' },
      { label: 'Usługa 8', href: '/uslugi/usluga-8' },
    ],
  },
  { label: 'Cennik', href: '/cennik' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontakt', href: '/kontakt' },
]

export const Nav1: React.FC<Nav1Props> = ({
  logoSrc = DEFAULT_LOGO,
  logoAlt = 'Logo',
  logoHref = '/',
  links = DEFAULT_LINKS,
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

  return (
    <>
      <S.NavMobile $open={mobileOpen}>
        <S.NavMobileClose onClick={() => setMobileOpen(false)}>
          ✕
        </S.NavMobileClose>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </a>
        ))}
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
                          <S.NavDdName>{item.label}</S.NavDdName>
                          <S.NavDdArrow>→</S.NavDdArrow>
                        </S.NavDdItem>
                      ))}
                    </S.NavDropdownInner>
                  </S.NavDropdown>
                )}
              </S.NavItem>
            ))}
          </S.NavLinks>

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
