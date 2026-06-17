import type { Meta, StoryObj } from '@storybook/react'
import { Contact2 } from './Contact2'

const meta = {
  title: 'Templates/Contact/Contact2',
  component: Contact2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Contact section with an optional map iframe, email/phone info cards, and a contact form with webhook submission.',
      },
    },
  },
} satisfies Meta<typeof Contact2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
