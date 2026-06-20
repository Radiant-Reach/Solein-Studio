import React from 'react'

import { Icon, IconSrc } from 'components/atoms/Icon'

import {
  DEFAULT_ICON_BUTTON_SIZE,
  DEFAULT_ICON_BUTTON_VARIANT,
  ICON_BUTTON_ICON_SIZE,
  IconButtonGlyph,
  IconButtonSize,
  IconButtonVariant,
  IconButtonWrapper,
} from './IconButton.style'

export type IconButtonProps = {
  src: IconSrc
  label: string
  size?: IconButtonSize
  variant?: IconButtonVariant
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  src,
  label,
  size = DEFAULT_ICON_BUTTON_SIZE,
  variant = DEFAULT_ICON_BUTTON_VARIANT,
  disabled = false,
  onClick,
  className,
}) => (
  <IconButtonWrapper
    type="button"
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick={onClick}
    className={className}
    $size={size}
    $variant={variant}
  >
    <IconButtonGlyph $invert={variant === 'solid'}>
      {typeof src === 'string' ? (
        <Icon src={src} size={ICON_BUTTON_ICON_SIZE[size]} />
      ) : (
        <Icon src={src} size={ICON_BUTTON_ICON_SIZE[size]} />
      )}
    </IconButtonGlyph>
  </IconButtonWrapper>
)

export type { IconButtonSize, IconButtonVariant }
