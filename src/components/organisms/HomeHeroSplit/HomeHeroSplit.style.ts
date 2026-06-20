import { rem } from 'polished'
import styled from 'styled-components'

import { HEADER_HEIGHT } from 'components/organisms/Navigation/Navigation.style'

import media from 'styles/media'

import PaintTexture from 'assets/images/textures/paint.png'

export const HeroWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - ${rem(HEADER_HEIGHT)});

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const PhotoPanel = styled.div`
  display: none;

  ${media.lg.min} {
    display: block;
  }
`

export const BrandPanel = styled.div`
  position: relative;
  overflow: hidden;

  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.terracotta},
    ${({ theme }) => theme.colors.brick}
  );
`

export const Texture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image: url(${PaintTexture});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  mix-blend-mode: soft-light;
  opacity: 0.5;
`

export const Content = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${rem(32)};
  height: 100%;
  padding: ${rem(48)} ${rem(24)};
`

export const Logo = styled.div`
  width: ${rem(220)};
`
