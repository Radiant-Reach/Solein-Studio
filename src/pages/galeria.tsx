import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Gallery } from 'components/organisms/Gallery'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/galeria'

const GaleriaPage: React.FC<PageProps> = () => {
  const { GALLERY_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Galeria | Soleil Studio"
        description="Zajrzyj do środka Soleil Studio — zdjęcia z sal Wschód i Zachód oraz wydarzeń."
      />

      <Gallery {...GALLERY_DATA} />
    </Layout>
  )
}

export default GaleriaPage
