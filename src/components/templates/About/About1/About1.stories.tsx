import type { Meta, StoryObj } from '@storybook/react'
import { About1 } from './About1'

const meta = {
  title: 'Templates/About/About1',
  component: About1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'About section with eyebrow, title, paragraphs, a bulleted list of highlights, and a stats grid.',
      },
    },
  },
} satisfies Meta<typeof About1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
