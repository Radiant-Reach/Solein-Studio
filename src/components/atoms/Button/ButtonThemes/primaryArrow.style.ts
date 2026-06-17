import { css } from 'styled-components'

export const primaryArrow = css`
  background-color: ${({ theme }) => theme.colors.gray100};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.white};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.white};
  }
`

export const primaryArrowHover = css`
  background-color: ${({ theme }) => theme.colors.primary50};
`
