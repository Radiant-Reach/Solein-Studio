import type { Meta, StoryObj } from '@storybook/react'
import { Nav2 } from './Nav2'

const meta = {
  title: 'Templates/Nav/Nav2',
  component: Nav2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navigation bar with logo, dropdown links, a phone button, a primary CTA button, and a mobile hamburger menu.',
      },
    },
  },
} satisfies Meta<typeof Nav2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPhone: Story = {
  args: {
    phoneHref: 'tel:+48123456789',
    phoneLabel: '+48 123 456 789',
  },
}
