import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { PricingAddons } from 'components/organisms/PricingAddons'
import { PricingHero } from 'components/organisms/PricingHero'
import { PricingPlans } from 'components/organisms/PricingPlans'
import { PricingRules } from 'components/organisms/PricingRules'
import { StudioEquipment } from 'components/organisms/StudioEquipment'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/cennik'

const CennikPage: React.FC<PageProps> = () => {
  const {
    PRICING_HERO_DATA,
    PRICING_PLANS_DATA,
    PRICING_ADDONS_DATA,
    EQUIPMENT_DATA,
    PRICING_RULES_DATA,
  } = useFormatQueryData()

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
