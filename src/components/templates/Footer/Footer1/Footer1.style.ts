import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

const MUTED = '#828282'
const DARK_BG = '#111112'
const DIVIDER = 'rgba(255,255,255,0.1)'
const DIVIDER_FAINT = 'rgba(255,255,255,0.06)'
const BOTTOM_DIVIDER = 'rgba(255,255,255,0.08)'
const SOCIAL_BG = 'rgba(255,255,255,0.06)'

export const FooterEl = styled.footer`
  background: ${DARK_BG};
  padding: ${rem(80)} ${rem(30)} 0;
  border-top: 1px solid ${DIVIDER};
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${rem(40)};
  padding-bottom: ${rem(60)};

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

export const Col = styled.div``

export const ColHeading = styled.h2`
  color: #fff;
  font-size: ${rem(14)};
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding-bottom: ${rem(16)};
  margin-bottom: ${rem(20)};
  border-bottom: 1px solid ${DIVIDER};
`

export const ColText = styled.p`
  color: ${MUTED};
  font-size: ${rem(14)};
  line-height: 1.8;
  letter-spacing: 0.05em;
`

export const LinksList = styled.ul<{ $grid?: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;

  ${({ $grid }) =>
    $grid &&
    `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    `}

  li {
    margin-bottom: ${({ $grid }) => ($grid ? 0 : rem(10))};
  }

  a {
    color: ${MUTED};
    font-size: ${rem(14)};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary20};
    }
  }
`

export const SocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${rem(20)} 0 0;
  display: flex;
  gap: ${rem(10)};

  @media (max-width: 600px) {
    justify-content: center;
  }
`

export const SocialItem = styled.li`
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${rem(38)};
    height: ${rem(38)};
    border-radius: 50%;
    background: ${SOCIAL_BG};
    text-decoration: none;
    transition: background 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.primary50};
    }

    img {
      width: ${rem(18)};
      height: ${rem(18)};
      display: block;
    }
  }
`

export const HoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const HoursItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: ${rem(16)};
  padding: ${rem(8)} 0;
  border-bottom: 1px solid ${DIVIDER_FAINT};
  font-size: ${rem(13)};

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: ${MUTED};
  }

  span:last-child {
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    justify-content: center;
    gap: ${rem(24)};
  }
`

export const BottomBar = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  padding: ${rem(20)} 0;
  border-top: 1px solid ${BOTTOM_DIVIDER};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${rem(16)};

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: ${rem(8)};
  }
`

export const BottomText = styled.p`
  color: #555;
  font-size: ${rem(13)};
  margin: 0;
  letter-spacing: 0.03em;

  a {
    color: ${({ theme }) => theme.colors.primary20};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary50};
    }
  }
`
