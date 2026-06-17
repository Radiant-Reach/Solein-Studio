import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Section = styled.section`
  padding: ${rem(80)} 0;
  position: relative;
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  padding: 0 ${rem(30)};
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(60)};
`

export const Eyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray40};
  font-weight: 600;
  letter-spacing: 1px;
`

export const Title = styled.h4`
  margin-top: ${rem(10)};
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const CarouselWrapper = styled.div<{ $dragging: boolean }>`
  overflow: hidden;
  cursor: ${({ $dragging }) => ($dragging ? 'grabbing' : 'grab')};
  user-select: none;
`

export const Track = styled.div`
  display: flex;
  gap: ${rem(20)};
`

export const Item = styled.div`
  flex: 0 0 calc(33.333% - 14px);
  border-radius: ${rem(15)};
  padding: ${rem(30)};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary50};
  }

  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 10px);
  }

  @media (max-width: 600px) {
    flex: 0 0 100%;
  }
`

export const ItemText = styled.p`
  font-size: ${rem(16)};
  font-style: italic;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.6;
  margin-bottom: auto;
  padding-bottom: ${rem(24)};
`

export const ItemAuthor = styled.h4`
  font-size: ${rem(18)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(8)};
  margin-top: 0;
  padding-right: ${rem(60)};
`

export const StarsImg = styled.img`
  max-width: ${rem(150)};
  display: block;
`

export const QuoteImg = styled.img`
  max-width: ${rem(44)};
  position: absolute;
  right: ${rem(30)};
  bottom: ${rem(30)};
`

export const Dots = styled.div`
  text-align: center;
  margin-top: ${rem(30)};
`

export const DotButton = styled.button<{ $active: boolean }>`
  width: ${rem(10)};
  height: ${rem(10)};
  border-radius: 50%;
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary50 : '#ddd')};
  margin: 0 ${rem(4)};
  cursor: pointer;
  padding: 0;
  transition: background 0.3s;

  ${media.md.max} {
    width: ${rem(8)};
    height: ${rem(8)};
  }
`
