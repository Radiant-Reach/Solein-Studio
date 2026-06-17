import type { Meta, StoryObj } from '@storybook/react'
import { Nav1 } from './Nav1'

const meta = {
  title: 'Templates/Nav/Nav1',
  component: Nav1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navigation bar with logo, links with optional dropdown menus, scroll-state styling, and a mobile hamburger menu.',
      },
    },
  },
} satisfies Meta<typeof Nav1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SimpleLinks: Story = {
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
