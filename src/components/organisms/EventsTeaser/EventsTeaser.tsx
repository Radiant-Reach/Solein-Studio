import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  EventBody,
  EventCard,
  EventMeta,
  EventPhoto,
  EventsGrid,
  HeaderRow,
  TypeTag,
  Wrapper,
} from './EventsTeaser.style'

export type EventsTeaserItem = {
  id: string
  title: string
  date: string
  type: 'zewnetrzne' | 'solein'
  typeLabel: string
  tone: PhotoFrameTone
}

export type EventsTeaserProps = {
  eyebrow: string
  heading: string
  lead?: string
  events: EventsTeaserItem[]
  ctaLabel: string
  ctaTo: string
}

export const EventsTeaser: React.FC<EventsTeaserProps> = ({
  eyebrow,
  heading,
  lead,
  events,
  ctaLabel,
  ctaTo,
}) => (
  <Wrapper>
    <Container $variant="wide">
      <HeaderRow>
        <SectionHeading eyebrow={eyebrow} lead={lead}>
          {heading}
        </SectionHeading>

        <ArrowButton to={ctaTo} label={ctaLabel} color="ink800" />
      </HeaderRow>

      <EventsGrid>
        {events.map((event) => (
          <EventCard key={event.id} to={`/wydarzenia/${event.id}`}>
            <EventPhoto>
              <PhotoFrame tone={event.tone} />
            </EventPhoto>

            <EventBody>
              <EventMeta>
                <Text
                  as="span"
                  $base={BodySmall}
                  $color="ink500"
                  dangerouslySetInnerHTML={{ __html: event.date }}
                />

                <TypeTag $type={event.type}>
                  <Text
                    as="span"
                    $base={BodySmall}
                    $color="inherit"
                    dangerouslySetInnerHTML={{ __html: event.typeLabel }}
                  />
                </TypeTag>
              </EventMeta>

              <Text
                as="h3"
                $base={H400}
                $color="ink800"
                dangerouslySetInnerHTML={{ __html: event.title }}
              />
            </EventBody>
          </EventCard>
        ))}
      </EventsGrid>
    </Container>
  </Wrapper>
)
