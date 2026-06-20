import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { StudioIntro } from 'components/organisms/StudioIntro'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/wroclaw'

const WroclawPage: React.FC<PageProps> = () => {
  const { STUDIO_INTRO_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Soleil Studio we Wrocławiu | Studio fotograficzne i eventowe"
        description="Poznaj Studio Soleil — niemal 100 m² przestrzeni w zabytkowej kamienicy we Wrocławiu, z wysokimi sufitami i naturalnym światłem."
      />

      <StudioIntro {...STUDIO_INTRO_DATA} />
    </Layout>
  )
}

export default WroclawPage
