import type { Meta, StoryObj } from '@storybook/react'
import { TextBlock1 } from './TextBlock1'

const meta = {
  title: 'Templates/TextBlock/TextBlock1',
  component: TextBlock1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text block with image on the left: eyebrow, title, paragraphs, and a CTA button on the right.',
      },
    },
  },
} satisfies Meta<typeof TextBlock1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
