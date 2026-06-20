import { createGlobalStyle, css } from 'styled-components'

import { keys } from 'utils/object'

import Normalize from 'styles/normalize'
import { colors } from 'styles/theme'

const Global = css`
  :root {
    ${keys(colors)
      .map((color) => `--color-${color}: ${colors[color]};`)
      .join('\n')}
  }

  * {
    outline-color: ${({ theme }) => theme.colors.primary100};
    box-sizing: border-box;
  }

  html {
    font-size: ${({ theme }) => theme.fonts.size};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary}, serif;
  }
`

const GlobalStyles = createGlobalStyle`
    ${Normalize}
    ${Global} 
`

export default GlobalStyles
