import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export const Section = styled.section<{ $bgImage?: string }>`
  padding: ${rem(80)} ${rem(30)};

  ${({ $bgImage }) =>
    $bgImage &&
    css`
      background-image: url('${$bgImage}');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${rem(60)};
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const Left = styled.div``

export const Header = styled.div`
  margin-bottom: ${rem(24)};
`

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

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.7;
  margin-bottom: ${rem(16)};
  font-size: ${rem(15)};
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${rem(36)} 0;
`

export const ListItem = styled.li`
  font-size: ${rem(14)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  margin-bottom: ${rem(14)};
  padding-left: ${rem(16)};
  position: relative;

  &::before {
    content: '–';
    position: absolute;
    left: 0;
  }
`

export const Right = styled.div``

export const VideoWrap = styled.div`
  position: relative;
  border-radius: ${rem(20)};
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    border-radius: ${rem(20)};
  }
`
