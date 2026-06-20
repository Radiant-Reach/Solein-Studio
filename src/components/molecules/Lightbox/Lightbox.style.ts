import { rem, rgba } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(24)};

  background-color: ${({ theme }) => rgba(theme.colors.espresso, 0.92)};
`

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: ${rem(480)};
`

export const CloseButton = styled.button`
  position: absolute;
  top: ${rem(20)};
  right: ${rem(20)};
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(40)};
  height: ${rem(40)};
  border-radius: 999px;

  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.cream33};
  color: ${({ theme }) => theme.colors.cream};

  svg * {
    fill: ${({ theme }) => theme.colors.cream};
    stroke: ${({ theme }) => theme.colors.cream};
  }
`

export const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(40)};
  height: ${rem(40)};
  border-radius: 999px;

  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.cream33};
  color: ${({ theme }) => theme.colors.cream};

  svg * {
    fill: ${({ theme }) => theme.colors.cream};
    stroke: ${({ theme }) => theme.colors.cream};
  }

  ${media.lg.min} {
    width: ${rem(44)};
    height: ${rem(44)};
  }
`
