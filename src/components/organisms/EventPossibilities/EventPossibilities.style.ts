import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeadingWrapper = styled.div`
  max-width: 70ch;
  margin-bottom: ${rem(40)};
`

export const PhotoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${rem(16)};
  margin-bottom: ${rem(56)};

  ${media.sm.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const PhotoTile = styled.div`
  height: ${rem(220)};
`

export const PossibilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${rem(32)};
  margin-bottom: ${rem(56)};

  ${media.sm.min} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const PossibilityCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  padding: ${rem(24)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(16)};
`
