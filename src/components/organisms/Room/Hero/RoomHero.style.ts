import { rem } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const HeroWrapper = styled.section`
  padding: ${rem(56)} 0;
`

export const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: ${rem(20)};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ink500};
`

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};
  align-items: center;

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
`

export const HeroDescription = styled.div`
  max-width: 46ch;
`

export const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(14)};
`

export const HeroPhoto = styled.div`
  aspect-ratio: 4 / 3;
`

export const HeroPhotoButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  background: none;
`

export const LightboxPhoto = styled.div`
  aspect-ratio: 4 / 3;
  width: min(90vw, calc(85vh * 4 / 3));
  max-width: 90vw;
  max-height: 85vh;
`
