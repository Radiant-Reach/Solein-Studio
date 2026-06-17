import type { Meta, StoryObj } from '@storybook/react'
import { Testimonials1 } from './Testimonials1'

const meta = {
  title: 'Templates/Testimonials/Testimonials1',
  component: Testimonials1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Testimonials carousel with drag/swipe support, autoplay, responsive per-page count (1/2/3), dot navigation, and star icons.',
      },
    },
  },
} satisfies Meta<typeof Testimonials1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoAutoplay: Story = {
  args: {
    autoplayMs: 0,
  },
}
