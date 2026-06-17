import type { Meta, StoryObj } from '@storybook/react'

import { CONTAINER_SIZES_MAP, Container } from './Container.style'

const CONTAINER_VARIANTS = Object.keys(CONTAINER_SIZES_MAP) as Array<
  keyof typeof CONTAINER_SIZES_MAP
>

const SampleContent = () => (
  <div
    style={{
      backgroundColor: '#f0f0f0',
      padding: '2rem',
      border: '2px dashed #ccc',
      textAlign: 'center',
    }}
  >
    Container Content - resize window to see responsive behavior
    <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
      This shows the container boundaries and max-width constraints
    </div>
  </div>
)

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  args: {
    children: <SampleContent />,
  },
  argTypes: {
    $variant: {
      description: 'Container width variant',
      options: CONTAINER_VARIANTS,
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
    $fullHeight: {
      description: 'Makes the container take full viewport height',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const FullHeight: Story = {
  args: {
    $fullHeight: true,
    children: (
      <div
        style={{
          backgroundColor: '#f0f0f0',
          height: '100%',
          padding: '2rem',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Full height container - fills viewport height
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {CONTAINER_VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 style={{ margin: '0 0 1rem 0' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} (
            {CONTAINER_SIZES_MAP[variant] === 'initial'
              ? 'no limit'
              : CONTAINER_SIZES_MAP[variant]}
            )
          </h3>
          <Container $variant={variant}>
            <SampleContent />
          </Container>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}
