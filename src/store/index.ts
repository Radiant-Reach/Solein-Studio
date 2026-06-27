import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// https://jotai.org/docs/core/atom
export const boolAtom = atom<boolean>(false)
// https://jotai.org/docs/utilities/storage
export const favoritesAtom = atomWithStorage<string[]>('favorites', [])

export const scrollLockAtom = atom<boolean>(false)
export const mobileMenuOpenAtom = atom<boolean>(false)

// Lets a page (e.g. the Soleil Collective subpage) recolor the shared
// Navigation to match its own sub-brand palette while it's mounted.
export type NavTheme = 'default' | 'collective'
export const navThemeAtom = atom<NavTheme>('default')

export const store = createStore()
