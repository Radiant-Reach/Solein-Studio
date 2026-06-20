import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const primary = css`
  background-color: ${({ theme }) => theme.colors.terracotta};
  color: ${({ theme }) => theme.colors.cream};

  border: 1px solid ${({ theme }) => theme.colors.terracotta};

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

export const primaryHover = css`
  background-color: ${({ theme }) => theme.colors.terracotta600};

  border: 1px solid ${({ theme }) => theme.colors.terracotta600};
`
