import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// https://jotai.org/docs/core/atom
export const boolAtom = atom<boolean>(false)
// https://jotai.org/docs/utilities/storage
export const favoritesAtom = atomWithStorage<string[]>('favorites', [])

export const store = createStore()
