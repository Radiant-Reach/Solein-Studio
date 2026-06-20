import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { RoomDetails } from 'components/organisms/RoomDetails'
import { RoomGallery } from 'components/organisms/RoomGallery'
import { RoomHero } from 'components/organisms/RoomHero'
import { RoomPricing } from 'components/organisms/RoomPricing'
import { StudioEquipment } from 'components/organisms/StudioEquipment'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/sala-wschod'

const SalaWschodPage: React.FC<PageProps> = () => {
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
        title="Sala Wschód | Soleil Studio Wrocław"
        description="Sala Wschód w Soleil Studio — najjaśniejsza z naszych sal, wypełniona porannym światłem. Idealna na warsztaty, sesje zdjęciowe i spotkania."
      />

      <RoomHero {...ROOM_HERO_DATA} />
      <RoomGallery {...ROOM_GALLERY_DATA} />
      <RoomDetails {...ROOM_DETAILS_DATA} />
      <RoomPricing {...ROOM_PRICING_DATA} />
      <StudioEquipment {...EQUIPMENT_DATA} />
    </Layout>
  )
}

export default SalaWschodPage
