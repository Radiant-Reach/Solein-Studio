import { rem } from 'polished'
import styled, { css } from 'styled-components'

import { Button } from 'components/atoms/Button'
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

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(60)};
`

export const SectionTitle = styled.h2`
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray80};
  margin-bottom: ${rem(10)};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }

  ${media.md.max} {
    font-size: ${rem(24)};
  }
`

export const Subtitle = styled.p`
  font-size: ${rem(13)};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.gray60};
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(40)};
  margin-bottom: ${rem(40)};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const FormWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${rem(40)};
  border-radius: ${rem(15)};
  border: 1px solid ${({ theme }) => theme.colors.gray10};

  ${media.md.max} {
    padding: ${rem(28)} ${rem(20)};
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(20)};

  ${media.md.max} {
    grid-template-columns: 1fr;
  }
`

export const FormGroup = styled.div`
  margin-bottom: ${rem(20)};
  position: relative;
  transition: transform 0.2s;

  &:focus-within {
    transform: translateY(-2px);
  }
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${rem(8)};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem(11)};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`

export const SubmitButton = styled(Button)<{ $success?: boolean }>`
  width: 100%;
  justify-content: center;

  ${({ $success, theme }) =>
    $success &&
    css`
      background: ${theme.colors.success};
      border-color: ${theme.colors.success};
    `}
`

export const InfoPanel = styled.div`
  padding: ${rem(40)};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${rem(15)};
  border: 1px solid ${({ theme }) => theme.colors.gray10};

  ${media.md.max} {
    padding: ${rem(28)} ${rem(20)};
  }
`

export const InfoItem = styled.div`
  margin-bottom: ${rem(36)};
  display: flex;
  align-items: flex-start;
  gap: ${rem(18)};

  &:last-child {
    margin-bottom: 0;
  }
`

export const InfoIcon = styled.div`
  width: ${rem(50)};
  height: ${rem(50)};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary100},
    ${({ theme }) => theme.colors.primary50}
  );
  border-radius: ${rem(12)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(20)};
  flex-shrink: 0;
`

export const InfoContent = styled.div``

export const InfoItemTitle = styled.h3`
  font-size: ${rem(13)};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.gray80};
  margin-bottom: ${rem(8)};
`

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.8;
  font-size: ${rem(14)};

  a {
    color: ${({ theme }) => theme.colors.primary50};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary20};
    }
  }
`

export const MapContainer = styled.div`
  height: ${rem(400)};
  border-radius: ${rem(15)};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray10};

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  ${media.md.max} {
    height: ${rem(300)};
  }
`
