import { LOGO_MARK_SRC } from 'constants/brand'

import slugify from 'utils/slugify'

import { NavDropdownItem, NavEntry, NavLinkItem } from 'types/domain'

const CENNIK_LINK: NavLinkItem = {
  id: slugify('Cennik'),
  name: 'Cennik',
  path: '/cennik',
}
const GALERIA_LINK: NavLinkItem = {
  id: slugify('Galeria'),
  name: 'Galeria',
  path: '/galeria',
}

export const ROOMS_DROPDOWN: NavDropdownItem = {
  id: slugify('Nasze sale'),
  name: 'Nasze sale',
  path: '/nasze-sale',
  children: [
    {
      id: slugify('Sala Wschod'),
      name: 'Sala Wschód',
      path: '/nasze-sale/sala-wschod',
    },
    {
      id: slugify('Sala Zachod'),
      name: 'Sala Zachód',
      path: '/nasze-sale/sala-zachod',
    },
  ],
}

export const LEFT_LINKS: NavEntry[] = [
  ROOMS_DROPDOWN,
  CENNIK_LINK,
  GALERIA_LINK,
]

export const RIGHT_LINKS: NavLinkItem[] = [
  { id: slugify('Eventy'), name: 'Eventy', path: '/wydarzenia' },
  { id: slugify('FAQ'), name: 'FAQ', path: '/faq' },
  { id: slugify('Kontakt'), name: 'Kontakt', path: '/kontakt' },
]

export const MOBILE_LINKS: NavLinkItem[] = [
  { id: slugify('Home'), name: 'Home', path: '/' },
  {
    id: slugify('Nasze sale mobile'),
    name: 'Nasze sale',
    path: '/nasze-sale',
  },
  ...ROOMS_DROPDOWN.children,
  CENNIK_LINK,
  GALERIA_LINK,
  ...RIGHT_LINKS,
]

export const RESERVATION_LINK: NavLinkItem = {
  id: slugify('Rezerwacja'),
  name: 'Rezerwacja',
  path: '/rezerwacja',
}

export { LOGO_MARK_SRC }
