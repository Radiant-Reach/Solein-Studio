import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { MultiSelect } from '../Multi-Select'
import { CustomField as CustomFieldComponent, ErrorText } from './Field'

const meta = {
  title: 'Input/CustomField',
  component: CustomFieldComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'CustomField is a flexible wrapper that can contain any children with optional error message display.',
      },
    },
  },
} satisfies Meta<typeof CustomFieldComponent>

export default meta
type CustomFieldStory = StoryObj<typeof meta>

export const CustomField: CustomFieldStory = {
  render: (args: React.ComponentProps<typeof CustomFieldComponent>) => (
    <CustomFieldComponent {...args}>
      <MultiSelect
        label="Select Categories"
        size="medium"
        options={[
          { id: 'electronics', value: 'Electronics' },
          { id: 'clothing', value: 'Clothing' },
          { id: 'books', value: 'Books' },
          { id: 'home', value: 'Home & Garden' },
          { id: 'sports', value: 'Sports' },
          { id: 'toys', value: 'Toys' },
        ]}
        selectedItemId={['electronics', 'books']}
        onChange={() => {}}
      />
    </CustomFieldComponent>
  ),
}

export const WithError: CustomFieldStory = {
  args: {
    errorMessage: 'Custom field error message',
  },
  render: (args: React.ComponentProps<typeof CustomFieldComponent>) => (
    <CustomFieldComponent {...args}>
      <MultiSelect
        label="Select Categories"
        size="medium"
        options={[
          { id: 'electronics', value: 'Electronics' },
          { id: 'clothing', value: 'Clothing' },
          { id: 'books', value: 'Books' },
          { id: 'home', value: 'Home & Garden' },
          { id: 'sports', value: 'Sports' },
          { id: 'toys', value: 'Toys' },
        ]}
        selectedItemId={['electronics', 'books']}
        onChange={() => {}}
      />
    </CustomFieldComponent>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CustomField displaying an error message along with the child component.',
      },
    },
  },
}

// Standalone ErrorText component story
export const ErrorTextComponent: CustomFieldStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ErrorText>This is a standalone error message</ErrorText>
      <ErrorText>You can use ErrorText independently anywhere</ErrorText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ErrorText component can be used standalone for displaying error messages.',
      },
    },
  },
}
