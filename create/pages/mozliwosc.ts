import type { CreatePagesArgs } from 'gatsby'
import path from 'path'

import type { SlugNode } from './index'

type CreateMozliwoscPages = (
  args: Pick<CreatePagesArgs, 'actions'> & { mozliwosci: SlugNode[] }
) => void

export const createMozliwoscPages: CreateMozliwoscPages = ({
  actions,
  mozliwosci,
}) => {
  const { createPage } = actions

  mozliwosci.forEach((node) => {
    if (!node.slug) return

    createPage({
      path: `/wydarzenia/${node.slug}`,
      component: path.resolve('./src/templates/Mozliwosc.tsx'),
      context: {
        slug: node.slug,
      },
    })
  })
}
