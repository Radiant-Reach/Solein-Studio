import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'
import { BodyMedium, Text } from 'components/atoms/Typography'

import { EventDetail } from 'components/organisms/EventDetail'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/wydarzenia-detail'

const EventDetailPage: React.FC<PageProps> = ({ params }) => {
  const { EVENT_DETAIL_DATA } = useFormatQueryData(params.slug)

  if (!EVENT_DETAIL_DATA) {
    return (
      <Layout>
        <Seo title="Wydarzenie nie znalezione | Soleil Studio" />
        <Text $base={BodyMedium} $color="ink600" $align="center">
          Nie znaleziono takiego wydarzenia.
        </Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo
        title={`${EVENT_DETAIL_DATA.title} | Soleil Studio Wrocław`}
        description={EVENT_DETAIL_DATA.description}
      />

      <EventDetail {...EVENT_DETAIL_DATA} />
    </Layout>
  )
}

export default EventDetailPage
