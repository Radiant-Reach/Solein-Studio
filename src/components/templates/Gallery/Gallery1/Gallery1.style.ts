import { rem } from 'polished'
import styled, { css, keyframes } from 'styled-components'

import media from 'styles/media'

const pop = keyframes`
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
`

export const Section = styled.section`
  padding: ${rem(80)} ${rem(30)};
  background: ${({ theme }) => theme.colors.white};

  ${media.md.max} {
    padding: ${rem(60)} ${rem(20)};
  }
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(40)};
`

export const Eyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray40};
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: ${rem(8)};
`

export const Title = styled.h4`
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${rem(10)};
  margin-bottom: ${rem(40)};
`

export const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.gray10};
  border-radius: ${rem(30)};
  padding: ${rem(10)} ${rem(28)};
  font-size: ${rem(14)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray40};
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, color 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary50};
    color: ${({ theme }) => theme.colors.primary50};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary50};
      border-color: ${theme.colors.primary50};
      color: #fff;

      &:hover {
        color: #fff;
      }
    `}
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${rem(12)};

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(26, 20, 16, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  span {
    color: #fff;
    font-size: ${rem(28)};
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.3s, transform 0.3s;
    line-height: 1;
  }
`

export const GridItem = styled.div`
  position: relative;
  border-radius: ${rem(10)};
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors.gray10};

  &:nth-child(5n + 1) {
    grid-column: span 2;
    aspect-ratio: 2 / 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.07);
  }

  &:hover ${Overlay} {
    background: rgba(26, 20, 16, 0.35);

    span {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 8, 6, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(20)};
`

export const LbInner = styled.div`
  position: relative;
  max-width: ${rem(900)};
  max-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LbImg = styled.img`
  max-width: 100%;
  max-height: 85vh;
  border-radius: ${rem(8)};
  display: block;
  object-fit: contain;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6);
  animation: ${pop} 0.3s ease;
`

const lbButtonBase = css`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const LbClose = styled.button`
  ${lbButtonBase}
  position: fixed;
  top: ${rem(20)};
  right: ${rem(24)};
  font-size: ${rem(32)};
  line-height: 1;
  opacity: 0.7;
  padding: ${rem(4)} ${rem(8)};
`

const lbNavBase = css`
  ${lbButtonBase}
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  font-size: ${rem(20)};
  width: ${rem(48)};
  height: ${rem(48)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary100} !important;
  }
`

export const LbPrev = styled.button`
  ${lbNavBase}
  left: ${rem(20)};

  @media (max-width: 600px) {
    left: ${rem(8)};
  }
`

export const LbNext = styled.button`
  ${lbNavBase}
  right: ${rem(20)};

  @media (max-width: 600px) {
    right: ${rem(8)};
  }
`

export const LbCounter = styled.div`
  position: fixed;
  bottom: ${rem(20)};
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: ${rem(13)};
  letter-spacing: 0.1em;
`
