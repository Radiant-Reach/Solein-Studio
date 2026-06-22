import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Booking } from 'components/organisms/Booking'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/rezerwacja'

const RezerwacjaPage: React.FC<PageProps<Queries.RezerwacjaQuery>> = ({
  data,
}) => {
  const { BOOKING_DATA } = useFormatQueryData(data)

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

export const query = graphql`
  query Rezerwacja {
    page: wpPage(slug: { eq: "rezerwacja" }) {
      rezerwacjaFields {
        eyebrow
        heading
        lead
      }
    }
  }
`
