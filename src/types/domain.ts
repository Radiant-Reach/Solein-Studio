// Paste there all domain types like Investment, User, Flat types etc.

export type NavLinkItem = {
  id: string
  name: string
  path: string
}

export type NavDropdownItem = {
  id: string
  name: string
  path?: string
  children: NavLinkItem[]
}

export type NavEntry = NavLinkItem | NavDropdownItem
