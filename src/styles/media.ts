/* eslint-disable no-param-reassign */
import { Interpolation, css } from 'styled-components'

import { keys } from 'utils/object'

import { Breakpoint, breakpoints } from 'styles/theme'

type Media = {
  [key in Breakpoint]: {
    min: string
    max: string
  }
} & {
  hover: string
  hoverMixin: (styles: Interpolation<object>[]) => Interpolation<object>
}

const min = (minWidth: number) => `@media (min-width: ${minWidth}px)`
const max = (maxWidth: number) => `@media (max-width: ${maxWidth - 1}px)`
const hover = () => `@media (hover: hover)`

export const media = keys(breakpoints).reduce((acc, breakpoint) => {
  acc[breakpoint] = {
    min: min(breakpoints[breakpoint]),
    max: max(breakpoints[breakpoint]),
  }
  return acc
}, {} as Media)

media.hover = hover()
media.hoverMixin = (styles) => css`
  ${media.hover} {
    &:hover {
      ${styles}
    }
  }
`

export default media
