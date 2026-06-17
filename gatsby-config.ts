import dotenv from 'dotenv'
import fs from 'fs'
import { GatsbyConfig } from 'gatsby'
import netlifyAdapter from 'gatsby-adapter-netlify'
import path from 'path'

import { ENV } from './src/env'

dotenv.config({
  path: `.env.${
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
  }`,
})

const env = process.env as unknown as ENV

const I18N_NAMESPACES: string[] = []
fs.readdirSync('./src/translation/locales/pl').forEach((file: string) => {
  I18N_NAMESPACES.push(file.replace(/\.[^.]*$/, ''))
})

const GATSBY_REQUIRED_RULES: string = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules'
)

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:8000`
    : 'https://www.example.com' // TODO: Change url

const OMIT_PATHS = ['/404', '/preview']

const config: GatsbyConfig = {
  // ========================================
  // SITE METADATA
  // ========================================
  siteMetadata: {
    title: `Gatsby Starter`,
    description: `Starter Description`,
    author: `Radiant Reach`,
    siteUrl: SITE_URL,
  },

  // ========================================
  // BUILD CONFIGURATION
  // ========================================
  graphqlTypegen: true,
  adapter: netlifyAdapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),

  plugins: [
    // ========================================
    // INTERNATIONALIZATION
    // ========================================
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `pl`,
        locales: `pl en`,
        configPath: path.resolve(`${__dirname}/src/translation/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./src/translation/locales`,
        i18nextOptions: {
          supportedLngs: ['pl', 'en'],
          ns: I18N_NAMESPACES,
        },
      },
    },

    // ========================================
    // SEO & META
    // ========================================
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#da9500`,
        theme_color: `#da9500`,
        display: `minimal-ui`,
        icon: `src/assets/icons/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        query: `
        {
          allSitePage {
            nodes {
              path
              component
              context: pageContext
            }
          }
        }
      `,
        resolveSiteUrl: () => SITE_URL,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: {
            nodes: {
              path: string
              component: string
              context: any
            }[]
          }
        }) => {
          return allPages
            .filter(
              (page) =>
                !OMIT_PATHS.includes(page.path) &&
                !page.path.startsWith('/en') &&
                !page.context.isFlatPage
            )
            .map((el) => {
              const isStatic = el.component.includes('pages')
              let priority = 0.64
              if (el.path === '/') priority = 1
              if (isStatic) priority = 0.8
              return {
                ...el,
                priority: priority,
              }
            })
            .sort((a, b) => b.priority - a.priority)
        },
        serialize: ({ path, priority }: { path: string; priority: number }) => {
          return {
            url: SITE_URL + path,
            priority,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        sitemap: `${SITE_URL}/sitemap-0.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: OMIT_PATHS,
          },
        ],
      },
    },

    // ========================================
    // DATA SOURCES
    // ========================================
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${env.WORDPRESS_URL}/graphql`,
        html: {
          useGatsbyImage: true,
          generateWebpImages: true,
          imageQuality: 60,
        },
        schema: {
          perPage: 9,
          requestConcurrency: 3,
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            excludeFieldNames: [
              `dateGmt`,
              `date`,
              `parent`,
              `ancestors`,
              `comments`,
              `author`,
              `authorDatabaseId`,
              `authorId`,
              `commentCount`,
              `commentStatus`,
              `enclosure`,
              `desiredSlug`,
              `modified`,
              `modifiedGmt`,
              `parentId`,
              `parentDatabaseId`,
            ],
            localFile: {
              requestConcurrency: 5,
            },
          },
        },
        debug: {
          disableCompatibilityCheck: true,
        },
        develop: {
          nodeUpdateInterval: 10000,
        },
      },
    },

    // ========================================
    // STYLING & UI
    // ========================================
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV === 'development',
      },
    },

    // ========================================
    // IMAGE PROCESSING
    // ========================================
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 60,
          breakpoints: [420, 750, 1080, 1920],
          backgroundColor: `transparent`,
          webpOptions: { lossless: true, force: false },
          jpgOptions: { mozjpeg: true, force: false },
          pngOptions: {
            compressionLevel: 8,
            force: false,
          },
        },
      },
    },

    // ========================================
    // DEVELOPMENT & BUILD TOOLS
    // ========================================
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [GATSBY_REQUIRED_RULES],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public'],
        stages: ['develop'],
        emitWarning: true,
        failOnError: true, // If we just want warnings instead of linting errors, set to false
      },
    },
    {
      resolve: 'gatsby-plugin-no-sourcemaps',
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        dimensions: false,
      },
    },

    // ========================================
    // USER EXPERIENCE
    // ========================================
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#da9500`,
        minimum: 0.01,
        showSpinner: false,
      },
    },
  ],
}

export default config
