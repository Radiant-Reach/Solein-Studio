import { graphql, useStaticQuery } from 'gatsby'
import { useAtom } from 'jotai'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { mobileMenuOpenAtom, scrollLockAtom } from 'store'

import { Button } from 'components/atoms/Button'
import { Hidden } from 'components/atoms/Hidden'
import { Icon } from 'components/atoms/Icon'
import { Image } from 'components/atoms/Image'
import { Link } from 'components/atoms/Link'
import { BodySmall, H400, Text } from 'components/atoms/Typography'

import { useOutsideClick } from 'hooks/useOutsideClick'
import { useScrollPosition } from 'hooks/useScroll'
import { useScrollLock } from 'hooks/useScrollLock'

import slugify from 'utils/slugify'

import { NavDropdownItem, NavEntry, NavLinkItem } from 'types/domain'

import { ReactComponent as ChevronDown } from 'assets/icons/arrows/chevron-down.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg'

import {
  CENNIK_LINK,
  GALERIA_LINK,
  LOGO_MARK_SRC,
  RESERVATION_LINK,
  RIGHT_LINKS,
  ROOMS_DROPDOWN_ID,
  ROOMS_DROPDOWN_NAME,
  ROOMS_DROPDOWN_PATH,
} from './Navigation.constants'
import {
  DesktopLinks,
  InnerWrapper,
  LogoWrapper,
  MobileMenu,
  MobileNavLink,
  NavDropdownChevron,
  NavDropdownLabel,
  NavDropdownLink,
  NavDropdownPanel,
  NavDropdownToggle,
  NavDropdownTriggerRow,
  NavDropdownWrapper,
  NavLink,
  Side,
  ToggleButton,
  Wrapper,
} from './Navigation.style'

const SCROLL_THRESHOLD = 50

const isDropdownEntry = (entry: NavEntry): entry is NavDropdownItem =>
  'children' in entry

const NavDropdown: React.FC<{ entry: NavDropdownItem }> = ({ entry }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useOutsideClick({ ref, handler: setOpen, condition: open })

  return (
    <NavDropdownWrapper
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavDropdownTriggerRow $open={open}>
        <NavDropdownLabel to={entry.path}>
          <Text
            as="span"
            $base={BodySmall}
            $transform="uppercase"
            $color="inherit"
            dangerouslySetInnerHTML={{ __html: entry.name }}
          />
        </NavDropdownLabel>

        <NavDropdownToggle
          type="button"
          aria-label={open ? 'Zwiń listę sal' : 'Rozwiń listę sal'}
          onClick={() => setOpen((prev) => !prev)}
        >
          <NavDropdownChevron $open={open}>
            <Icon src={ChevronDown} size={10} />
          </NavDropdownChevron>
        </NavDropdownToggle>
      </NavDropdownTriggerRow>

      <NavDropdownPanel $open={open}>
        {entry.children.map((child) => (
          <NavDropdownLink
            key={child.id}
            to={child.path}
            activeClassName="active"
            onClick={() => setOpen(false)}
          >
            <Text
              as="span"
              $base={BodySmall}
              $color="inherit"
              dangerouslySetInnerHTML={{ __html: child.name }}
            />
          </NavDropdownLink>
        ))}
      </NavDropdownPanel>
    </NavDropdownWrapper>
  )
}

const DesktopLinkList: React.FC<{ links: NavEntry[] }> = ({ links }) => (
  <DesktopLinks>
    {links.map((entry) =>
      isDropdownEntry(entry) ? (
        <NavDropdown key={entry.id} entry={entry} />
      ) : (
        <NavLink key={entry.id} to={entry.path} activeClassName="active">
          <Text
            as="span"
            $base={BodySmall}
            $transform="uppercase"
            $color="inherit"
            dangerouslySetInnerHTML={{ __html: entry.name }}
          />
        </NavLink>
      )
    )}
  </DesktopLinks>
)

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom)
  const [, setScrollLock] = useAtom(scrollLockAtom)
  const { y } = useScrollPosition(50)
  const isScrolled = y > SCROLL_THRESHOLD

  useScrollLock()

  useEffect(() => {
    setScrollLock(mobileMenuOpen)
  }, [mobileMenuOpen, setScrollLock])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const cmsData = useStaticQuery<Queries.NavigationRoomsQuery>(graphql`
    query NavigationRooms {
      rooms: allWpSala(sort: { title: ASC }) {
        nodes {
          slug
          title
        }
      }
    }
  `)

  const roomLinks: NavLinkItem[] = useMemo(
    () =>
      cmsData.rooms?.nodes?.map((room) => ({
        id: room.slug!,
        name: room.title!,
        path: `/nasze-sale/${room.slug}`,
      }))! || [],
    [cmsData]
  )

  const roomsDropdown: NavDropdownItem = useMemo(
    () => ({
      id: ROOMS_DROPDOWN_ID,
      name: ROOMS_DROPDOWN_NAME,
      path: ROOMS_DROPDOWN_PATH,
      children: roomLinks,
    }),
    [roomLinks]
  )

  const leftLinks: NavEntry[] = [roomsDropdown, CENNIK_LINK, GALERIA_LINK]

  const mobileLinks: NavLinkItem[] = [
    { id: slugify('Home'), name: 'Home', path: '/' },
    {
      id: slugify('Nasze sale mobile'),
      name: 'Nasze sale',
      path: ROOMS_DROPDOWN_PATH,
    },
    ...roomLinks,
    CENNIK_LINK,
    GALERIA_LINK,
    ...RIGHT_LINKS,
  ]

  return (
    <>
      <Wrapper $scrolled={isScrolled}>
        <InnerWrapper $variant="wide">
          <Side $align="left">
            <Hidden $base="visible" $md="hidden">
              <ToggleButton
                type="button"
                aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon
                  src={mobileMenuOpen ? CloseIcon : MenuIcon}
                  size={24}
                  fill="var(--color-black)"
                />
              </ToggleButton>
            </Hidden>

            <Hidden $base="hidden" $md="visible">
              <DesktopLinkList links={leftLinks} />
            </Hidden>
          </Side>

          <LogoWrapper to="/" ignoreLanguage>
            <Image
              src={LOGO_MARK_SRC}
              alt="Soleil Studio"
              objectFit="contain"
              loading="eager"
            />
          </LogoWrapper>

          <Side $align="right">
            <Hidden $base="hidden" $md="visible">
              <DesktopLinkList links={RIGHT_LINKS} />
            </Hidden>

            <Hidden $base="hidden" $md="visible">
              <Button
                as={Link}
                to={RESERVATION_LINK.path}
                $variant="primary"
                $size="medium"
                dangerouslySetInnerHTML={{ __html: RESERVATION_LINK.name }}
              />
            </Hidden>
          </Side>
        </InnerWrapper>
      </Wrapper>

      <MobileMenu $open={mobileMenuOpen}>
        {mobileLinks.map((link) => (
          <MobileNavLink
            key={link.id}
            to={link.path}
            activeClassName="active"
            onClick={closeMobileMenu}
          >
            <Text
              as="span"
              $base={H400}
              $color="inherit"
              dangerouslySetInnerHTML={{ __html: link.name }}
            />
          </MobileNavLink>
        ))}

        <Button
          as={Link}
          to={RESERVATION_LINK.path}
          $variant="primary"
          $size="medium"
          $fullWidth
          onClick={closeMobileMenu}
          dangerouslySetInnerHTML={{ __html: RESERVATION_LINK.name }}
        />
      </MobileMenu>
    </>
  )
}
