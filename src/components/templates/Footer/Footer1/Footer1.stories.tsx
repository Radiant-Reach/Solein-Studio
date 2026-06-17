import type { Meta, StoryObj } from '@storybook/react'
import { Footer1 } from './Footer1'

const meta = {
  title: 'Templates/Footer/Footer1',
  component: Footer1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-column footer with service links, location links, salon info with social icons, opening hours, and a copyright bar.',
      },
    },
  },
} satisfies Meta<typeof Footer1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAddress: Story = {
  args: {
    address: '15-001 Białystok, ul. Przykładowa 1',
  },
}
