import type { Meta, StoryObj } from '@storybook/react'

import { ArrowButton } from './Button'
import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.style'

const meta = {
  title: 'Components/ArrowButton',
  component: ArrowButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Add a label to the button',
      control: { type: 'string' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      description: 'Size of the button',
      options: BUTTON_SIZES,
      control: { type: 'radio' },
    },
    variant: {
      description: 'Visual style variant of the button',
      options: BUTTON_VARIANTS,
      control: { type: 'radio' },
    },
    uppercase: {
      description: 'If label for the button is uppercase',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    to: {
      description: 'Link for the button',
      control: { type: 'string' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    onClick: {
      description: 'OnClick action for the button',
      control: { type: 'function' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof ArrowButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const PrimaryLabel: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
    color: 'black',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const SecondaryLabel: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
    color: 'black',
  },
}

export const PrimaryContrast: Story = {
  args: {
    variant: 'primaryContrast',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const SecondaryContrast: Story = {
  args: {
    variant: 'secondaryContrast',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
