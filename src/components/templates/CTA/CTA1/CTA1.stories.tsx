import type { Meta, StoryObj } from '@storybook/react'
import { CTA1 } from './CTA1'

const meta = {
  title: 'Templates/CTA/CTA1',
  component: CTA1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Call-to-action section with a side image, eyebrow label, title, description, and a CTA button.',
      },
    },
  },
} satisfies Meta<typeof CTA1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
