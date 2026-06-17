import type { Meta, StoryObj } from '@storybook/react'
import { TextBlock3 } from './TextBlock3'

const meta = {
  title: 'Templates/TextBlock/TextBlock3',
  component: TextBlock3,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text-only block with eyebrow, title, paragraphs, and a CTA button — no image.',
      },
    },
  },
} satisfies Meta<typeof TextBlock3>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
