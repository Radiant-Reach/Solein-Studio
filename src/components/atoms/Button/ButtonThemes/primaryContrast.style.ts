import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const primaryContrast = css`
  background-color: ${({ theme }) => theme.colors.gray0};
  color: ${({ theme }) => theme.colors.black};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.black};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.black};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.black};
  }
`

export const primaryContrastHover = css`
  background-color: ${({ theme }) => theme.colors.gray40};
`
