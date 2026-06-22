import type { CreatePagesArgs } from 'gatsby'
import path from 'path'

import type { SlugNode } from './index'

type CreateSalaPages = (
  args: Pick<CreatePagesArgs, 'actions'> & { salas: SlugNode[] }
) => void

export const createSalaPages: CreateSalaPages = ({ actions, salas }) => {
  const { createPage } = actions

  salas.forEach((node) => {
    if (!node.slug) return

    createPage({
      path: `/nasze-sale/${node.slug}`,
      component: path.resolve('./src/templates/Sala.tsx'),
      context: {
        slug: node.slug,
      },
    })
  })
}
