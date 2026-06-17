import { rem } from 'polished'
import styled, { keyframes } from 'styled-components'

import media from 'styles/media'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const HeroSection = styled.section<{ $bgImage: string }>`
  position: relative;
  background-image: url('${({ $bgImage }) => $bgImage}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
`

export const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: ${rem(860)};
  margin: 0 auto;
  padding: ${rem(214)} ${rem(30)} ${rem(80)};
  text-align: center;

  ${media.md.max} {
    padding: ${rem(168)} ${rem(20)} ${rem(60)};
  }
`

export const HeroTitle = styled.h1`
  font-size: clamp(${rem(32)}, 5vw, ${rem(56)});
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.15;
  margin-bottom: 0;
  animation: ${fadeUp} 0.8s ease backwards;
`

export const HeroDescription = styled.p`
  font-size: ${rem(16)};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.gray40};
  margin-top: ${rem(28)};
  animation: ${fadeUp} 0.8s ease 0.2s backwards;

  ${media.md.max} {
    font-size: ${rem(14)};
  }
`
