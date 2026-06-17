import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Section = styled.section`
  padding: ${rem(80)} ${rem(30)};

  ${media.md.max} {
    padding: ${rem(60)} ${rem(20)};
  }
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(60)};
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const ImageSide = styled.div`
  img {
    width: 100%;
    display: block;
    border-radius: ${rem(15)};
  }

  @media (max-width: 900px) {
    max-width: ${rem(400)};
    margin: 0 auto;
  }
`

export const Content = styled.div``

export const Eyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray60};
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: ${rem(8)};
`

export const Title = styled.h4`
  font-size: ${rem(26)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray80};
  margin-bottom: ${rem(16)};
  line-height: 1.3;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Paragraph = styled.p`
  font-size: ${rem(15)};
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.7;
  margin-bottom: ${rem(28)};
`
