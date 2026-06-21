import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Booking } from 'components/organisms/Booking'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/rezerwacja'

const RezerwacjaPage: React.FC<PageProps> = () => {
  const { BOOKING_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Rezerwacja | Soleil Studio"
        description="Zarezerwuj salę Soleil Studio online — wybierz termin i potwierdź rezerwację w kilka minut."
      />

      <Booking {...BOOKING_DATA} />
    </Layout>
  )
}

export default RezerwacjaPage
