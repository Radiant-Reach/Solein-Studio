import React from 'react'

interface LinkProps {
  to?: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

// Mock Gatsby Link component for Storybook
const Link = React.forwardRef<HTMLElement, LinkProps>(
  ({ to, children, ...props }, ref) => {
    // For Storybook, we'll render as a div or button depending on whether onClick is present
    const Component = props.onClick ? 'div' : 'a'

    const linkProps = {
      ...props,
      ref,
      ...(Component === 'a' && to ? { href: to } : {}),
      style: {
        cursor: 'pointer',
        textDecoration: 'none',
        ...props.style,
      },
    }

    return React.createElement(Component, linkProps, children)
  }
)

Link.displayName = 'MockedGatsbyLink'

// Mock other Gatsby exports that might be used
const navigate = (to: string) => {
  console.log(`Storybook: Navigate to ${to}`)
}

const graphql = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? values[i] : ''
    return result + string + value
  }, '')
}

const useStaticQuery = () => ({})

const StaticQuery = ({
  render,
  query,
}: {
  render: (data: any) => React.ReactNode
  query: any
}) => render(useStaticQuery())

export { Link, navigate, graphql, useStaticQuery, StaticQuery }
