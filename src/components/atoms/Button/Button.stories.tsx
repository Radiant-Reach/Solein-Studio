import type { Meta, StoryObj } from '@storybook/react'

import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from './Button.style'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    $variant: {
      description: 'Visual style variant of the button',
      options: BUTTON_VARIANTS,
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: DEFAULT_BUTTON_VARIANT },
      },
    },
    $fullWidth: {
      description: 'Makes the button take up the full width of its container',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    $iconOnly: {
      description: 'Use when button only has an icon as children',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    $size: {
      description: 'Size of the button',
      options: BUTTON_SIZES,
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: DEFAULT_BUTTON_SIZE },
      },
    },
    $loading: {
      description: 'Shows a loading state with spinner or loading indicator',
      default: false,
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    $arrowIcon: {
      description: 'Used for Button with arrow (its smaller then iconOnly)',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    $active: {
      description: 'Applies active styling to the button',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    $variant: 'secondary',
  },
}

export const PrimaryContrast: Story = {
  args: {
    $variant: 'primaryContrast',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const SecondaryContrast: Story = {
  args: {
    $variant: 'secondaryContrast',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
