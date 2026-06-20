import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// https://jotai.org/docs/core/atom
export const boolAtom = atom<boolean>(false)
// https://jotai.org/docs/utilities/storage
export const favoritesAtom = atomWithStorage<string[]>('favorites', [])

export const scrollLockAtom = atom<boolean>(false)
export const mobileMenuOpenAtom = atom<boolean>(false)

export const store = createStore()
