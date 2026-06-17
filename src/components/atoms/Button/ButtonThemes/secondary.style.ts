import { css } from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const secondary = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme }) => theme.colors.black};

  border: 1px solid ${({ theme }) => theme.colors.gray100};

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

export const secondaryHover = css`
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.white};

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
