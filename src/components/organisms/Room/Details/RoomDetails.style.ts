import { rem } from 'polished'
import styled from 'styled-components'

import { Divider } from 'components/atoms/Divider'

import media from 'styles/media'

export const DetailsWrapper = styled.section`
  margin-top: ${rem(96)};
  padding: ${rem(96)} 0;

  background-color: ${({ theme }) => theme.colors.cream100};
`

export const TopDivider = styled(Divider)`
  margin-bottom: ${rem(64)};
`

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(56)};

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const SpecsList = styled.dl`
  margin: ${rem(24)} 0 0;
`

export const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${rem(16)};

  padding: ${rem(16)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};
`

export const AmenityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(14)};

  margin-top: ${rem(24)};
`
