import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const primaryContrast = css`
  background-color: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.espresso};

  border: 1px solid ${({ theme }) => theme.colors.cream};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.espresso};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.espresso};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.espresso};
  }
`

export const primaryContrastHover = css`
  background-color: ${({ theme }) => theme.colors.sand};

  border: 1px solid ${({ theme }) => theme.colors.sand};
`
