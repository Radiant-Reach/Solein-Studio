import styled, { css } from 'styled-components'

export const CONTAINER_SIZES_MAP = {
  compact: '750px',
  slim: '1000px',
  normal: '1220px',
  wide: '1440px',
  full: 'initial',
} as const
export const CONTAINER_VARIANTS = Object.keys(CONTAINER_SIZES_MAP) as Array<
  keyof typeof CONTAINER_SIZES_MAP
>

type ContainerProps = {
  $fullHeight?: boolean
  $variant?: keyof typeof CONTAINER_SIZES_MAP
}

export const Container = styled.div<ContainerProps>`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: calc(100% - 2rem);

  box-sizing: content-box;

  max-width: ${({ $variant = 'normal' }) => CONTAINER_SIZES_MAP[$variant]};

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `};
`
