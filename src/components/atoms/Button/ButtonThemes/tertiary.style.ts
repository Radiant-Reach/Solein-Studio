import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const tertiary = css`
  background-color: ${({ theme }) => theme.colors.gray0};
  color: ${({ theme }) => theme.colors.gray100};

  border: 1px solid ${({ theme }) => theme.colors.gray0};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.black};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.black};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.gray100};
  }
`

export const tertiaryHover = css`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`
