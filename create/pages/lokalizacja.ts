import type { CreatePagesArgs } from 'gatsby'
import path from 'path'

import type { SlugNode } from './index'

type CreateLokalizacjaPages = (
  args: Pick<CreatePagesArgs, 'actions'> & { lokalizacje: SlugNode[] }
) => void

export const createLokalizacjaPages: CreateLokalizacjaPages = ({
  actions,
  lokalizacje,
}) => {
  const { createPage } = actions

  lokalizacje.forEach((node) => {
    if (!node.slug) return

    createPage({
      path: `/lokacje/${node.slug}`,
      component: path.resolve('./src/templates/Lokalizacja.tsx'),
      context: {
        slug: node.slug,
      },
    })
  })
}
