import { rem, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(64)};

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(40)};
`

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(20)};

  ${media.sm.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FullWidthField = styled.div`
  ${media.sm.min} {
    grid-column: 1 / -1;
  }
`

export const SuccessPanel = styled.div`
  margin-top: ${rem(40)};
  padding: ${rem(40)};
  text-align: center;

  background-color: ${({ theme }) => theme.colors.cream100};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
`

export const SuccessIcon = styled.img`
  width: ${rem(48)};
  margin-bottom: ${rem(12)};
`

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(24)};
`

export const PhotoTeaser = styled.div`
  aspect-ratio: 16 / 10;
`

export const InfoCard = styled.div`
  padding: ${rem(32)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(8)} ${rem(24)}
    ${({ theme }) => rgba(theme.colors.espresso, 0.06)};
`

export const InfoEyebrow = styled.div`
  margin-bottom: ${rem(16)};
`

export const AmenityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(14)};
`

export const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(6)};

  margin-top: ${rem(22)};
  padding-top: ${rem(20)};
  border-top: 1px solid ${({ theme }) => theme.colors.espresso1F};
`

export const ContactLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.terracotta};

  ${media.hoverMixin(css`
    color: ${({ theme }) => theme.colors.terracotta600};
  `)}
`
