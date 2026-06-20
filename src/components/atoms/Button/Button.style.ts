import { rem } from 'polished'
import styled, { RuleSet, css } from 'styled-components'

import { generatePropMedia } from 'utils/styled'
import { BreakpointValue } from 'utils/types'

import loadingIcon from 'assets/icons/loading.svg'

import { H300 } from '../Typography'
import ButtonStyles from './ButtonThemes'

export const DEFAULT_BUTTON_VARIANT = 'primary'
export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'primaryContrast',
  'secondaryContrast',
] as const
export type ButtonVariants = (typeof BUTTON_VARIANTS)[number]

export const DEFAULT_BUTTON_SIZE: ButtonSizes = 'medium'
export const ARROW_ICON_SIZE = {
  small: 8,
  medium: 11,
  large: 14,
}
export const ICON_SIZE = {
  small: 16,
  medium: 20,
  large: 24,
}
export type ButtonSizes = keyof typeof ICON_SIZE
export const BUTTON_SIZES = Object.keys(ICON_SIZE) as ButtonSizes[]

export const BUTTON_MAP: Record<ButtonVariants, RuleSet<object>> = {
  primary: ButtonStyles.primary,
  secondary: ButtonStyles.secondary,
  primaryContrast: ButtonStyles.primaryContrast,
  secondaryContrast: ButtonStyles.secondaryContrast,
}

export const BUTTON_HOVER_MAP: Record<ButtonVariants, RuleSet<object>> = {
  primary: ButtonStyles.primaryHover,
  secondary: ButtonStyles.secondaryHover,
  primaryContrast: ButtonStyles.primaryContrastHover,
  secondaryContrast: ButtonStyles.secondaryContrastHover,
}

type ButtonProps = {
  $variant?: ButtonVariants
  $fullWidth?: boolean
  $iconOnly?: boolean
  $size?: BreakpointValue<ButtonSizes>
  $loading?: boolean
  $arrowIcon?: boolean
  $active?: boolean
}

export const ButtonHover = css<ButtonProps>`
  ${({ $variant = DEFAULT_BUTTON_VARIANT }) => {
    return css`
      ${BUTTON_MAP[$variant]}

      @media (hover: hover) {
        &:hover {
          ${BUTTON_HOVER_MAP[$variant]}
        }
      }
    `
  }}
`

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  text-decoration: none;
  border: none;
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};
  height: fit-content;

  ${({ theme, $size = DEFAULT_BUTTON_SIZE, $iconOnly, $arrowIcon }) =>
    generatePropMedia(theme, $size, (value) => {
      const padding = {
        small: $arrowIcon
          ? rem(8)
          : $iconOnly
            ? rem(8)
            : `${rem(8)} ${rem(12)}`,
        medium: $arrowIcon
          ? rem(9)
          : $iconOnly
            ? rem(11)
            : `${rem(12)} ${rem(20)}`,
        large: $arrowIcon
          ? rem(13)
          : $iconOnly
            ? rem(12)
            : `${rem(16)} ${rem(24)}`,
      }

      return css`
        ${$arrowIcon &&
        css`
          svg {
            width: ${rem(ARROW_ICON_SIZE[value])};
            height: ${rem(ARROW_ICON_SIZE[value])};
          }
        `}

        ${$iconOnly &&
        css`
          svg {
            width: ${rem(ICON_SIZE[value])};
            height: ${rem(ICON_SIZE[value])};
          }
        `}

      padding: ${padding[value]};
      `
    })}

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  border-radius: 999px;

  position: relative;
  overflow: hidden;

  &:active {
    transform: scale(0.96);
  }

  ${ButtonHover}

  ${({ $active, $variant = DEFAULT_BUTTON_VARIANT }) =>
    $active &&
    css`
      ${BUTTON_HOVER_MAP[$variant]}
    `}

  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.8;
      cursor: wait;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: inherit;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image: url(${loadingIcon});
        background-size: auto 75%;
        background-position: center;
        background-repeat: no-repeat;
      }
    `};

  &[disabled] {
    opacity: 0.75;
    cursor: not-allowed;
  }

  transition: all 0.3s;
`

export const TabButton = styled.button<{
  $active: boolean
  $variant?: 'primary' | 'secondary'
}>`
  cursor: pointer;
  padding: 0px 16px 15px;
  margin-bottom: 1px;

  ${H300}
  text-align: center;

  border: none;
  background: none;
  border-bottom: 1px solid
    ${({ theme, $variant = 'primary' }) =>
      $variant === 'primary' ? theme.colors.gray40 : theme.colors.white16};
  color: ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary' ? theme.colors.gray60 : theme.colors.white72};

  transition: border-color 0.3s;

  &:hover {
    color: ${({ theme, $variant = 'primary' }) =>
      $variant === 'primary' ? theme.colors.black : theme.colors.white};

    transition: color 0.3s;
  }

  ${({ $active, theme, $variant = 'primary' }) =>
    $active &&
    css`
      margin-bottom: 0px;

      border-bottom: 2px solid
        ${$variant === 'primary' ? theme.colors.gray100 : theme.colors.white};
      color: ${$variant === 'primary'
        ? theme.colors.black
        : theme.colors.white};
    `}
`
