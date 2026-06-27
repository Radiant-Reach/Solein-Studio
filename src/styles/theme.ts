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

  primary100: '#7C2914',
  primary50: '#2480BD',
  primary20: '#2EA0DF',
  primary05: '#B3E2F6',
  primary0: '#E1F4FB',

  // Brand core — exact values from the Soleil Studio identity guide (KOLORYSTYKA)
  terracotta: '#AF3D23',
  brick: '#90181A',
  orange: '#FE5900',
  espresso: '#361E1C',
  cream: '#FCF9D9',
  sand: '#FAF5EB',

  terracotta700: '#7C2914',
  terracotta600: '#94311B',
  terracotta500: '#AF3D23',
  terracotta400: '#C2613F',
  terracotta300: '#D68F73',
  terracotta200: '#E8BDAC',
  terracotta100: '#F3DDD2',
  terracotta050: '#FAEEE7',

  // Soleil Collective sub-brand accent — reddish/pink, distinct from the
  // main terracotta palette, used only on the "Soleil Collective" subpage.
  // Static for now; will move to the CMS options page later.
  rose: '#A8385F',
  rose700: '#6B1F3D',
  rose600: '#85294D',
  rose500: '#A8385F',
  rose400: '#C15D7C',
  rose300: '#D693A4',
  rose200: '#E8BFCD',
  rose100: '#F4DEE6',
  rose050: '#FBEEF2',

  ink900: '#2A1614',
  ink800: '#361E1C',
  ink700: '#4D332F',
  ink600: '#6B4A45',
  ink500: '#8A655F',
  ink400: '#AB8881',
  ink300: '#CBB2AC',
  ink200: '#E3D4CE',
  ink100: '#EFE6E1',

  sand50: '#FFFDF6',
  sand100: '#FAF5EB',
  sand200: '#F3ECDC',
  sand300: '#EBE0C9',
  cream100: '#FCF9D9',
  cream200: '#F6EFC1',

  // Alpha tints — derived from the guide's rgba() semantic tokens
  creamA8: '#FCF9D9A8', // text-on-dark-muted (~66% opacity)
  cream33: '#FCF9D933', // border-on-dark (~20% opacity)
  espresso1F: '#361E1C1F', // border-soft (~12% opacity)
  espresso38: '#361E1C38', // border-medium (~22% opacity)
  espresso6B: '#361E1C6B', // border-strong (~42% opacity)

  danger: '#90181A', // = brick / status-error
  success: '#5A7A3C', // status-success

  text: '#454545',
} as const

export type Colors = typeof colors
export type Color = keyof Colors

export const fonts = {
  size: '16px',
  primary: 'Marcellus',
  secondary: 'Caveat',
} as const

export type Fonts = typeof fonts

const theme = {
  breakpoints,
  colors,
  fonts,
}

export type Theme = typeof theme

export default theme
