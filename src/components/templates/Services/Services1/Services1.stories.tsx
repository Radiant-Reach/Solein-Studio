import type { Meta, StoryObj } from '@storybook/react'
import { Services1 } from './Services1'

const meta = {
  title: 'Templates/Services/Services1',
  component: Services1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Service card grid with eyebrow, title, and staggered-animated cards each containing an image, title, and optional description.',
      },
    },
  },
} satisfies Meta<typeof Services1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
