import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta = {
  title: 'Input/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Controls whether the checkbox is checked',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    name: {
      description: 'Name attribute for the checkbox input',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback fired when the checkbox state changes',
      table: {
        type: { summary: '(value: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      description: 'Whether to display the checkbox in error state',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Error: Story = {
  args: {
    checked: false,
    error: true,
  },
}
