import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { FAQ } from 'components/organisms/FAQ'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/faq'

const FaqPage: React.FC<PageProps> = () => {
  const { FAQ_DATA, CTA_BANNER_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="FAQ | Soleil Studio"
        description="Najczęstsze pytania o wynajem, wyposażenie i organizację wydarzeń w Soleil Studio."
      />

      <FAQ {...FAQ_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default FaqPage
