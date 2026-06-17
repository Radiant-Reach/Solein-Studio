import type { Meta, StoryObj } from '@storybook/react'
import { Features1 } from './Features1'

const meta = {
  title: 'Templates/Features/Features1',
  component: Features1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Features section with an eyebrow, title, description, icon-based feature cards, a three-image grid, and a CTA button.',
      },
    },
  },
} satisfies Meta<typeof Features1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
