export const breakpoints = {
  base: 0,
  xs: 350,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xl3: 1600,
  desktop: 1920,
} as const

export type Breakpoints = typeof breakpoints
export type Breakpoint = keyof Breakpoints

export const colors = {
  transparent: '#00000000',
  black: '#000000',
  white: '#FFFFFF',
  white90: '#FFFFFF90',
  white72: '#FFFFFF72',
  white40: '#FFFFFF40',
  white16: '#FFFFFF16',
  white12: '#FFFFFF12',

  gray100: '#000100',
  gray80: '#262726',
  gray60: '#9D9E9D',
  gray40: '#C3C4C3',
  gray10: '#D9DAD9',
  gray05: '#E8E9E8',
  gray00: '#F5F5F5',

  primary100: '#216FA9',
  primary50: '#2480BD',
  primary20: '#2EA0DF',
  primary05: '#B3E2F6',
  primary0: '#E1F4FB',

  danger: '#e74c3c',
  success: '#2ecc71',

  text: '#454545',
} as const

export type Colors = typeof colors
export type Color = keyof Colors

export const fonts = {
  size: '16px',
} as const

export type Fonts = typeof fonts

const theme = {
  breakpoints,
  colors,
  fonts,
}

export type Theme = typeof theme

export default theme
