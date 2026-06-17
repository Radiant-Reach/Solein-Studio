import type { Meta, StoryObj } from '@storybook/react'

import {
  B100,
  B200,
  B300,
  B400,
  B500,
  BodyBig,
  BodyMedium,
  BodySmall,
  Color,
  H100,
  H200,
  H300,
  H400,
  H500,
  H600,
  H700,
  H800,
  H900,
  H1000,
  Text,
  Weight,
} from './Typography'

const meta = {
  title: 'Design System/Typography',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    $base: {
      description: 'Base typography style (CSS template literal)',
      control: { type: 'select' },
      options: [
        'BodySmall',
        'BodyMedium',
        'BodyBig',
        'B100',
        'B200',
        'B300',
        'B400',
        'B500',
        'H100',
        'H200',
        'H300',
        'H400',
        'H500',
        'H600',
        'H700',
        'H800',
        'H900',
        'H1000',
      ],
      table: {
        type: { summary: 'ReturnType<typeof css>' },
      },
    },
    $color: {
      description:
        'Text color from theme or inherit (supports responsive breakpoints)',
      control: { type: 'text' },
      table: {
        type: { summary: 'BreakpointValue<ThemeColor | "inherit">' },
        defaultValue: { summary: 'black' },
      },
    },
    $align: {
      description: 'Text alignment (supports responsive breakpoints)',
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      table: {
        type: { summary: 'BreakpointValue<CSSProperties["textAlign"]>' },
        defaultValue: { summary: 'left' },
      },
    },
    $transform: {
      description: 'Text transformation',
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      table: {
        type: { summary: 'CSSProperties["textTransform"]' },
        defaultValue: { summary: 'none' },
      },
    },
    $cursor: {
      description: 'Cursor style',
      control: { type: 'select' },
      options: ['inherit', 'pointer', 'default', 'text'],
      table: {
        type: { summary: 'CSSProperties["cursor"]' },
        defaultValue: { summary: 'inherit' },
      },
    },
    $lineLimit: {
      description: 'Limit number of lines that are displayed',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'none' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible Text component with responsive typography styles, colors, and formatting options.',
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const AllTypographyScales: Story = {
  render: () => (
    <div>
      <Text $base={BodySmall}>Body Small</Text>
      <Text $base={BodyMedium}>Body Medium</Text>
      <Text $base={BodyBig}>Body Big</Text>
      <Text $base={B100}>B100</Text>
      <Text $base={B200}>B200</Text>
      <Text $base={B300}>B300</Text>
      <Text $base={B400}>B400</Text>
      <Text $base={B500}>B500</Text>
      <Text $base={H100}>H100</Text>
      <Text $base={H200}>H200</Text>
      <Text $base={H300}>H300</Text>
      <Text $base={H400}>H400</Text>
      <Text $base={H500}>H500</Text>
      <Text $base={H600}>H600</Text>
      <Text $base={H700}>H700</Text>
      <Text $base={H800}>H800</Text>
      <Text $base={H900}>H900</Text>
      <Text $base={H1000}>H1000</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of all available typography scales in the design system.',
      },
    },
  },
}

export const ColorVariations: Story = {
  render: () => (
    <Text $base={BodyMedium} $color="primary50">
      primary50
    </Text>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component with changed color theme.',
      },
    },
  },
}

export const TextAlignment: Story = {
  render: () => (
    <div>
      <Text $base={BodyMedium} $align="left">
        Left aligned text
      </Text>
      <Text $base={BodyMedium} $align="center">
        Center aligned text
      </Text>
      <Text $base={BodyMedium} $align="right">
        Right aligned text
      </Text>
      <Text $base={BodyMedium} $align="justify">
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different text alignment options.',
      },
    },
  },
}

export const TextTransforms: Story = {
  render: () => (
    <div>
      <Text $base={BodyMedium} $transform="none">
        Normal text transformation
      </Text>
      <Text $base={BodyMedium} $transform="uppercase">
        UPPERCASE TEXT TRANSFORMATION
      </Text>
      <Text $base={BodyMedium} $transform="lowercase">
        lowercase text transformation
      </Text>
      <Text $base={BodyMedium} $transform="capitalize">
        Capitalize Text Transformation
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different text transformation options.',
      },
    },
  },
}

export const LineLimitText: Story = {
  render: () => (
    <div>
      <Text $base={BodyMedium}>
        No line limit: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </Text>
      <br />
      <br />
      <Text $base={BodyMedium} $lineLimit={1}>
        1 line limit: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </Text>
    </div>
  ),
}

export const ResponsiveText: Story = {
  render: () => (
    <div>
      <Text
        $base={H400}
        $lg={H600}
        $color={{ base: 'black', md: 'primary50' }}
        $align={{ base: 'center', lg: 'left' }}
      >
        Responsive heading that changes size, color, and alignment
      </Text>
    </div>
  ),
}

export const InlineHelpers: Story = {
  render: () => (
    <div>
      <Text $base={BodyMedium}>
        This is normal text with <Weight $weight="bold">bold weight</Weight> and
        <Color $color="primary50">colored text</Color> inline.
      </Text>
      <Text $base={BodyMedium}>
        You can combine
        <Weight $weight="700">
          <Color $color="danger">both helpers</Color>
        </Weight>
        for <Weight $weight="600">different effects</Weight>.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Using Weight and Color helper components for inline text styling.',
      },
    },
  },
}

export const InteractiveText: Story = {
  render: () => (
    <div>
      <Text $base={BodyMedium} $cursor="pointer">
        Clickable text with pointer cursor
      </Text>
      <Text $base={BodyMedium} $cursor="default">
        Text with default cursor
      </Text>
      <Text $base={BodyMedium}>Regular text with inherit cursor</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text with different cursor styles for interactive elements.',
      },
    },
  },
}
