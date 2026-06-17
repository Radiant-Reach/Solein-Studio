import { CSSProperties } from 'react'
import styled, { css } from 'styled-components'

import { generatePropMedia } from 'utils/styled'
import { BreakpointValue } from 'utils/types'

type GridProps = {
  $gap?: BreakpointValue<CSSProperties['gap']>
  $columns?: BreakpointValue<number>
  $rows?: BreakpointValue<number>
  $align?: BreakpointValue<CSSProperties['alignItems']>
  $justify?: BreakpointValue<CSSProperties['justifyContent']>
}

export const Grid = styled.div<GridProps>`
  display: grid;

  ${({ theme, $gap = {} }) =>
    generatePropMedia(
      theme,
      $gap,
      (value) => css`
        gap: ${value};
      `
    )}

  ${({ theme, $columns = {} }) =>
    generatePropMedia(
      theme,
      $columns,
      (value) => css`
        grid-template-columns: repeat(${value}, minmax(0, 1fr));
      `
    )};

  ${({ theme, $rows = {} }) =>
    generatePropMedia(
      theme,
      $rows,
      (value) => css`
        grid-template-rows: repeat(${value}, minmax(0, 1fr));
      `
    )};

  ${({ theme, $align = {} }) =>
    generatePropMedia(
      theme,
      $align,
      (value) => css`
        align-items: ${value};
      `
    )};

  ${({ theme, $justify = {} }) =>
    generatePropMedia(
      theme,
      $justify,
      (value) => css`
        justify-items: ${value};
      `
    )};
`

type GridItemProps = {
  $columns?: BreakpointValue<number, never>
  $rows?: BreakpointValue<number, never>
}
// NOTE: size cannot be greater than column size set in Grid
export const GridItem = styled.div<GridItemProps>`
  display: flex;

  ${({ theme, $columns = {} }) =>
    generatePropMedia(
      theme,
      $columns,
      (value) => css`
        grid-column-end: span ${value};
      `
    )};

  ${({ theme, $rows = {} }) =>
    generatePropMedia(
      theme,
      $rows,
      (value) => css`
        grid-row-end: span ${value};
      `
    )};
`
