import React, { useCallback, useEffect, useState } from 'react'

import * as S from './Gallery1.style'

type GalleryTab = {
  key: string
  label: string
}

type GalleryImage = {
  src: string
  alt: string
  category: string
}

type Gallery1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  tabs?: GalleryTab[]
  images?: GalleryImage[]
}

const DEFAULT_TABS: GalleryTab[] = [
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'wnetrze', label: 'Wnętrze' },
]

const PORTFOLIO_SRCS = [
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa68381f9267864f2aa.jpeg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db75e482c379b9d928e.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7da11eeea68cb82cb.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4c.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4d.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7c56ad279086efd4e.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7a691ce6ea0837a14.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db78381f9267868a2ae.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75db7da11eeea68cb82ca.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee045df4011c24e70a3f.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e75dc0da11eeea68cb84ee.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee04a48992f6899fcd29.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ed899ff45b49cc7dfe15.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee04b0e5e2bb7fd54682.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee04a48992f6899fcd2a.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ed2a5df4011c24e6c4d4.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee042db6a3cb826362a6.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee042db6a3cb826362a7.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee31b0e5e2bb7fd5526e.jpg',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e8ee04a1636a6c6533d724.jpg',
]

const WNETRZE_SRCS = [
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa68381f9267864f2a9.png',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa65e482c379b99e8ae.png',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa6a691ce6ea07fd0c9.png',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa6da11eeea68c7de5f.png',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa6a691ce6ea07fd0c8.png',
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e74fa6a691ce6ea07fd0cb.png',
]

const DEFAULT_IMAGES: GalleryImage[] = [
  ...PORTFOLIO_SRCS.map((src, i) => ({
    src,
    alt: `Portfolio ${i + 1}`,
    category: 'portfolio',
  })),
  ...WNETRZE_SRCS.map((src, i) => ({
    src,
    alt: `Wnętrze ${i + 1}`,
    category: 'wnetrze',
  })),
]

export const Gallery1: React.FC<Gallery1Props> = ({
  id = 'gallery',
  eyebrow = 'Galeria',
  title = (
    <>
      Poznaj nasz <em>salon</em>
    </>
  ),
  tabs = DEFAULT_TABS,
  images = DEFAULT_IMAGES,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visibleImages = images.filter(img => img.category === activeTab)
  const count = visibleImages.length

  const goTo = useCallback(
    (index: number) => {
      setLightboxIndex(((index % count) + count) % count)
    },
    [count]
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(lightboxIndex + 1)
      if (e.key === 'ArrowLeft') goTo(lightboxIndex - 1)
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [lightboxIndex, goTo, closeLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  return (
    <>
      <S.Section id={id}>
        <S.Container>
          <S.Header>
            <S.Eyebrow>{eyebrow}</S.Eyebrow>
            <S.Title>{title}</S.Title>
          </S.Header>

          <S.Tabs>
            {tabs.map(tab => (
              <S.Tab
                key={tab.key}
                $active={tab.key === activeTab}
                onClick={() => {
                  setActiveTab(tab.key)
                  setLightboxIndex(null)
                }}
              >
                {tab.label}
              </S.Tab>
            ))}
          </S.Tabs>

          <S.Grid>
            {visibleImages.map(({ src, alt }, index) => (
              <S.GridItem key={src} onClick={() => setLightboxIndex(index)}>
                <img src={src} alt={alt} />
                <S.Overlay>
                  <span>+</span>
                </S.Overlay>
              </S.GridItem>
            ))}
          </S.Grid>
        </S.Container>
      </S.Section>

      {lightboxIndex !== null && (
        <S.Lightbox
          onClick={e => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <S.LbClose onClick={closeLightbox}>✕</S.LbClose>
          <S.LbPrev onClick={() => goTo(lightboxIndex - 1)}>←</S.LbPrev>
          <S.LbInner>
            <S.LbImg
              key={visibleImages[lightboxIndex].src}
              src={visibleImages[lightboxIndex].src}
              alt={visibleImages[lightboxIndex].alt}
            />
          </S.LbInner>
          <S.LbNext onClick={() => goTo(lightboxIndex + 1)}>→</S.LbNext>
          <S.LbCounter>
            {lightboxIndex + 1} / {count}
          </S.LbCounter>
        </S.Lightbox>
      )}
    </>
  )
}
