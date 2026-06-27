import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export type StudioIntroVariant = 'studio' | 'collective'

export const Wrapper = styled.section<{ $variant: StudioIntroVariant }>`
  padding: ${rem(96)} 0;

  ${({ $variant, theme }) =>
    $variant === 'collective' &&
    css`
      background-color: ${theme.colors.rose050};
    `}
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

export const PhotoTileButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  background: none;
`

export const FeatureRow = styled.div<{ $variant: StudioIntroVariant }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};
  align-items: center;

  padding: ${rem(56)} 0;
  border-top: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'collective'
        ? theme.colors.rose200
        : theme.colors.espresso1F};

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

export const LightboxPhoto = styled.div`
  aspect-ratio: 4 / 3;
  width: min(90vw, calc(85vh * 4 / 3));
  max-width: 90vw;
  max-height: 85vh;
`

export const CtaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${rem(20)};
  text-align: center;

  padding-top: ${rem(56)};
`
