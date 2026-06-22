import { GatsbyNode } from 'gatsby'

import { createCustomPages } from './create/pages'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require('path')

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const graph = await graphql<Queries.GatsbyNodeQuery>(query)

  if (graph.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const data = {
    salas: graph.data?.allWpSala.nodes ?? [],
    wydarzenia: graph.data?.allWpWydarzenie.nodes ?? [],
    lokalizacje: graph.data?.allWpLokalizacja.nodes ?? [],
    mozliwosci: graph.data?.allWpMozliwosc.nodes ?? [],
  }

  createCustomPages({ actions, data })
}

// CPT-driven pages (Sala, Wydarzenie, Lokalizacja, Mozliwosc) are created
// here via createPages, not as static files under src/pages/ — see
// CLAUDE.md → "ACF & WordPress Content Principles" → "CPT-driven pages use
// gatsby-node.ts, not static files". Only slugs are fetched; each page's
// own data comes from its template's own GraphQL query, parametrized by
// the $slug passed through page context.
const query = `
  query GatsbyNode {
    allWpSala {
      nodes {
        slug
      }
    }
    allWpWydarzenie {
      nodes {
        slug
      }
    }
    allWpLokalizacja {
      nodes {
        slug
      }
    }
    allWpMozliwosc {
      nodes {
        slug
      }
    }
  }
`
