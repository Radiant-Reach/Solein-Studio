import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const secondaryContrast = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme }) => theme.colors.cream};

  border: 1px solid ${({ theme }) => theme.colors.cream33};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.cream};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.cream};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.cream};
  }
`

export const secondaryContrastHover = css`
  border: 1px solid ${({ theme }) => theme.colors.cream};
`
