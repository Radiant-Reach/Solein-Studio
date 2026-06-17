import type { Meta, StoryObj } from '@storybook/react'

import { DummyForm } from './Dummy-Form'

const meta = {
  title: 'Forms/DummyForm',
  component: DummyForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A sample form with full name and email fields, including validation and submission handling.',
      },
    },
  },
} satisfies Meta<typeof DummyForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
