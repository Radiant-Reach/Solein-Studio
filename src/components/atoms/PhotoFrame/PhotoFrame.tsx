import React from 'react'

import { BodySmall, Text } from 'components/atoms/Typography'

import {
  Caption,
  DEFAULT_PHOTO_FRAME_RADIUS,
  Frame,
  Grain,
  LogoMarkWrapper,
  PHOTO_FRAME_TONES,
  PhotoFrameTone,
} from './PhotoFrame.style'

export type PhotoFrameProps = {
  tone: PhotoFrameTone
  radius?: number
  label?: string
  className?: string
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  tone,
  radius = DEFAULT_PHOTO_FRAME_RADIUS,
  label,
  className,
}) => (
  <Frame $tone={tone} $radius={radius} className={className}>
    <Grain />
    <LogoMarkWrapper />

    {label && (
      <Caption>
        <Text
          as="span"
          $base={BodySmall}
          $color="cream"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </Caption>
    )}
  </Frame>
)

export type { PhotoFrameTone }
export { PHOTO_FRAME_TONES }
