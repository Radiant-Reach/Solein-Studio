import type { Meta, StoryObj } from '@storybook/react'
import { Contact1 } from './Contact1'

const meta = {
  title: 'Templates/Contact/Contact1',
  component: Contact1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Contact section with a multi-field form, contact info items (address, phone, email), and an embedded Google Maps iframe.',
      },
    },
  },
} satisfies Meta<typeof Contact1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
