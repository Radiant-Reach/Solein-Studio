import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { EventsBoard } from 'components/organisms/EventsBoard'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/wydarzenia'

const WydarzeniaPage: React.FC<PageProps> = () => {
  const { EVENTS_BOARD_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Wydarzenia | Soleil Studio Wrocław"
        description="Wydarzenia w Soleil Studio we Wrocławiu — przegląd wydarzeń własnych i organizowanych przez gości studia, oraz nadchodzące terminy."
      />

      <EventsBoard {...EVENTS_BOARD_DATA} />
    </Layout>
  )
}

export default WydarzeniaPage
