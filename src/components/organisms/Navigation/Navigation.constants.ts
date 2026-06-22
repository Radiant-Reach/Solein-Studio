import { LOGO_MARK_SRC } from 'constants/brand'

import slugify from 'utils/slugify'

import { NavLinkItem } from 'types/domain'

export const CENNIK_LINK: NavLinkItem = {
  id: slugify('Cennik'),
  name: 'Cennik',
  path: '/cennik',
}
export const GALERIA_LINK: NavLinkItem = {
  id: slugify('Galeria'),
  name: 'Galeria',
  path: '/galeria',
}

// "Nasze sale" dropdown's children come from the "Sala" CPT (see
// Navigation.tsx's useStaticQuery) — only the dropdown's own id/name/path
// are static here.
export const ROOMS_DROPDOWN_ID = slugify('Nasze sale')
export const ROOMS_DROPDOWN_NAME = 'Nasze sale'
export const ROOMS_DROPDOWN_PATH = '/nasze-sale'

export const RIGHT_LINKS: NavLinkItem[] = [
  { id: slugify('Eventy'), name: 'Eventy', path: '/wydarzenia' },
  { id: slugify('FAQ'), name: 'FAQ', path: '/faq' },
  { id: slugify('Kontakt'), name: 'Kontakt', path: '/kontakt' },
]

export const RESERVATION_LINK: NavLinkItem = {
  id: slugify('Rezerwacja'),
  name: 'Rezerwacja',
  path: '/rezerwacja',
}

export { LOGO_MARK_SRC }
