import type { Meta, StoryObj } from '@storybook/react'

import { RangeSelect } from './Range-Select'

const meta = {
  title: 'Input/RangeSelect',
  component: RangeSelect,
  tags: ['autodocs'],
  argTypes: {
    heading: {
      description:
        'Heading text displayed above the range slider (supports HTML)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    minValue: {
      description: 'Minimum value of the range',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    maxValue: {
      description: 'Maximum value of the range',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    value: {
      description:
        'Current selected range values [min, max] (for controlled component)',
      control: { type: 'object' },
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: 'undefined' },
      },
    },
    unit: {
      description: 'Unit symbol to display after the values',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback fired when the range values change',
      table: {
        type: { summary: '(values: number[]) => void' },
      },
    },
    onFinalChange: {
      description:
        'Callback fired when user finishes changing the range (on mouse up)',
      table: {
        type: { summary: '(values: number[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof RangeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const PriceRange: Story = {
  args: {
    heading: 'Select Price',
    minValue: 50,
    maxValue: 5000,
    value: [200, 1500],
    unit: '€',
  },
}

export const Uncontrolled: Story = {
  args: {
    heading: 'Uncontrolled Range (defaults to min/max)',
    minValue: 0,
    maxValue: 100,
    unit: '%',
    value: undefined, // No value prop - will default to [minValue, maxValue]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled range selector without value prop. Values only show in Actions panel.',
      },
    },
  },
}
