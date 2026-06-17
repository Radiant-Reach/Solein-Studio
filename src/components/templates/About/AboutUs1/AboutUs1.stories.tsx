import type { Meta, StoryObj } from '@storybook/react'
import { AboutUs1 } from './AboutUs1'

const meta = {
  title: 'Templates/About/AboutUs1',
  component: AboutUs1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'About section with optional background image, eyebrow, title, paragraphs, a bulleted list, a CTA button, and a side image.',
      },
    },
  },
} satisfies Meta<typeof AboutUs1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
