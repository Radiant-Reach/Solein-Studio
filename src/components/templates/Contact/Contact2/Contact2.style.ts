import { rem } from 'polished'
import styled, { css } from 'styled-components'

import { Button } from 'components/atoms/Button'
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
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const MapWrap = styled.div`
  iframe {
    width: 100%;
    border: none;
    border-radius: ${rem(15)};
    display: block;
  }
`

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(20)};
  margin-top: ${rem(-30)};

  @media (max-width: 900px) {
    margin-top: ${rem(20)};
    grid-template-columns: 1fr;
  }
`

export const InfoCard = styled.a`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: ${rem(15)};
  padding: ${rem(20)};
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${rem(14)};
  text-decoration: none;
`

export const InfoCardIcon = styled.div`
  font-size: ${rem(24)};
  flex-shrink: 0;
`

export const InfoCardTitle = styled.h4`
  font-size: ${rem(12)};
  font-weight: 900;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray40};
  margin-bottom: ${rem(4)};
`

export const InfoCardValue = styled.span`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.primary50};
  font-weight: 700;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const FormWrap = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${rem(15)};
  padding: ${rem(40)};
  border: 1px solid ${({ theme }) => theme.colors.black};
  position: relative;
  z-index: 2;

  textarea {
    min-height: ${rem(140)};
  }

  ${media.md.max} {
    padding: ${rem(28)} ${rem(20)};
  }
`

export const FormHeader = styled.div`
  margin-bottom: ${rem(30)};
`

export const FormEyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray40};
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: ${rem(8)};
`

export const FormTitle = styled.h4`
  font-size: ${rem(24)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${rem(10)};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const FormDescription = styled.p`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.colors.gray40};
  line-height: 1.6;
`

export const NameRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${rem(12)};
  margin-bottom: ${rem(16)};

  ${media.md.max} {
    grid-template-columns: 1fr;
  }
`

export const FormField = styled.div`
  margin-bottom: ${rem(16)};

  &:last-child {
    margin-bottom: 0;
  }
`

export const SubmitButton = styled(Button)<{
  $success?: boolean
  $error?: boolean
}>`
  width: 100%;
  justify-content: center;

  ${({ $success, theme }) =>
    $success &&
    css`
      background: ${theme.colors.success};
      border-color: ${theme.colors.success};
    `}

  ${({ $error, theme }) =>
    $error &&
    css`
      background: ${theme.colors.danger};
      border-color: ${theme.colors.danger};
    `}
`
