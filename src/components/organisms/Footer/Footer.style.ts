import { rem, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { Container } from 'components/atoms/Container'
import { Icon } from 'components/atoms/Icon'
import { Image } from 'components/atoms/Image'
import { Link } from 'components/atoms/Link'

import media from 'styles/media'

import patternSun from 'assets/images/background/pattern-sun-flat.png'

export const Wrapper = styled.footer`
  color: ${({ theme }) => theme.colors.cream};

  background-image:
    linear-gradient(
      ${({ theme }) => rgba(theme.colors.espresso, 0.92)},
      ${({ theme }) => rgba(theme.colors.espresso, 0.92)}
    ),
    url(${patternSun});
  background-size:
    auto,
    480px auto;
  background-repeat: repeat, repeat;
`

export const InnerWrapper = styled(Container)`
  padding-top: ${rem(72)};
  padding-bottom: ${rem(40)};
`

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(48)};

  ${media.md.min} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg.min} {
    grid-template-columns: 1.6fr 1fr 1.2fr 1fr;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const BrandLogo = styled(Image)`
  margin-bottom: ${rem(18)};
`

export const ColumnTitle = styled.div`
  margin-bottom: ${rem(18)};
  letter-spacing: ${rem(2)};
`

export const Blurb = styled.div`
  max-width: 34ch;
  margin-top: ${rem(18)};
  margin-bottom: ${rem(14)};
`

export const FooterLink = styled(Link)<{ $emphasis?: boolean }>`
  display: block;
  padding: ${rem(6)} 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.cream};
  opacity: ${({ $emphasis }) => ($emphasis ? 1 : 0.85)};
  transition:
    color 0.2s ease,
    opacity 0.2s ease;

  ${media.hoverMixin(css`
    opacity: 1;
    color: ${({ theme }) => theme.colors.orange};
  `)}
`

export const LocationLinkContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${rem(4)};
`

export const LocationPinIcon = styled(Icon)`
  filter: brightness(0) invert(1);
`

export const AddressText = styled.div`
  padding: ${rem(6)} 0;
  opacity: 0.85;
`

export const SocialRow = styled.div`
  display: flex;
  gap: ${rem(10)};
  margin-top: ${rem(14)};
`

export const SocialLink = styled(Link)`
  display: flex;
  opacity: 0.85;
  transition: opacity 0.2s ease;

  ${media.hoverMixin(css`
    opacity: 1;
  `)}
`

export const BottomBar = styled.div`
  margin-top: ${rem(56)};
  padding-top: ${rem(24)};
  border-top: 1px solid ${({ theme }) => theme.colors.cream33};

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${rem(12)};

  color: ${({ theme }) => theme.colors.creamA8};
`
