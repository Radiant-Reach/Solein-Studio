import type { Meta, StoryObj } from '@storybook/react'
import { Hero1 } from './Hero1'

const meta = {
  title: 'Templates/Hero/Hero1',
  component: Hero1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Hero section with animated multi-line title, description, Google Reviews badge, a CTA button, and a side image.',
      },
    },
  },
} satisfies Meta<typeof Hero1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
