import type { Meta, StoryObj } from '@storybook/react'
import { About2 } from './About2'

const meta = {
  title: 'Templates/About/About2',
  component: About2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Image-focused about section with an eyebrow, title, description text, and feature cards on the right.',
      },
    },
  },
} satisfies Meta<typeof About2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
