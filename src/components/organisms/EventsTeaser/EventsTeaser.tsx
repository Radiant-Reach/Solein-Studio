import React from 'react'

import { ArrowButton } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodyMedium, BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import { ImageType } from 'types/page'

import {
  EmptyState,
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
  image?: ImageType
}

export type EventsTeaserProps = {
  eyebrow: string
  heading: string
  lead?: string
  events: EventsTeaserItem[]
  emptyLabel: string
  ctaLabel: string
  ctaTo: string
}

export const EventsTeaser: React.FC<EventsTeaserProps> = ({
  eyebrow,
  heading,
  lead,
  events,
  emptyLabel,
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

      {events.length === 0 ? (
        <EmptyState>
          <Text
            $base={BodyMedium}
            $color="ink600"
            dangerouslySetInnerHTML={{ __html: emptyLabel }}
          />
        </EmptyState>
      ) : (
        <EventsGrid>
          {events.map((event) => (
            <EventCard key={event.id} to={`/wydarzenia/${event.id}`}>
              <EventPhoto>
                <PhotoFrame tone={event.tone} image={event.image} />
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
      )}
    </Container>
  </Wrapper>
)
