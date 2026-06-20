import { rem, rgba } from 'polished'
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

export const NavButton = styled.button<{
  $side: 'left' | 'right'
  $positionY?: `${number}%`
}>`
  position: absolute;
  top: ${({ $positionY }) => $positionY ?? '50%'};
  ${({ $side }) => ($side === 'left' ? 'left: 8px;' : 'right: 8px;')}
  transform: translateY(-50%);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(40)};
  height: ${rem(40)};
  margin: 0;
  border-radius: 999px;

  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.sand50};
  color: ${({ theme }) => theme.colors.ink800};
  box-shadow: 0 ${rem(4)} ${rem(12)}
    ${({ theme }) => rgba(theme.colors.espresso, 0.08)};

  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  svg * {
    fill: ${({ theme }) => theme.colors.ink800};
    stroke: ${({ theme }) => theme.colors.ink800};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.sand100};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`
