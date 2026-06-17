import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const primary = css`
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray100};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.white};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.white};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.white};
  }
`

export const primaryHover = css`
  background-color: ${({ theme }) => theme.colors.gray80};

  border: 1px solid ${({ theme }) => theme.colors.gray80};
`
