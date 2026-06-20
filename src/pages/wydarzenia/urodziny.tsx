import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { EventPossibilities } from 'components/organisms/EventPossibilities'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/urodziny'

const UrodzinyPage: React.FC<PageProps> = () => {
  const { EVENT_POSSIBILITIES_DATA, CTA_BANNER_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Urodziny w Soleil Studio | Wynajem sali Wrocław"
        description="Zorganizuj urodziny we Wrocławiu w Soleil Studio — przestrzeń do dekoracji, catering, nagłośnienie i miejsce na pamiątkowe zdjęcia."
      />

      <EventPossibilities {...EVENT_POSSIBILITIES_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default UrodzinyPage
