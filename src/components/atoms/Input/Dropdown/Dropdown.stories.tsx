import type { Meta, StoryObj } from '@storybook/react'

import { DropDown } from './Dropdown'

const meta = {
  title: 'Input/DropDown',
  component: DropDown,
  tags: ['autodocs'],
  argTypes: {
    heading: {
      description: 'Heading text displayed above the dropdown (supports HTML)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    options: {
      description: 'Array of options to display in the dropdown',
      control: { type: 'object' },
      table: {
        type: { summary: 'any[]' },
      },
    },
    selectedOptions: {
      description: 'Array of currently selected options',
      control: { type: 'object' },
      table: {
        type: { summary: 'any[]' },
      },
    },
    onChange: {
      description: 'Callback fired when the selection changes',
      table: {
        type: { summary: '(values: any[]) => void' },
      },
    },
    defaultText: {
      description: 'Text to display when no specific selection is made',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Wybierz'" },
      },
    },
  },
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    heading: 'Select Years',
    options: [2020, 2021, 2022, 2023, 2024],
    selectedOptions: [2022, 2024],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown with numeric options to demonstrate flexibility with different data types.',
      },
    },
  },
}

export const AllSelected: Story = {
  args: {
    heading: 'Select Years',
    options: [2020, 2021, 2022, 2023, 2024],
    selectedOptions: [2020, 2021, 2022, 2023, 2024],
    defaultText: 'Select Years',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When all options are selected, the dropdown shows the default text.',
      },
    },
  },
}
