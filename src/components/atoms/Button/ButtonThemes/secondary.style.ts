import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const secondary = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme }) => theme.colors.ink800};

  border: 1px solid ${({ theme }) => theme.colors.espresso6B};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.ink800};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.ink800};
  }

  ${Text} {
    color: ${({ theme }) => theme.colors.ink800};
  }
`

export const secondaryHover = css`
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
