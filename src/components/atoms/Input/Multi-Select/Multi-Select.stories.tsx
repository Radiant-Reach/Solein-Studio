import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { MultiSelect, Option } from './Multi-Select'

const categoryOptions: Option[] = [
  { id: 'electronics', value: 'Electronics' },
  { id: 'clothing', value: 'Clothing' },
  { id: 'books', value: 'Books' },
  { id: 'home', value: 'Home & Garden' },
  { id: 'sports', value: 'Sports' },
  { id: 'toys', value: 'Toys' },
]

const tagsOptions: Option[] = [
  { id: '1', value: '1' },
  { id: '2', value: '2' },
  { id: '3', value: '3' },
  { id: '4', value: '4' },
  { id: '5', value: '5' },
]

const meta = {
  title: 'Input/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: {
    label: 'Select Categories',
    size: 'medium',
    options: categoryOptions,
    selectedItemId: ['electronics', 'books'],
  },
  decorators: [
    (Story: StoryFn) => {
      const [args, updateArgs] = useArgs()

      const handleChange = (option: Option) => {
        action('onChange')(option)

        const currentSelected = args.selectedItemId || []
        let newSelected: string[]

        if (currentSelected.includes(option.id)) {
          newSelected = currentSelected.filter((id: string) => id !== option.id)
        } else {
          newSelected = [...currentSelected, option.id]
        }

        updateArgs({ selectedItemId: newSelected })
      }

      return (
        <Story
          args={{
            ...args,
            onChange: handleChange,
          }}
        />
      )
    },
  ],
  argTypes: {
    label: {
      description: 'Optional label displayed above the options (supports HTML)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      description: 'Size of the buttons and overall component',
      options: ['small', 'medium'],
      control: { type: 'radio' },
      table: {
        type: { summary: "'small' | 'medium'" },
        defaultValue: { summary: 'medium' },
      },
    },
    options: {
      description: 'Array of options to display',
      control: { type: 'object' },
      table: {
        type: { summary: 'Option[]' },
      },
    },
    selectedItemId: {
      description: 'Array of selected option IDs',
      control: { type: 'object' },
      table: {
        type: { summary: 'string[]' },
      },
    },
    onChange: {
      description: 'Callback fired when an option is clicked',
      table: {
        type: { summary: '(option: Option) => void' },
      },
    },
  },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive multi-select component. Click buttons to toggle selection or update selectedItemId in Controls.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    label: 'Small Size Selection',
    size: 'small',
    options: tagsOptions,
    selectedItemId: ['urgent', 'bug'],
  },
}
