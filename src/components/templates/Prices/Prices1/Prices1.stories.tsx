import type { Meta, StoryObj } from '@storybook/react'
import { Prices1 } from './Prices1'

const meta = {
  title: 'Templates/Prices/Prices1',
  component: Prices1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Pricing table with eyebrow, title, and grouped price rows showing service name, duration, and cost.',
      },
    },
  },
} satisfies Meta<typeof Prices1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
