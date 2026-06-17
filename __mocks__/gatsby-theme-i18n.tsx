import React from 'react'

interface LocalizedLinkProps {
  to?: string
  children?: React.ReactNode
  language?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

interface LocalizationConfig {
  defaultLocale: string
  locales: string[]
}

interface UseLocalizationReturn {
  locale: string
  defaultLocale: string
  localizedPath: (path: string) => string
  config: LocalizationConfig
}

// Mock LocalizedLink from gatsby-theme-i18n
const LocalizedLink = React.forwardRef<HTMLElement, LocalizedLinkProps>(
  ({ to, children, language, ...props }, ref) => {
    // For Storybook, we'll render as a div or button depending on whether onClick is present
    const Component = props.onClick ? 'div' : 'a'

    // Handle localized paths - in Storybook, we'll just use the path as-is
    const localizedTo = language && to ? `/${language}${to}` : to

    const linkProps = {
      ...props,
      ref,
      ...(Component === 'a' && localizedTo ? { href: localizedTo } : {}),
      style: {
        cursor: 'pointer',
        textDecoration: 'none',
        ...props.style,
      },
    }

    return React.createElement(Component, linkProps, children)
  }
)

LocalizedLink.displayName = 'MockedLocalizedLink'

// Mock useLocalization hook
const useLocalization = (): UseLocalizationReturn => ({
  locale: 'en',
  defaultLocale: 'en',
  localizedPath: (path: string) => path,
  config: {
    defaultLocale: 'en',
    locales: ['en'],
  },
})

// Mock LocalizedRouter
const LocalizedRouter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => React.createElement(React.Fragment, null, children)

export { LocalizedLink, useLocalization, LocalizedRouter }
