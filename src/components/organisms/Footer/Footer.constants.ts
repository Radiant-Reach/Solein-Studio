import { CONTACT, LOGO_FULL_CREAM_SRC, SOCIAL_LINKS } from 'constants/brand'

import slugify from 'utils/slugify'

import { NavLinkItem } from 'types/domain'

export const BRAND_BLURB =
  'Słoneczne studio do wynajęcia w sercu Wrocławia — na warsztaty, świętowanie i chwile wytchnienia.'

export const LOCATION_LINK: NavLinkItem = {
  id: slugify('Soleil we Wroclawiu'),
  name: 'Soleil we Wrocławiu →',
  path: '/lokacje/wroclaw',
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: slugify('Strona glowna'), name: 'Strona główna', path: '/' },
  { id: slugify('Nasze sale'), name: 'Nasze sale', path: '/nasze-sale' },
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
  { id: slugify('Cennik'), name: 'Cennik', path: '/cennik' },
  { id: slugify('Galeria'), name: 'Galeria', path: '/galeria' },
  { id: slugify('FAQ'), name: 'FAQ', path: '/faq' },
]

export const EVENT_LINKS: NavLinkItem[] = [
  {
    id: slugify('Warsztaty'),
    name: 'Warsztaty',
    path: '/wydarzenia/urodziny',
  },
  {
    id: slugify('Urodziny'),
    name: 'Urodziny',
    path: '/wydarzenia/urodziny',
  },
  {
    id: slugify('Baby shower'),
    name: 'Baby shower',
    path: '/wydarzenia/urodziny',
  },
  {
    id: slugify('Spotkania biznesowe'),
    name: 'Spotkania biznesowe',
    path: '/wydarzenia/urodziny',
  },
  {
    id: slugify('Wieczorne eventy'),
    name: 'Wieczorne eventy',
    path: '/wydarzenia/urodziny',
  },
  {
    id: slugify('Zajecia relaksacyjne i joga'),
    name: 'Zajęcia relaksacyjne i joga',
    path: '/wydarzenia/urodziny',
  },
]

export { CONTACT, LOGO_FULL_CREAM_SRC, SOCIAL_LINKS }
