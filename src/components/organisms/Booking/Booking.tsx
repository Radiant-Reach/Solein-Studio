import React from 'react'
import { Helmet } from 'react-helmet'

import { Container } from 'components/atoms/Container'

import { SectionHeading } from 'components/molecules/SectionHeading'

import { HeadingWrapper, IframeWrapper, Wrapper } from './Booking.style'

const BOOKING_IFRAME_ID = '7MfabSjyJOaPp1679hg2_1782031942788'
const BOOKING_EMBED_SCRIPT_SRC =
  'https://links.radiantreach.agency/js/form_embed.js'

export type BookingProps = {
  eyebrow: string
  heading: string
  lead?: string
  src: string
}

export const Booking: React.FC<BookingProps> = ({
  eyebrow,
  heading,
  lead,
  src,
}) => (
  <Wrapper>
    <Helmet>
      <script src={BOOKING_EMBED_SCRIPT_SRC} type="text/javascript" />
    </Helmet>

    <Container $variant="wide">
      <HeadingWrapper>
        <SectionHeading eyebrow={eyebrow} lead={lead}>
          {heading}
        </SectionHeading>
      </HeadingWrapper>

      <IframeWrapper>
        <iframe
          id={BOOKING_IFRAME_ID}
          src={src}
          style={{ width: '100%', border: 'none', overflow: 'hidden' }}
          scrolling="no"
          title="Formularz rezerwacji Soleil Studio"
        />
      </IframeWrapper>
    </Container>
  </Wrapper>
)
