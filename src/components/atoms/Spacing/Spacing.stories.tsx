import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { Grid, GridItem } from './Spacing'

const StyledGridItem = styled(GridItem)`
  width: 100%;
  min-height: 80px;
  height: 100%;

  box-sizing: border-box;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 8px;

  font-weight: bold;
  color: #1976d2;
`

const ColoredGridItem = styled(GridItem)<{ $color?: string }>`
  min-height: 80px;
  height: 100%;

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $color = '#f5f5f5' }) => $color};
  border: 2px solid #ddd;
  border-radius: 8px;

  font-weight: bold;
  color: #333;
`

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    $gap: {
      description: 'Gap between grid items (supports responsive breakpoints)',
      control: { type: 'text' },
      table: {
        type: { summary: 'BreakpointValue<CSSProperties["gap"]>' },
        defaultValue: { summary: '{}' },
      },
    },
    $columns: {
      description: 'Number of columns (supports responsive breakpoints)',
      control: { type: 'number' },
      table: {
        type: { summary: 'BreakpointValue<number>' },
        defaultValue: { summary: '{}' },
      },
    },
    $rows: {
      description: 'Number of rows (supports responsive breakpoints)',
      control: { type: 'number' },
      table: {
        type: { summary: 'BreakpointValue<number>' },
        defaultValue: { summary: '{}' },
      },
    },
    $align: {
      description:
        'Align items within grid cells (supports responsive breakpoints)',
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch'],
      table: {
        type: { summary: 'BreakpointValue<CSSProperties["alignItems"]>' },
        defaultValue: { summary: '{}' },
      },
    },
    $justify: {
      description:
        'Justify items within grid cells (supports responsive breakpoints)',
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'stretch'],
      table: {
        type: { summary: 'BreakpointValue<CSSProperties["justifyContent"]>' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A responsive CSS Grid component with breakpoint support. Use with GridItem for spanning multiple columns/rows.',
      },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const BasicGrid: Story = {
  args: {
    $columns: 3,
    $gap: '1rem',
  },
  render: (args) => (
    <Grid {...args}>
      <StyledGridItem>1</StyledGridItem>
      <StyledGridItem>2</StyledGridItem>
      <StyledGridItem>3</StyledGridItem>
      <StyledGridItem>4</StyledGridItem>
      <StyledGridItem>5</StyledGridItem>
      <StyledGridItem>6</StyledGridItem>
    </Grid>
  ),
}

export const ResponsiveGrid: Story = {
  args: {
    $columns: { base: 1, md: 2, lg: 4 },
    $gap: { base: '0.5rem', md: '1rem' },
    $align: 'center',
    $justify: 'center',
  },
  render: (args) => (
    <Grid {...args}>
      <StyledGridItem>Responsive</StyledGridItem>
      <StyledGridItem>Grid</StyledGridItem>
      <StyledGridItem>Layout</StyledGridItem>
      <StyledGridItem>Demo</StyledGridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grid that changes from 1 on base, 2 on md, and to 4 columns on lg screens.',
      },
    },
  },
}

export const ComplexLayout: Story = {
  render: () => (
    <Grid
      $columns={{ base: 2, lg: 3 }}
      $align="center"
      $justify="center"
      $gap={{ base: '1rem 0.5rem', lg: '1rem' }}
    >
      <StyledGridItem $columns={{ base: 1, lg: 2 }}>
        Spans 2 columns on large screens
      </StyledGridItem>
      <StyledGridItem $rows={{ base: 1, lg: 2 }}>
        Spans 2 rows on large screens
      </StyledGridItem>
      <StyledGridItem>Item 3</StyledGridItem>
      <StyledGridItem>Item 4</StyledGridItem>
      <StyledGridItem>Item 5</StyledGridItem>
      <StyledGridItem $rows={{ base: 1, lg: 2 }} $columns={{ base: 1, lg: 2 }}>
        Spans 2x2 on large screens
      </StyledGridItem>
      <StyledGridItem>Item 7</StyledGridItem>
      <StyledGridItem>Item 8</StyledGridItem>
      <StyledGridItem>Item 9</StyledGridItem>
      <StyledGridItem>Item 10</StyledGridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complex responsive layout with items spanning multiple columns and rows.',
      },
    },
  },
}

export const GapVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>No Gap</h3>
        <Grid $columns={4} $gap="0">
          <StyledGridItem>1</StyledGridItem>
          <StyledGridItem>2</StyledGridItem>
          <StyledGridItem>3</StyledGridItem>
          <StyledGridItem>4</StyledGridItem>
        </Grid>
      </div>

      <div>
        <h3>Small Gap (0.5rem)</h3>
        <Grid $columns={4} $gap="0.5rem">
          <StyledGridItem>1</StyledGridItem>
          <StyledGridItem>2</StyledGridItem>
          <StyledGridItem>3</StyledGridItem>
          <StyledGridItem>4</StyledGridItem>
        </Grid>
      </div>

      <div>
        <h3>Large Gap (2rem)</h3>
        <Grid $columns={4} $gap="2rem">
          <StyledGridItem>1</StyledGridItem>
          <StyledGridItem>2</StyledGridItem>
          <StyledGridItem>3</StyledGridItem>
          <StyledGridItem>4</StyledGridItem>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different gap values.',
      },
    },
  },
}
