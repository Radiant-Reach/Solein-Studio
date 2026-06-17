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
`

export const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(80)};
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${rem(40)};
  }
`

export const Content = styled.div``

export const Label = styled.span`
  font-size: ${rem(13)};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.gray60};
  display: block;
  margin-bottom: ${rem(10)};
`

export const Title = styled.h2`
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray80};
  margin-bottom: ${rem(16)};
  line-height: 1.3;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.8;
  font-size: ${rem(15)};
  margin-bottom: ${rem(36)};
`

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${rem(16)};
  margin-bottom: ${rem(40)};

  ${media.md.max} {
    grid-template-columns: 1fr;
  }
`

export const FeatureItem = styled.div`
  padding: ${rem(24)} ${rem(18)};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  border-radius: ${rem(15)};
  text-align: center;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary50};
  }
`

export const FeatureIcon = styled.div`
  width: ${rem(56)};
  height: ${rem(56)};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary100},
    ${({ theme }) => theme.colors.primary50}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${rem(16)};
  font-size: ${rem(22)};
`

export const FeatureItemTitle = styled.h3`
  font-size: ${rem(14)};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray80};
  margin-bottom: ${rem(8)};
`

export const FeatureItemDesc = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  font-size: ${rem(13)};
  line-height: 1.5;
`

export const ImageSection = styled.div`
  height: ${rem(500)};
  border-radius: ${rem(15)};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray10};

  @media (max-width: 900px) {
    height: ${rem(400)};
  }
`

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
  height: 100%;
`

export const ImageItem = styled.div`
  background: ${({ theme }) => theme.colors.gray05};
  overflow: hidden;
  position: relative;

  &:first-child {
    grid-row: 1 / 3;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`
