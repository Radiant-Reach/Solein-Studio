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

export const Left = styled.div`
  @media (max-width: 900px) {
    max-width: ${rem(400)};
    margin: 0 auto;
  }
`

export const LeftImage = styled.img`
  width: 100%;
  display: block;
`

export const Right = styled.div``

export const Header = styled.div`
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
  font-size: ${rem(26)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(16)};
  line-height: 1.3;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Description = styled.div`
  font-size: ${rem(15)};
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.7;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(20)};
  margin-top: ${rem(50)};
  padding-top: ${rem(10)};
  overflow: visible;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  border-radius: ${rem(15)};
  padding: ${rem(60)} ${rem(24)} ${rem(28)};
  border: 1px solid ${({ theme }) => theme.colors.white};
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  overflow: visible;
`

export const CardIcon = styled.div`
  position: absolute;
  left: ${rem(24)};
  top: ${rem(-30)};
  width: ${rem(70)};
  height: ${rem(70)};
  border-radius: ${rem(15)};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 55%;
  }
`

export const CardTitle = styled.h4`
  font-size: ${rem(17)};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray40};
  margin-bottom: ${rem(10)};
`

export const CardText = styled.p`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.6;
  margin: 0;
`
