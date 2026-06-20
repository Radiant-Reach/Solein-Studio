import { rem, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { BodyBig, BodyMedium } from 'components/atoms/Typography'

import media from 'styles/media'

export type InputProps = {
  $error?: boolean
  $textarea?: boolean
}

export const inputCss = css<InputProps>`
  width: 100%;
  box-sizing: border-box;
  padding: ${rem(13)} ${rem(16)};

  text-align: left;
  resize: ${({ $textarea }) => ($textarea ? 'vertical' : 'none')};

  border: 1.5px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.danger : theme.colors.espresso38};
  border-radius: ${rem(12)};
  background-color: ${({ theme }) => theme.colors.sand50};
  outline: none;
  overflow: hidden;

  ${BodyBig}
  color: ${({ theme }) => theme.colors.ink800};

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.ink400};
  }

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.danger : theme.colors.terracotta};
    box-shadow: 0 0 0 3px
      ${({ theme, $error }) =>
        rgba($error ? theme.colors.danger : theme.colors.terracotta, 0.15)};
  }

  ${media.lg.min} {
    ${BodyMedium}
  }
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const InputIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;

  width: 30px;
  height: calc(100% - 4px);
  padding-right: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background: ${({ theme }) => theme.colors.sand50};
`

export const Input = styled.input<InputProps>`
  ${inputCss}
`
