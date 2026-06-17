import React from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'

import { Button } from 'components/atoms/Button'
import { ErrorText, Field } from 'components/atoms/Input/Field'

import { useForm } from 'hooks/useForm'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

type DummyFormProps = {}

export const DummyForm: React.FC<DummyFormProps> = () => {
  const {
    isSuccess,
    isError,
    isSubmitting,
    control,
    errors,
    onSubmit: onFormSubmit,
  } = useForm({
    schema: z.object({
      fullName: z
        .string({ required_error: 'Wymagane' })
        .min(1, { message: 'Wymagane' }),
      email: z
        .string({ required_error: 'Wymagane' })
        .min(1, { message: 'Wymagane' })
        .email({ message: 'Błędny email' }),
    }),
    submitHandler: async (data) => {
      console.log(data)
      alert(JSON.stringify(data))
    },
    options: {
      defaultValues: {
        fullName: '',
        email: '',
      },
    },
  })

  return (
    <form onSubmit={onFormSubmit}>
      <Flex>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Field
              {...field}
              placeholder="Imię i nazwisko"
              errorMessage={errors.fullName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field
              {...field}
              placeholder="Email"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <div>
          <Button
            type="submit"
            $variant="primary"
            $loading={isSubmitting}
            disabled={isSubmitting}
          >
            <Flex>{isSuccess ? 'Wysłano' : 'Wyślij'}</Flex>
          </Button>
        </div>

        {isError && <ErrorText>Wystąpił błąd</ErrorText>}
      </Flex>
    </form>
  )
}
