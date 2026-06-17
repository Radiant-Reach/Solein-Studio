import type { Meta, StoryObj } from '@storybook/react'
import { TextBlock2 } from './TextBlock2'

const meta = {
  title: 'Templates/TextBlock/TextBlock2',
  component: TextBlock2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text block with image on the right: eyebrow, title, paragraphs, and a CTA button on the left.',
      },
    },
  },
} satisfies Meta<typeof TextBlock2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
