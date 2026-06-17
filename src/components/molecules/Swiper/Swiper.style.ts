import { rem } from 'polished'
import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

import { generatePropMedia } from 'utils/styled'
import { BreakpointValue } from 'utils/types'

export const SwiperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${rem(48)};

  position: relative;
  width: 100%;
  overscroll-behavior-x: none;
`

export const StyledSwiperWrapper = styled.div`
  position: relative;
  width: 100%;
  overscroll-behavior-x: none;
`

export const StyledSwiper = styled(Swiper)<{
  $overflow: BreakpointValue<boolean>
}>`
  max-width: 100%;
  width: 100%;
  clip-path: inset(-100vw -100vw -100vw -100vw);
  overscroll-behavior-x: none;

  ${({ theme, $overflow = false }) =>
    generatePropMedia(
      theme,
      $overflow,
      (value) => css`
        overflow: ${value ? 'visible' : 'hidden'} !important;
      `
    )}
`

export const StyledSwiperSlide = styled(SwiperSlide)<{
  $autoWidth: boolean
}>`
  height: auto !important;

  ${({ $autoWidth }) =>
    $autoWidth &&
    css`
      width: auto !important;
    `}
`
