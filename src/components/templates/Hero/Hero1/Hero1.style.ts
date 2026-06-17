import { rem } from 'polished'
import styled, { css, keyframes } from 'styled-components'

import media from 'styles/media'

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const bounce = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
`

const scrollDot = keyframes`
  0%   { top: 10px; opacity: 1; }
  50%  { top: 30px; opacity: 0.5; }
  100% { top: 10px; opacity: 1; }
`

export const HeroSection = styled.section<{ $bgImage: string }>`
  min-height: 100vh;
  position: relative;
  background-image: url('${({ $bgImage }) => $bgImage}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const HeroBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.55);
`

export const HeroContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1400px;
  margin: 0 auto;
  padding: 94px 50px 0;
  position: relative;
  z-index: 2;
  align-items: center;

  ${media.lg.max} {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 94px;
  }

  ${media.md.max} {
    padding: 68px 20px 0;
  }
`

export const HeroLeft = styled.div`
  padding-right: 60px;

  ${media.lg.max} {
    padding-right: 0;
    max-width: 600px;
    margin: 0 auto;
  }
`

export const HeroTitle = styled.h1`
  font-size: clamp(${rem(50)}, 7vw, ${rem(90)});
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: ${rem(25)};
  color: ${({ theme }) => theme.colors.white};

  ${media.md.max} {
    font-size: ${rem(50)};
  }
`

export const HeroLine = styled.span<{ $delay: number }>`
  display: block;
  overflow: hidden;

  > span {
    display: inline-block;
    animation: ${slideUp} 1s ease backwards;
    animation-delay: ${({ $delay }) => $delay}s;
  }
`

export const HeroAccent = styled.span`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary100},
    ${({ theme }) => theme.colors.primary20}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
`

export const HeroDescription = styled.p`
  font-size: ${rem(18)};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray40};
  margin-bottom: ${rem(40)};
  animation: ${fadeIn} 1s ease 0.6s backwards;

  ${media.md.max} {
    font-size: ${rem(15)};
  }
`

export const HeroGoogleReviews = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(16)};
  margin-bottom: ${rem(50)};
  animation: ${fadeIn} 1s ease 0.8s backwards;

  ${media.lg.max} {
    justify-content: center;
  }

  img {
    height: ${rem(28)};
    width: auto;
    display: block;
    flex-shrink: 0;
  }
`

export const HeroGoogleReviewsText = styled.span`
  font-size: ${rem(16)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.3;

  ${media.md.max} {
    font-size: ${rem(14)};
  }
`

export const HeroCtaGroup = styled.div`
  display: flex;
  gap: ${rem(20)};
  animation: ${fadeIn} 1s ease 1s backwards;

  ${media.md.max} {
    flex-direction: column;
    align-items: center;
  }
`

export const HeroRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.lg.max} {
    display: none;
  }
`

export const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${rem(500)};
  height: ${rem(600)};
`

export const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${rem(10)};
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const HeroImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
`

export const HeroScrollIndicator = styled.div`
  position: absolute;
  bottom: ${rem(30)};
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s ease infinite;
  z-index: 3;

  ${media.md.max} {
    display: none;
  }

  span {
    display: block;
    width: ${rem(30)};
    height: ${rem(50)};
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: ${rem(25)};
    position: relative;

    &::after {
      content: '';
      display: block;
      width: ${rem(6)};
      height: ${rem(6)};
      background: ${({ theme }) => theme.colors.primary50};
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: ${rem(10)};
      animation: ${scrollDot} 2s ease infinite;
    }
  }
`
