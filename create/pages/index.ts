import type { CreatePagesArgs } from 'gatsby'

import { createLokalizacjaPages } from './lokalizacja'
import { createMozliwoscPages } from './mozliwosc'
import { createSalaPages } from './sala'
import { createWydarzeniePages } from './wydarzenie'

export type SlugNode = {
  slug: string | null
}

type CreateCustomPages = (
  args: Pick<CreatePagesArgs, 'actions'> & {
    data: {
      salas: SlugNode[]
      wydarzenia: SlugNode[]
      lokalizacje: SlugNode[]
      mozliwosci: SlugNode[]
    }
  }
) => void

export const createCustomPages: CreateCustomPages = ({ actions, data }) => {
  createSalaPages({ actions, salas: data.salas })
  createWydarzeniePages({ actions, wydarzenia: data.wydarzenia })
  createLokalizacjaPages({ actions, lokalizacje: data.lokalizacje })
  createMozliwoscPages({ actions, mozliwosci: data.mozliwosci })
}
