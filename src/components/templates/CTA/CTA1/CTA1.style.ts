import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export const Section = styled.section<{ $bgImage?: string }>`
  padding: ${rem(120)} ${rem(30)};

  ${({ $bgImage }) =>
    $bgImage &&
    css`
      background-image: url('${$bgImage}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    `}
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${rem(60)};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

export const ImageSide = styled.div`
  img {
    width: 100%;
    display: block;
  }

  @media (max-width: 900px) {
    max-width: ${rem(360)};
    margin: 0 auto;
  }
`

export const Content = styled.div``

export const Eyebrow = styled.h6`
  font-size: ${rem(17)};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(16)};
`

export const Title = styled.h4`
  font-size: clamp(${rem(32)}, 4vw, ${rem(62)});
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.2;
  margin-bottom: ${rem(20)};
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(36)};
  line-height: 1.6;
`
