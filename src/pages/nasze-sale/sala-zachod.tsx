import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { RoomDetails } from 'components/organisms/RoomDetails'
import { RoomGallery } from 'components/organisms/RoomGallery'
import { RoomHero } from 'components/organisms/RoomHero'
import { RoomPricing } from 'components/organisms/RoomPricing'
import { StudioEquipment } from 'components/organisms/StudioEquipment'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/sala-zachod'

const SalaZachodPage: React.FC<PageProps> = () => {
  const {
    ROOM_HERO_DATA,
    ROOM_GALLERY_DATA,
    ROOM_DETAILS_DATA,
    ROOM_PRICING_DATA,
    EQUIPMENT_DATA,
  } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Sala Zachód | Soleil Studio Wrocław"
        description="Sala Zachód w Soleil Studio — przytulna sala w ciepłym, zachodzącym słońcu. Idealna na kolacje, baby shower i wieczorne eventy."
      />

      <RoomHero {...ROOM_HERO_DATA} />
      <RoomGallery {...ROOM_GALLERY_DATA} />
      <RoomDetails {...ROOM_DETAILS_DATA} />
      <RoomPricing {...ROOM_PRICING_DATA} />
      <StudioEquipment {...EQUIPMENT_DATA} />
    </Layout>
  )
}

export default SalaZachodPage
