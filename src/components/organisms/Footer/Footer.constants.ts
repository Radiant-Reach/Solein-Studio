import { CONTACT, LOGO_FULL_CREAM_SRC, SOCIAL_LINKS } from 'constants/brand'

import slugify from 'utils/slugify'

import { NavLinkItem } from 'types/domain'

export const BRAND_BLURB =
  'Słoneczne studio do wynajęcia w sercu Wrocławia — na warsztaty, świętowanie i chwile wytchnienia.'

export const NAV_LINKS: NavLinkItem[] = [
  { id: slugify('Strona glowna'), name: 'Strona główna', path: '/' },
  { id: slugify('Nasze sale'), name: 'Nasze sale', path: '/nasze-sale' },
  { id: slugify('Cennik'), name: 'Cennik', path: '/cennik' },
  { id: slugify('Galeria'), name: 'Galeria', path: '/galeria' },
  { id: slugify('FAQ'), name: 'FAQ', path: '/faq' },
]

export { CONTACT, LOGO_FULL_CREAM_SRC, SOCIAL_LINKS }
