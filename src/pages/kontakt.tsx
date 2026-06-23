import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Contact } from 'components/organisms/Contact'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/kontakt'

const KontaktPage: React.FC<PageProps<Queries.KontaktQuery>> = ({ data }) => {
  const { CONTACT_DATA } = useFormatQueryData(data)

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

export const query = graphql`
  query Kontakt {
    page: wpPage(slug: { eq: "kontakt" }) {
      kontaktFields {
        kontaktEyebrow
        kontaktHeading
        kontaktLead
      }
    }
    wp {
      ustawieniaGlobalne {
        kontakt {
          email
          phone
          addressLine1
          addressLine2
          hours
          parkingNote
        }
      }
    }
  }
`
