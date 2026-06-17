import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const secondaryContrast = css`
  background-color: ${({ theme }) => theme.colors.white40};
  color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.white40};

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

export const secondaryContrastHover = css`
  border: 1px solid ${({ theme }) => theme.colors.white};
`
