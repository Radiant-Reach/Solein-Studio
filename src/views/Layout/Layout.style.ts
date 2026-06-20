import { rem } from 'polished'
import styled from 'styled-components'

import { HEADER_HEIGHT } from 'components/organisms/Navigation/Navigation.style'

export const Main = styled.main`
  padding-top: ${rem(HEADER_HEIGHT)};
  background-color: ${({ theme }) => theme.colors.sand};
`
