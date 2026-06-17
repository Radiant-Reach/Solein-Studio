import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { Decorator, Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Field } from './Field'

const meta = {
  title: 'Input/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
    value: '',
  },
  decorators: [
    ((Story, context) => {
      const [args, updateArgs] = useArgs()

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        action('onChange')(e)
        updateArgs({ value: e.target.value })
      }

      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        action('onBlur')(e)
      }

      const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        action('onFocus')(e)
      }

      return (
        <Story
          args={{
            ...args,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus,
          }}
        />
      )
    }) as Decorator<typeof Field>,
  ],
  argTypes: {
    errorMessage: {
      description:
        'Error message to display below the input. When provided, input shows error styling.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    placeholder: {
      description: 'Placeholder text for the input',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'Current value of the input (for controlled component)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Disables the input field',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      description: 'Input type (text, email, password, etc.)',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    icon: {
      description: 'Optional icon to display inside the input',
      control: { type: 'text' },
      table: {
        type: { summary: 'IconAsSVG' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      description: 'Callback fired when the input value changes',
      table: {
        type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onBlur: {
      description: 'Callback fired when the input loses focus',
      table: {
        type: { summary: '(e: React.FocusEvent<HTMLInputElement>) => void' },
      },
    },
    onFocus: {
      description: 'Callback fired when the input gains focus',
      table: {
        type: { summary: '(e: React.FocusEvent<HTMLInputElement>) => void' },
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic field without error message. Type in the input to see live updates.',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    errorMessage: 'This field is required',
    placeholder: 'Required field',
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Field with error message. The input shows error styling (red border) and displays the error message below.',
      },
    },
  },
}

export const ValidationError: Story = {
  args: {
    errorMessage: 'Please enter a valid email address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    type: 'email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email field with validation error showing invalid input.',
      },
    },
  },
}

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: 'search', // Replace with actual IconAsSVG value
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with an icon. The error state also works with icons.',
      },
    },
  },
}

export const WithIconAndError: Story = {
  args: {
    errorMessage: 'Search term must be at least 3 characters',
    placeholder: 'Search...',
    icon: 'search', // Replace with actual IconAsSVG value
    value: 'ab',
  },
  parameters: {
    docs: {
      description: {
        story: 'Field combining icon and error message functionality.',
      },
    },
  },
}

export const PasswordField: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    icon: 'lock', // Replace with actual IconAsSVG value
    errorMessage: 'Password must be at least 8 characters long',
    value: '123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Password field with validation error.',
      },
    },
  },
}

export const DisabledField: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled field',
    value: 'Cannot edit this',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled field state.',
      },
    },
  },
}

export const DisabledWithError: Story = {
  args: {
    disabled: true,
    errorMessage: 'This field has an error but is disabled',
    placeholder: 'Disabled field with error',
    value: 'Disabled value',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: disabled field that also has an error message.',
      },
    },
  },
}
