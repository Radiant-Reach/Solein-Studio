import { rem } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(16)};
  width: 100%;
`

export const Line = styled.span`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.espresso1F};
`

export const Mark = styled.span`
  display: flex;
  flex-shrink: 0;
  width: ${rem(22)};
  height: ${rem(22)};
  opacity: 0.7;
`
