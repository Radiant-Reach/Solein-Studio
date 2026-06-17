import type { Meta, StoryObj } from '@storybook/react'
import { CTA2 } from './CTA2'

const meta = {
  title: 'Templates/CTA/CTA2',
  component: CTA2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Minimal call-to-action section with title, description, and a CTA button — no image.',
      },
    },
  },
} satisfies Meta<typeof CTA2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
