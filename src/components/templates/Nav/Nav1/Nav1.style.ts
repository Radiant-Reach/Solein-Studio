import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export const NavMobile = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.gray00};
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${rem(32)};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity 0.4s, visibility 0.4s;

  a {
    font-size: ${rem(34)};
    font-weight: 300;
    color: ${({ theme }) => theme.colors.gray80};
    text-decoration: none;
    letter-spacing: 0.06em;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary50};
    }
  }
`

export const NavMobileClose = styled.button`
  position: absolute;
  top: ${rem(24)};
  right: ${rem(24)};
  background: none;
  border: none;
  font-size: ${rem(20)};
  color: ${({ theme }) => theme.colors.gray60};
  cursor: pointer;
  padding: ${rem(8)};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const NavChevron = styled.span`
  font-size: ${rem(7)};
  line-height: 1;
  transition: transform 0.3s;
  margin-top: 1px;
`

export const NavDropdownInner = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.gray10};
    border-top: 1px solid ${({ theme }) => theme.colors.gray10};
    transform: translateX(-50%) rotate(45deg);
  }
`

export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: ${rem(16)};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
  z-index: 200;
  min-width: ${rem(240)};
`

export const NavDdArrow = styled.span`
  font-size: ${rem(11)};
  color: ${({ theme }) => theme.colors.primary50};
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
`

export const NavDdName = styled.span`
  font-size: ${rem(11)};
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray80};
  display: block;
  transition: color 0.2s;
`

export const NavDdItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(14)};
  padding: ${rem(13)} ${rem(20)};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};
  transition: background 0.2s, color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gray05};
    color: ${({ theme }) => theme.colors.primary50};

    ${NavDdName} {
      color: ${({ theme }) => theme.colors.primary50};
    }

    ${NavDdArrow} {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

export const NavItem = styled.li`
  position: relative;

  &:hover ${NavDropdown} {
    opacity: 1;
    pointer-events: all;
  }

  &:hover ${NavChevron} {
    transform: rotate(180deg);
  }
`

export const NavItemLink = styled.a`
  font-size: ${rem(11)};
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray80};
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${rem(5)};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary50};
    transition: width 0.35s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

export const NavLinks = styled.ul`
  display: flex;
  gap: ${rem(36)};
  list-style: none;
  align-items: center;

  @media (max-width: 1000px) {
    gap: ${rem(24)};
  }

  ${media.md.max} {
    display: none;
  }
`

export const NavLogo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: ${rem(36)};
    width: auto;
    display: block;
  }
`

export const NavHamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  gap: ${rem(5)};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${rem(4)};

  span {
    display: block;
    width: ${rem(22)};
    height: 1.5px;
    background: ${({ theme }) => theme.colors.gray80};
    transition: transform 0.3s, opacity 0.3s;
  }

  ${({ $open }) =>
    $open &&
    css`
      span:nth-child(1) {
        transform: translateY(6.5px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-6.5px) rotate(-45deg);
      }
    `}

  ${media.md.max} {
    display: flex;
  }
`

export const NavInner = styled.div<{ $scrolled: boolean }>`
  width: 100%;
  max-width: ${rem(1320)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $scrolled }) =>
    $scrolled ? `${rem(14)} ${rem(60)}` : `${rem(22)} ${rem(60)}`};
  transition: padding 0.4s;

  ${media.md.max} {
    padding: ${({ $scrolled }) =>
      $scrolled ? `${rem(12)} ${rem(20)}` : `${rem(16)} ${rem(20)}`};
  }
`

export const NavBar = styled.nav<{ $scrolled: boolean }>`
  width: 100%;
  height: ${rem(94)};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  transition: box-shadow 0.4s;

  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      backdrop-filter: blur(14px);
      box-shadow: 0 1px 0 ${theme.colors.gray10};
    `}

  ${media.md.max} {
    height: ${rem(68)};
  }
`
