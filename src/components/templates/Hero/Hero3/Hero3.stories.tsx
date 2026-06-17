import type { Meta, StoryObj } from '@storybook/react'
import { Hero3 } from './Hero3'

const meta = {
  title: 'Templates/Hero/Hero3',
  component: Hero3,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Hero section with animated title, description, Google Reviews badge, and a contact form with webhook submission on the right.',
      },
    },
  },
} satisfies Meta<typeof Hero3>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
