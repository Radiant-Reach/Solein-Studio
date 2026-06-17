import type { Meta, StoryObj } from '@storybook/react'
import { FAQ1 } from './FAQ1'

const meta = {
  title: 'Templates/FAQ/FAQ1',
  component: FAQ1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accordion-style FAQ section with eyebrow, title, and a list of togglable question/answer items.',
      },
    },
  },
} satisfies Meta<typeof FAQ1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleItem: Story = {
  args: {
    items: [
      {
        question: 'What services do you offer?',
        answer: 'We offer a wide range of cosmetic and hair services. Visit our services page for a full list.',
      },
    ],
  },
}
