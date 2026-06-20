import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const IntroWrapper = styled.div`
  margin-bottom: ${rem(56)};
`

export const IntroParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};

  max-width: 70ch;
  margin-top: ${rem(24)};
`

export const HeroPhotoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${rem(16)};
  margin-bottom: ${rem(40)};

  ${media.sm.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const HeroPhotoTile = styled.div`
  height: ${rem(260)};

  ${media.sm.min} {
    height: ${rem(320)};
  }
`

export const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};
  align-items: center;

  padding: ${rem(56)} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.espresso1F};

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FeaturePhoto = styled.div`
  aspect-ratio: 4 / 3;
`

export const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
`

export const CtaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${rem(20)};
  text-align: center;

  padding-top: ${rem(56)};
`
