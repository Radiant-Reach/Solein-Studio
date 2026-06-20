import { rem, rgba } from 'polished'
import styled, { keyframes } from 'styled-components'

import Logo_Mark from 'assets/images/logo/mark/logo-mark-cream.png'
import Grin_Texture from 'assets/images/textures/grain.png'

export type PhotoFrameTone =
  | 'sand'
  | 'espresso'
  | 'terracotta'
  | 'brick'
  | 'cream'
  | 'orange'

export const PHOTO_FRAME_TONES: PhotoFrameTone[] = [
  'espresso',
  'terracotta',
  'brick',
  'orange',
]

export const DEFAULT_PHOTO_FRAME_RADIUS = 16

export const Frame = styled.div<{ $tone: PhotoFrameTone; $radius: number }>`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;
  border-radius: ${({ $radius }) => rem($radius)};
  background-color: ${({ theme, $tone }) => theme.colors[$tone]};
`

const softPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
`

export const Grain = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image: url(${Grin_Texture});
  background-size: 300px;
  mix-blend-mode: soft-light;
  opacity: 0.5;

  animation: ${softPulse} 3.5s ease-in-out infinite;
`

export const LogoMarkWrapper = styled.div`
  position: absolute;
  inset: 0px;

  background-image: url(${Logo_Mark});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 46%;

  opacity: 0.24;
  mix-blend-mode: soft-light;
  pointer-events: none;
`

export const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  padding: ${rem(16)};
  background-image: linear-gradient(
    to top,
    ${({ theme }) => rgba(theme.colors.espresso, 0.55)},
    transparent
  );
`
