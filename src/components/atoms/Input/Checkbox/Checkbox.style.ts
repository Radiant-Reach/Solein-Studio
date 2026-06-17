import { rem } from 'polished'
import styled from 'styled-components'

import checkIcon from 'assets/icons/check.svg'

const checkboxSize = rem(20)
const iconSize = rem(12)
export const Label = styled.p`
  display: flex;
  align-items: center;
  position: relative;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  pointer-events: ${({ onClick }) => (onClick ? 'auto' : 'none')};
  min-width: ${checkboxSize};
  min-height: ${checkboxSize};
  margin-bottom: 0;
`
export const Checkmark = styled.span<{ $error: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 0);
  height: ${checkboxSize};
  width: ${checkboxSize};
  background: transparent;
  border: 1px solid;
  transition: 0.2s;
  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.gray40};
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0px rgba(58, 57, 76, 0.08);

  &:after {
    content: '';
    position: absolute;
    opacity: 0;
    transition: 0.2s;
    left: 3px;
    top: 3px;
    width: ${iconSize};
    height: ${iconSize};
    background: url(${checkIcon}) no-repeat center;
  }
`
export const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: default;
  height: 0;
  width: 0;

  &:checked ~ ${Checkmark} {
    border-color: ${({ theme }) => theme.colors.primary50};
    background-color: ${({ theme }) => theme.colors.primary50};

    &:after {
      opacity: 1;
    }
  }
`
