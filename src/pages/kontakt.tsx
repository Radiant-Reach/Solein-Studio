import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Contact } from 'components/organisms/Contact'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/kontakt'

const KontaktPage: React.FC<PageProps> = () => {
  const { CONTACT_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Kontakt | Soleil Studio"
        description="Zapytaj o dostępność sali we Wrocławiu — Soleil Studio odpowiada na zapytania w ciągu 24 godzin."
      />

      <Contact {...CONTACT_DATA} />
    </Layout>
  )
}

export default KontaktPage
