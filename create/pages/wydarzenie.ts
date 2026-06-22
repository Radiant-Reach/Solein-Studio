import type { CreatePagesArgs } from 'gatsby'
import path from 'path'

import type { SlugNode } from './index'

type CreateWydarzeniePages = (
  args: Pick<CreatePagesArgs, 'actions'> & { wydarzenia: SlugNode[] }
) => void

export const createWydarzeniePages: CreateWydarzeniePages = ({
  actions,
  wydarzenia,
}) => {
  const { createPage } = actions

  wydarzenia.forEach((node) => {
    if (!node.slug) return

    createPage({
      path: `/wydarzenia/${node.slug}`,
      component: path.resolve('./src/templates/Wydarzenie.tsx'),
      context: {
        slug: node.slug,
      },
    })
  })
}
