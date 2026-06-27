import { rem, rgba } from 'polished'
import { NavTheme } from 'store'
import styled, { css } from 'styled-components'

import { Container } from 'components/atoms/Container'
import { Link } from 'components/atoms/Link'

import { NOTIFICATION_BAR_HEIGHT } from 'components/organisms/NotificationBar/NotificationBar.style'

import media from 'styles/media'
import { Theme } from 'styles/theme'

export const HEADER_HEIGHT = 88

// Single source of truth for the nav's accent color — switches to the
// Soleil Collective sub-brand's rose tone while that page is mounted
// (see navThemeAtom), default everywhere else.
export const getNavAccent = (theme: Theme, navTheme: NavTheme) =>
  navTheme === 'collective' ? theme.colors.rose600 : theme.colors.primary100

export const Wrapper = styled.header<{
  $scrolled: boolean
  $navTheme: NavTheme
  $notificationBarVisible: boolean
}>`
  position: fixed;
  top: ${({ $notificationBarVisible }) =>
    rem($notificationBarVisible ? NOTIFICATION_BAR_HEIGHT : 0)};
  left: 0;
  right: 0;
  z-index: 50;

  padding: ${rem(16)} 0;

  background-color: ${({ theme, $navTheme }) =>
    $navTheme === 'collective' ? theme.colors.rose050 : theme.colors.sand};
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    padding 0.3s ease;

  ${({ theme, $scrolled }) =>
    $scrolled &&
    css`
      padding: ${rem(16)} 0;
      border-bottom: 1px solid ${theme.colors.ink800};
    `}
`

export const InnerWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;

  ${media.md.min} {
    display: grid;
    align-items: center;
    gap: ${rem(16)};

    grid-template-columns: 1fr auto 1fr;
  }
`

export const Side = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  gap: ${rem(32)};
  justify-content: ${({ $align }) =>
    $align === 'left' ? 'flex-start' : 'flex-end'};

  ${({ $align }) =>
    $align === 'right' &&
    css`
      display: none;

      ${media.md.min} {
        display: flex;
      }
    `}
`

export const LogoWrapper = styled(Link)`
  display: flex;
  justify-content: flex-end;

  width: 48px;
  height: 48px;

  ${media.md.min} {
    justify-content: center;

    width: 64px;
    height: 64px;
  }
`

export const DesktopLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${rem(32)};
`

export const NavLink = styled(Link)<{ $navTheme: NavTheme }>`
  text-decoration: none;
  letter-spacing: ${rem(1.5)};
  color: ${({ theme }) => theme.colors.black};
  transition: color 0.2s ease;

  &.active {
    color: ${({ theme, $navTheme }) => getNavAccent(theme, $navTheme)};
  }

  ${({ theme, $navTheme }) =>
    media.hoverMixin(css`
      color: ${getNavAccent(theme, $navTheme)};
    `)}
`

export const NavDropdownWrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: ${rem(12)};
  }
`

export const NavDropdownTriggerRow = styled.div<{
  $open: boolean
  $navTheme: NavTheme
}>`
  display: flex;
  align-items: center;
  gap: ${rem(4)};

  letter-spacing: ${rem(1.5)};
  color: ${({ theme }) => theme.colors.black};

  ${({ $open, $navTheme, theme }) =>
    $open &&
    css`
      color: ${getNavAccent(theme, $navTheme)};
    `}
`

export const NavDropdownLabel = styled(Link)<{ $navTheme: NavTheme }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;

  ${({ theme, $navTheme }) =>
    media.hoverMixin(css`
      color: ${getNavAccent(theme, $navTheme)};
    `)}
`

export const NavDropdownToggle = styled.button<{ $navTheme: NavTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  padding: ${rem(4)};
  cursor: pointer;
  color: inherit;
  transition: color 0.2s ease;

  ${({ theme, $navTheme }) =>
    media.hoverMixin(css`
      color: ${getNavAccent(theme, $navTheme)};
    `)}
`

export const NavDropdownChevron = styled.span<{ $open: boolean }>`
  display: flex;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.2s ease;
`

export const NavDropdownPanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: ${rem(12)};
  min-width: ${rem(180)};

  display: flex;
  flex-direction: column;
  padding: ${rem(8)} 0;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  box-shadow: ${({ theme }) =>
    `0 ${rem(12)} ${rem(24)} ${rgba(theme.colors.black, 0.08)}`};

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: translateY(${({ $open }) => ($open ? '0' : '-6px')});
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
`

export const NavDropdownLink = styled(Link)<{ $navTheme: NavTheme }>`
  text-decoration: none;
  padding: ${rem(10)} ${rem(16)};
  color: ${({ theme }) => theme.colors.black};

  &.active {
    color: ${({ theme, $navTheme }) => getNavAccent(theme, $navTheme)};
  }

  ${({ theme, $navTheme }) =>
    media.hoverMixin(css`
      color: ${getNavAccent(theme, $navTheme)};
      background-color: ${theme.colors.gray00};
    `)}
`

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`

export const MobileMenu = styled.div<{
  $open: boolean
  $navTheme: NavTheme
  $notificationBarVisible: boolean
}>`
  position: fixed;
  inset: 0;
  z-index: 40;

  display: flex;
  flex-direction: column;
  gap: ${rem(24)};

  padding: ${({ $notificationBarVisible }) =>
      rem(
        HEADER_HEIGHT +
          ($notificationBarVisible ? NOTIFICATION_BAR_HEIGHT : 0) +
          24
      )}
    ${rem(24)} ${rem(24)};
  background-color: ${({ theme, $navTheme }) =>
    $navTheme === 'collective' ? theme.colors.rose050 : theme.colors.sand};

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: translateY(${({ $open }) => ($open ? '0' : '-12px')});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s ease;
`

export const MobileNavLink = styled(Link)<{ $navTheme: NavTheme }>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  &.active {
    color: ${({ theme, $navTheme }) => getNavAccent(theme, $navTheme)};
  }
`
