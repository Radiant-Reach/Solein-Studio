import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeadingWrapper = styled.div`
  max-width: 70ch;
  margin-bottom: ${rem(40)};
`

export const IframeWrapper = styled.div`
  iframe {
    display: block;
    width: 100%;
    min-height: ${rem(720)};
  }

  ${media.md.min} {
    iframe {
      min-height: ${rem(900)};
    }
  }
`
