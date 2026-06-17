import type { Meta, StoryObj } from '@storybook/react'
import { Hero2 } from './Hero2'

const meta = {
  title: 'Templates/Hero/Hero2',
  component: Hero2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Minimal hero section with a full-width background image, large title, and optional description text.',
      },
    },
  },
} satisfies Meta<typeof Hero2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
