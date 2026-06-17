import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const pagination = css`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray05};
  color: ${({ theme }) => theme.colors.black};

  padding: 12px 0;

  ${Text} {
    color: ${({ theme }) => theme.colors.black};
  }
`

export const paginationHover = css`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`
