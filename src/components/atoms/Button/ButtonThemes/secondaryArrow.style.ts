import { css } from 'styled-components'

export const secondaryArrow = css`
  background-color: ${({ theme }) => theme.colors.transparent};

  border: 1px solid ${({ theme }) => theme.colors.black};

  svg *[fill] {
    transition: fill 0.3s;

    fill: ${({ theme }) => theme.colors.black};
  }
  svg *[stroke] {
    transition: stroke 0.3s;

    stroke: ${({ theme }) => theme.colors.black};
  }
`

export const secondaryArrowHover = css`
  border-color: ${({ theme }) => theme.colors.primary50};

  svg *[fill] {
    fill: ${({ theme }) => theme.colors.primary50};
  }
  svg *[stroke] {
    stroke: ${({ theme }) => theme.colors.primary50};
  }
`
