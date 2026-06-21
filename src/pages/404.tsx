import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { NotFound } from 'components/organisms/NotFound'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/404'

const NotFoundPage: React.FC<PageProps> = () => {
  const { NOT_FOUND_DATA } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="404 — Strona nie znaleziona | Soleil Studio"
        description="Strona, której szukasz, nie istnieje lub została przeniesiona."
        robots="noindex, nofollow"
      />

      <NotFound {...NOT_FOUND_DATA} />
    </Layout>
  )
}

export default NotFoundPage
