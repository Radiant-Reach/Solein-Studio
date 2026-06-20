import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { RoomDetailsProps } from 'components/organisms/RoomDetails'
import { RoomGalleryProps } from 'components/organisms/RoomGallery'
import { RoomHeroProps } from 'components/organisms/RoomHero'
import { RoomPricingProps } from 'components/organisms/RoomPricing'
import { StudioEquipmentProps } from 'components/organisms/StudioEquipment'

import { EQUIPMENT_CATEGORIES } from 'constants/equipment'
import { ROOM_PRICING_ROWS } from 'constants/roomPricing'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

import CoffeeIcon from 'assets/images/icons/icon-coffee.png'
import HomeIcon from 'assets/images/icons/icon-home.png'
import ParkingIcon from 'assets/images/icons/icon-parking.png'
import PawIcon from 'assets/images/icons/icon-paw.png'
import SunIcon from 'assets/images/icons/icon-sun.png'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const HERO_PHOTO_ID = slugify('Sala Zachod hero')
    const GALLERY_PHOTO_IDS = Array.from({ length: 10 }, (_, index) =>
      slugify(`Sala Zachod galeria ${index + 1}`)
    )

    const ROOM_HERO_DATA = {
      backTo: '/nasze-sale',
      backLabel: 'Wszystkie sale',
      eyebrow: 'Zachód słońca',
      name: 'Sala Zachód',
      description:
        'Przytulna sala skąpana w ciepłym, zachodzącym słońcu. Głębsze tony, świece i miękkie tkaniny sprawiają, że to idealne miejsce na kolacje, baby shower i kameralne wieczorne eventy.',
      heroTone: pickFromSeed(HERO_PHOTO_ID, PHOTO_FRAME_TONES),
      primaryCtaLabel: 'Sprawdź dostępność',
      primaryCtaTo: '/kontakt',
      secondaryCtaLabel: 'Cennik',
      secondaryCtaTo: '/cennik',
    } satisfies RoomHeroProps

    const ROOM_GALLERY_DATA = {
      photos: GALLERY_PHOTO_IDS.map((id) => ({
        id,
        tone: pickFromSeed(id, PHOTO_FRAME_TONES),
      })),
    } satisfies RoomGalleryProps

    const ROOM_DETAILS_DATA = {
      specsEyebrow: 'Szczegóły',
      specsHeading: 'O sali',
      specs: [
        { id: slugify('Pojemnosc'), label: 'Pojemność', value: 'do 24 osób' },
        { id: slugify('Powierzchnia'), label: 'Powierzchnia', value: '52 m²' },
        {
          id: slugify('Swiatlo'),
          label: 'Światło',
          value: 'Zachodnie okna · złota godzina',
        },
        {
          id: slugify('Minimalny czas'),
          label: 'Minimalny czas',
          value: '2 godziny',
        },
      ],
      amenitiesEyebrow: 'W cenie',
      amenitiesHeading: 'Wszystko, czego potrzebujesz',
      amenities: [
        {
          id: slugify('Kawa herbata woda'),
          icon: CoffeeIcon,
          label: 'Kawa, herbata i woda dla gości',
        },
        {
          id: slugify('Naturalne swiatlo zaciemnienie'),
          icon: SunIcon,
          label: 'Naturalne światło i sterowane zaciemnienie',
        },
        {
          id: slugify('Stoly krzesla naglosnienie'),
          icon: HomeIcon,
          label: 'Stoły, krzesła i sprzęt nagłośnieniowy',
        },
        {
          id: slugify('Pet friendly'),
          icon: PawIcon,
          label: 'Pet friendly — pupile mile widziane',
        },
        {
          id: slugify('Bezplatny parking'),
          icon: ParkingIcon,
          label: 'Bezpłatny parking przy budynku',
        },
      ],
    } satisfies RoomDetailsProps

    const ROOM_PRICING_DATA = {
      eyebrow: 'Cennik',
      heading: 'Ile kosztuje wynajem?',
      lead: 'Ceny brutto, faktury VAT. Pełny cennik całego studia znajdziesz na stronie Cennik.',
      rows: ROOM_PRICING_ROWS,
      primaryCtaLabel: 'Sprawdź dostępność',
      primaryCtaTo: '/kontakt',
      secondaryCtaLabel: 'Pełny cennik',
      secondaryCtaTo: '/cennik',
    } satisfies RoomPricingProps

    const EQUIPMENT_DATA = {
      eyebrow: 'Wyposażenie',
      heading: 'Dostępny sprzęt',
      lead: 'W cenie wynajmu studia oferujemy profesjonalny sprzęt oświetleniowy i akcesoria. Poniżej znajdziesz szczegółową listę wyposażenia dostępnego na miejscu.',
      categories: EQUIPMENT_CATEGORIES,
    } satisfies StudioEquipmentProps

    return {
      ROOM_HERO_DATA,
      ROOM_GALLERY_DATA,
      ROOM_DETAILS_DATA,
      ROOM_PRICING_DATA,
      EQUIPMENT_DATA,
    }
  }, [])
}
