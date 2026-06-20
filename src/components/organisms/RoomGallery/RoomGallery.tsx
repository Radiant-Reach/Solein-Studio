import React, { useState } from 'react'

import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'

import { Lightbox } from 'components/molecules/Lightbox'
import { Swiper } from 'components/molecules/Swiper'

import { GalleryTile, LightboxPhoto, Wrapper } from './RoomGallery.style'

export type RoomGalleryPhoto = {
  id: string
  tone: PhotoFrameTone
}

export type RoomGalleryProps = {
  photos: RoomGalleryPhoto[]
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activePhoto = activeIndex !== null ? photos[activeIndex] : null

  return (
    <Wrapper>
      <Container $variant="wide">
        <Swiper
          items={photos}
          withNavigation
          extractKey={(photo) => photo.id}
          renderItem={(photo, _active, index) => (
            <GalleryTile
              type="button"
              aria-label="Powiększ zdjęcie"
              onClick={() => setActiveIndex(index)}
            >
              <PhotoFrame tone={photo.tone} />
            </GalleryTile>
          )}
        />
      </Container>

      <Lightbox
        isOpen={activePhoto !== null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          photos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + photos.length) % photos.length
                )
            : undefined
        }
        onNext={
          photos.length > 1
            ? () =>
                setActiveIndex((prev) =>
                  prev === null ? null : (prev + 1) % photos.length
                )
            : undefined
        }
      >
        {activePhoto && (
          <LightboxPhoto>
            <PhotoFrame tone={activePhoto.tone} />
          </LightboxPhoto>
        )}
      </Lightbox>
    </Wrapper>
  )
}
