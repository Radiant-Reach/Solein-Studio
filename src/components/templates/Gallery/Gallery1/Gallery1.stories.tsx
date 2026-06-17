import type { Meta, StoryObj } from '@storybook/react'
import { Gallery1 } from './Gallery1'

const meta = {
  title: 'Templates/Gallery/Gallery1',
  component: Gallery1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabbed photo gallery with a lightbox, keyboard navigation, and an auto-play carousel for portfolio and interior images.',
      },
    },
  },
} satisfies Meta<typeof Gallery1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
