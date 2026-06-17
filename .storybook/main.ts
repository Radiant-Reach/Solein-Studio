import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  babel: async (options) => {
    options.presets = [
      ...options.presets!,
      [
        '@babel/preset-typescript',
        {
          onlyRemoveTypeImports: true,
        },
      ],
    ]
    return options
  },
  webpackFinal: async (config) => {
    // Add support for absolute imports
    config.resolve!.modules = [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ]

    // Mock components for Storybook
    config.resolve!.alias = {
      ...config.resolve!.alias,
      gatsby: path.resolve(__dirname, '../__mocks__/gatsby.tsx'),
      'gatsby-theme-i18n': path.resolve(__dirname, '../__mocks__/gatsby.tsx'),
    }

    // Handle SVG imports as React components
    const fileLoaderRule = config.module?.rules?.find(
      (rule: any) => rule.test && rule.test.test('.svg')
    )

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            namedExport: 'ReactComponent',
            svgrOptions: {
              exportType: 'named',
            },
          },
        },
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    return config
  },
}

export default config
