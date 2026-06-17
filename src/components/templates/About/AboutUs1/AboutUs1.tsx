import React from 'react'

import { Button } from 'components/atoms/Button'

import * as S from './AboutUs1.style'

const DEFAULT_IMAGE =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69adddb8e041da4849a19a8b.png'

type AboutUs1Props = {
  id?: string
  backgroundImage?: string
  eyebrow?: string
  title?: React.ReactNode
  paragraphs?: string[]
  listItems?: string[]
  ctaLabel?: string
  ctaHref?: string
  imageSrc?: string
  imageAlt?: string
}

const DEFAULT_PARAGRAPHS = [
  'Trust fund nocore broklyn humblebrag mustache pork kitsch, bicycle rights hexagon schlitz keytar palo is santo drinking vinegar fam ramps.',
  'Four dollar toast and edison bulb vinyl, listicle hashtag pug scenester typewriter yuccie street artboard or whatever to fill place.',
]

const DEFAULT_LIST_ITEMS = [
  "Selfies you probably haven't heard of them.",
  'Tousled cold-pressed chicharrones yuccie.',
  'Pabst iPhone chartreuse shabby chic tumeric.',
  'Scenester normcore mumblecore snackwave.',
]

export const AboutUs1: React.FC<AboutUs1Props> = ({
  id,
  backgroundImage,
  eyebrow = 'Our Office',
  title = (
    <>
      Get closer to <em>EduWell</em>
    </>
  ),
  paragraphs = DEFAULT_PARAGRAPHS,
  listItems = DEFAULT_LIST_ITEMS,
  ctaLabel = 'Our Services',
  ctaHref = '/our-services',
  imageSrc = DEFAULT_IMAGE,
  imageAlt = '',
}) => {
  return (
    <S.Section id={id} $bgImage={backgroundImage}>
      <S.Container>
        <S.Left>
          <S.Header>
            <S.Eyebrow>{eyebrow}</S.Eyebrow>
            <S.Title>{title}</S.Title>
          </S.Header>

          {paragraphs.map((text, i) => (
            <S.Paragraph key={i}>{text}</S.Paragraph>
          ))}

          <S.List>
            {listItems.map((item, i) => (
              <S.ListItem key={i}>{item}</S.ListItem>
            ))}
          </S.List>

          <Button as="a" href={ctaHref} $variant="primary" $size="large">
            {ctaLabel}
          </Button>
        </S.Left>

        <S.Right>
          <S.VideoWrap>
            <img src={imageSrc} alt={imageAlt} />
          </S.VideoWrap>
        </S.Right>
      </S.Container>
    </S.Section>
  )
}
