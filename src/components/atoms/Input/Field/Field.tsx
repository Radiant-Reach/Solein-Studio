import { rem } from 'polished'
import React, { PropsWithChildren, forwardRef, useId } from 'react'
import styled from 'styled-components'

import { Input } from 'components/atoms/Input'
import { BodySmall, Text } from 'components/atoms/Typography'

import { InferProps, TypedOmit } from 'utils/types'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: ${rem(13)};
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.ink600};
`

type CustomFieldProps = {
  errorMessage?: string
}

type FieldProps = {
  label?: string
} & CustomFieldProps &
  TypedOmit<InferProps<typeof Input>, '$error'>

export const ErrorText: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Text
      $color="danger"
      $base={BodySmall}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  )
}

export const CustomField: React.FC<PropsWithChildren<CustomFieldProps>> = ({
  errorMessage,
  children,
}) => {
  return (
    <Flex>
      {children}
      {errorMessage && <ErrorText message={errorMessage} />}
    </Flex>
  )
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, errorMessage, id, ...props }, ref) => {
    const generatedId = useId()
    const fieldId = id ?? generatedId

    return (
      <Flex>
        {label && (
          <Label
            htmlFor={fieldId}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        )}
        <Input id={fieldId} $error={!!errorMessage} ref={ref} {...props} />
        {errorMessage && <ErrorText message={errorMessage} />}
      </Flex>
    )
  }
)
