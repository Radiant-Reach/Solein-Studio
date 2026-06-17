import styled, { css } from 'styled-components'

import { Button } from 'components/atoms/Button'

export const Wrapper = styled.div<{
  $small?: boolean
}>`
  width: ${({ $small }) => ($small ? 'fit-content' : '100%')};

  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SelectWrapper = styled.div<{
  $small?: boolean
}>`
  max-width: 100%;

  overflow: auto;

  display: flex;
  flex-direction: row;
  gap: 8px;

  & ${Button} {
    ${({ $small }) =>
      $small &&
      css`
        width: 44px;
      `};
  }
`
