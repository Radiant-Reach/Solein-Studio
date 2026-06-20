import { PageProps } from 'gatsby'
import React from 'react'

import { Seo } from 'components/atoms/Seo'

import { CtaBanner } from 'components/molecules/CtaBanner'

import { EventsTeaser } from 'components/organisms/EventsTeaser'
import { GalleryTeaser } from 'components/organisms/GalleryTeaser'
import { HomeHeroSplit } from 'components/organisms/HomeHeroSplit'
import { InstagramTeaser } from 'components/organisms/InstagramTeaser'
import { RoomsOverview } from 'components/organisms/RoomsOverview'
import { StudioIntro } from 'components/organisms/StudioIntro'

import { Layout } from 'views/Layout'

import { useFormatQueryData } from 'hooks/useFormatQueryData/home'

const IndexPage: React.FC<PageProps> = () => {
  const {
    HOME_HERO_SPLIT_DATA,
    ROOMS_OVERVIEW_DATA,
    EVENTS_TEASER_DATA,
    STUDIO_INTRO_DATA,
    GALLERY_TEASER_DATA,
    CTA_BANNER_DATA,
  } = useFormatQueryData()

  return (
    <Layout>
      <Seo
        title="Soleil Studio Wrocław | Wynajem studia na wydarzenia i sesje"
        description="Słoneczne studio do wynajęcia w sercu Wrocławia — sala Wschód i Zachód na warsztaty, sesje zdjęciowe i wydarzenia."
      />

      <HomeHeroSplit {...HOME_HERO_SPLIT_DATA} />
      <RoomsOverview {...ROOMS_OVERVIEW_DATA} />
      <EventsTeaser {...EVENTS_TEASER_DATA} />
      <StudioIntro {...STUDIO_INTRO_DATA} />
      <GalleryTeaser {...GALLERY_TEASER_DATA} />
      <CtaBanner {...CTA_BANNER_DATA} />
    </Layout>
  )
}

export default IndexPage
