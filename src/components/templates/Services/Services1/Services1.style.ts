import { rem } from 'polished'
import styled, { keyframes } from 'styled-components'

import media from 'styles/media'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Section = styled.section`
  padding: ${rem(80)} 0;
`

export const Container = styled.div`
  max-width: ${rem(1200)};
  margin: 0 auto;
  padding: 0 ${rem(30)};
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(60)};
  animation: ${fadeUp} 0.7s ease backwards;
`

export const Eyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray40};
  font-weight: 600;
  letter-spacing: 2px;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${rem(20)};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export const ImageWrapper = styled.div`
  width: calc(100% + ${rem(40)});
  margin-left: ${rem(-20)};
  margin-right: ${rem(-20)};
  margin-top: ${rem(-20)};
  margin-bottom: ${rem(18)};
  border-radius: ${rem(15)} ${rem(15)} 0 0;
  overflow: hidden;
  aspect-ratio: 4 / 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
`

export const ServiceItem = styled.a<{ $delay: number }>`
  border-radius: ${rem(15)};
  text-align: center;
  padding: ${rem(20)} ${rem(20)} ${rem(28)};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  transition: border-color 0.3s, transform 0.3s;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease ${({ $delay }) => $delay}s forwards;
  text-decoration: none;
  display: block;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary50};
    transform: translateY(-5px);

    ${ImageWrapper} img {
      transform: scale(1.07);
    }
  }
`

export const ServiceTitle = styled.h4`
  font-size: ${rem(17)};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(10)};
`

export const ServiceDescription = styled.p`
  font-size: ${rem(13)};
  color: ${({ theme }) => theme.colors.gray40};
  line-height: 1.6;
  margin: 0;
`
