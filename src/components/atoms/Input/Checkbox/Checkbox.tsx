import React from 'react'

import { Checkbox as CheckboxInput, Checkmark, Label } from './Checkbox.style'

type CheckboxProps = {
  checked?: boolean
  name: string
  onChange?: (value: boolean) => void
  error?: boolean
}
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  name,
  onChange,
  error = false,
}) => {
  return (
    <Label
      className={`checkbox checkbox-${name}`}
      onClick={
        onChange
          ? (e) => {
              e.preventDefault()
              onChange(!checked)
            }
          : undefined
      }
    >
      <CheckboxInput
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        readOnly
      />
      <Checkmark $error={error} />
    </Label>
  )
}
