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
  gap: ${rem(80)};
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${rem(40)};
  }
`

export const Left = styled.div``

export const Header = styled.div`
  margin-bottom: ${rem(24)};
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
  margin: 0;
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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(20)};

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export const StatItem = styled.div`
  text-align: center;
`

export const StatNumber = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: ${rem(15)};
  display: inline-block;
  width: ${rem(105)};
  height: ${rem(55)};
  line-height: ${rem(55)};
  font-size: ${rem(28)};
  color: ${({ theme }) => theme.colors.primary50};
  font-weight: 900;
  margin-bottom: ${rem(-40)};
  position: relative;
  z-index: 2;
  top: ${rem(15)};
`

export const StatLabel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: ${rem(15)};
  text-align: center;
  font-size: ${rem(18)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  padding: ${rem(50)} ${rem(20)} ${rem(24)};
  position: relative;
  z-index: 1;
`
