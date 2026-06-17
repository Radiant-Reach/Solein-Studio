import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export const Section = styled.section`
  padding: ${rem(80)} ${rem(30)};
  background: ${({ theme }) => theme.colors.gray00};

  ${media.md.max} {
    padding: ${rem(60)} ${rem(20)};
  }
`

export const Container = styled.div`
  max-width: ${rem(860)};
  margin: 0 auto;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(60)};
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
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray80};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.gray10};
  }
`

export const Question = styled.button`
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${rem(20)};
  padding: ${rem(22)} 0;
  cursor: pointer;
  text-align: left;
`

export const QuestionText = styled.span<{ $active: boolean }>`
  font-size: ${rem(16)};
  font-weight: 700;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary50 : theme.colors.gray80};
  line-height: 1.4;
  transition: color 0.2s;
`

export const Icon = styled.span<{ $active: boolean }>`
  flex-shrink: 0;
  width: ${rem(28)};
  height: ${rem(28)};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(16)};
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1;
  transition: background 0.3s, border-color 0.3s, transform 0.4s;
  transform: ${({ $active }) => ($active ? 'rotate(45deg)' : 'none')};

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary50};
      border-color: ${theme.colors.primary50};
      color: #fff;
    `}
`

export const Answer = styled.div<{ $active: boolean }>`
  overflow: hidden;
  max-height: ${({ $active }) => ($active ? rem(600) : 0)};
  transition: max-height 0.4s ease;
`

export const AnswerText = styled.p`
  font-size: ${rem(15)};
  color: ${({ theme }) => theme.colors.gray60};
  line-height: 1.8;
  padding-bottom: ${rem(22)};
  margin: 0;
`
