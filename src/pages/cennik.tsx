import { PageProps, graphql } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { PricingAddons } from 'components/organisms/Pricing/Addons'
import { PricingHero } from 'components/organisms/Pricing/Hero'
import { PricingPlans } from 'components/organisms/Pricing/Plans'
import { PricingRules } from 'components/organisms/Pricing/Rules'
import { StudioEquipment } from 'components/organisms/StudioEquipment'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/cennik'

const CennikPage: React.FC<PageProps<Queries.CennikQuery>> = ({ data }) => {
  const {
    PRICING_HERO_DATA,
    PRICING_PLANS_DATA,
    PRICING_ADDONS_DATA,
    EQUIPMENT_DATA,
    PRICING_RULES_DATA,
  } = useFormatQueryData(data)

  return (
    <Layout>
      <Seo
        title="Cennik | Soleil Studio Wrocław"
        description="Cennik wynajmu Soleil Studio we Wrocławiu — sala Wschód, sala Zachód i całe studio, wynajem na godziny i na cały dzień."
      />

      <PricingHero {...PRICING_HERO_DATA} />
      <PricingPlans {...PRICING_PLANS_DATA} />
      <PricingAddons {...PRICING_ADDONS_DATA} />
      <StudioEquipment {...EQUIPMENT_DATA} />
      <PricingRules {...PRICING_RULES_DATA} />
    </Layout>
  )
}

export default CennikPage

export const query = graphql`
  query Cennik {
    page: wpPage(slug: { eq: "cennik" }) {
      cennikFields {
        scriptLabel
        cennikHeading
        cennikLead
        addonsHeading
        makeupTitle
        makeupPrice
        makeupUnit
        makeupNote
        makeupDescription
        extraNotes {
          text
        }
        quoteHeading
        quoteItems {
          text
        }
        quoteCta {
          title
          url
        }
        rules {
          text
        }
        notice
      }
    }

    wp {
      ustawieniaGlobalne {
        cennikWspolny {
          pojedynczaSala {
            label
            price
            highlight
          }
          caleStudio {
            label
            price
            highlight
          }
        }
        wyposazenie {
          categories {
            title
            items {
              text
            }
          }
        }
      }
    }
  }
`
