import React from 'react'
import styled, { css } from 'styled-components'

import { BreakpointValue } from 'utils/types'

import media from 'styles/media'
import { Color } from 'styles/theme'

import { ReactComponent as CornerArrow } from 'assets/icons/arrows/corner-arrow-top-right.svg'

import { Link } from '../Link'
import { H300, Text } from '../Typography'
import {
  BUTTON_HOVER_MAP,
  Button,
  ButtonSizes,
  ButtonVariants,
} from './Button.style'

export const ArrowButtonWrapper = styled.div<{
  $variant: ButtonVariants
}>`
  cursor: pointer;
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 12px;

  ${({ $variant }) =>
    media.hoverMixin(css`
      ${Button} {
        ${BUTTON_HOVER_MAP[$variant]}
      }
    `)}
`

type ArrowButtonProps = {
  to?: string
  onClick?: () => void
  label?: string
  size?: BreakpointValue<ButtonSizes>
  color?: Color
  variant?: ButtonVariants
  uppercase?: boolean
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  to,
  onClick,
  label,
  color = 'white',
  size = 'medium',
  variant = 'primary',
  uppercase = false,
}) => {
  return (
    <ArrowButtonWrapper
      className="arrow-button"
      as={to ? Link : 'div'}
      to={to}
      $variant={variant}
      onClick={onClick}
    >
      {label && (
        <Text
          $base={H300}
          $transform={uppercase ? 'uppercase' : undefined}
          $color={color}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      )}

      <Button $size={size} $arrowIcon $variant={variant}>
        <CornerArrow />
      </Button>
    </ArrowButtonWrapper>
  )
}

export { Button }
