import type { Meta, StoryObj } from '@storybook/react'

import { ReactComponent as Close } from 'assets/icons/close.svg'

import { DEFAULT_ICON_SIZE, Icon } from './Icon'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description:
        'Icon source - can be a string URL for regular images or an SVG component',
      control: { type: 'text' },
    },
    size: {
      description: 'Size of the icon in pixels',
      control: { type: 'number' },
      table: {
        defaultValue: { summary: DEFAULT_ICON_SIZE.toString() },
      },
    },
    fill: {
      description: 'Fill color for SVG icons',
      control: { type: 'color' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    stroke: {
      description: 'Stroke color for SVG icons',
      control: { type: 'color' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    inline: {
      description: 'Whether the SVG icon should be inline',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: 'Click handler for the icon',
      control: { type: 'function' },
      action: 'clicked',
    },
    className: {
      description: 'ClassName',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const SVGIcon: Story = {
  args: {
    src: Close,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const SVGIconWithFill: Story = {
  args: {
    src: Close,
    fill: '#007bff',
  },
}

export const SVGIconWithStroke: Story = {
  args: {
    src: Close,
    stroke: '#dc3545',
    fill: 'transparent',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
