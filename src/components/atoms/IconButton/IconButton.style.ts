import styled, { RuleSet, css } from 'styled-components'

import media from 'styles/media'

export type IconButtonSize = 'small' | 'medium' | 'large'
export type IconButtonVariant = 'soft' | 'outline' | 'solid'

export const DEFAULT_ICON_BUTTON_SIZE: IconButtonSize = 'medium'
export const DEFAULT_ICON_BUTTON_VARIANT: IconButtonVariant = 'soft'

export const ICON_BUTTON_DIMENSIONS: Record<IconButtonSize, number> = {
  small: 36,
  medium: 44,
  large: 56,
}

export const ICON_BUTTON_ICON_SIZE: Record<IconButtonSize, number> = {
  small: 18,
  medium: 22,
  large: 28,
}

export const ICON_BUTTON_VARIANT_MAP: Record<
  IconButtonVariant,
  RuleSet<object>
> = {
  soft: css`
    background-color: ${({ theme }) => theme.colors.terracotta050};
    border: 1.5px solid transparent;
  `,
  outline: css`
    background-color: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.espresso38};
  `,
  solid: css`
    background-color: ${({ theme }) => theme.colors.terracotta};
    border: 1.5px solid ${({ theme }) => theme.colors.terracotta};
  `,
}

export const ICON_BUTTON_HOVER_MAP: Partial<
  Record<IconButtonVariant, RuleSet<object>>
> = {
  soft: css`
    background-color: ${({ theme }) => theme.colors.terracotta100};
  `,
  outline: css`
    background-color: ${({ theme }) => theme.colors.terracotta100};
  `,
}

type IconButtonWrapperProps = {
  $size: IconButtonSize
  $variant: IconButtonVariant
}

export const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => ICON_BUTTON_DIMENSIONS[$size]}px;
  height: ${({ $size }) => ICON_BUTTON_DIMENSIONS[$size]}px;

  padding: 0;
  border-radius: 999px;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  ${({ $variant }) => ICON_BUTTON_VARIANT_MAP[$variant]}

  ${({ $variant }) =>
    ICON_BUTTON_HOVER_MAP[$variant] &&
    media.hoverMixin(css`
      ${ICON_BUTTON_HOVER_MAP[$variant]}
    `)}

  &:active {
    transform: scale(0.93);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.45;
  }
`

export const IconButtonGlyph = styled.span<{ $invert: boolean }>`
  display: flex;
  filter: ${({ $invert }) => ($invert ? 'brightness(0) invert(1)' : 'none')};
`
