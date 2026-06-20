import { rem } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
  background-color: ${({ theme }) => theme.colors.sand};
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(56)};
`
