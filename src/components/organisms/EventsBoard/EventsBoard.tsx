import React, { useMemo, useRef, useState } from 'react'

import { Container } from 'components/atoms/Container'
import { Icon } from 'components/atoms/Icon'
import { Input } from 'components/atoms/Input'
import { PhotoFrame, PhotoFrameTone } from 'components/atoms/PhotoFrame'
import { BodyMedium, BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import { useOutsideClick } from 'hooks/useOutsideClick'

import { ImageType } from 'types/page'

import { ReactComponent as ChevronDown } from 'assets/icons/arrows/chevron-down.svg'

import {
  BoardGrid,
  ControlsRow,
  DateInput,
  DateRangeGroup,
  EmptyState,
  EventCard,
  EventCardBody,
  EventCardMeta,
  EventCardPhoto,
  EventsGrid,
  HeadingWrapper,
  MainColumn,
  MainHeader,
  SelectButton,
  SelectOption,
  SelectOptions,
  SelectWrapper,
  SideColumn,
  SideHeadingWrapper,
  SortButton,
  TypeTag,
  UpcomingDate,
  UpcomingDot,
  UpcomingInfo,
  UpcomingList,
  UpcomingRow,
  Wrapper,
} from './EventsBoard.style'

export type EventCategory = 'zewnetrzne' | 'solein'

export type EventCategoryLabel = {
  id: EventCategory
  label: string
}

export type EventEntry = {
  id: string
  title: string
  date: string
  type: EventCategory
  tone: PhotoFrameTone
  image?: ImageType
  description?: string
}

export type EventsBoardProps = {
  eyebrow: string
  heading: string
  lead?: string
  categories: EventCategoryLabel[]
  events: EventEntry[]
  upcomingHeading: string
  emptyLabel: string
  upcomingEmptyLabel: string
}

const ALL_FILTER_ID = 'all'
const MONTH_KEY_LENGTH = 7

const getMonthKey = (date: string) => date.slice(0, MONTH_KEY_LENGTH)

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

const formatMonthLabel = (monthKey: string) =>
  capitalize(
    new Date(`${monthKey}-01`).toLocaleDateString('pl-PL', {
      month: 'long',
      year: 'numeric',
    })
  )

const formatDay = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', { day: '2-digit' })

const formatShortMonth = (date: string) =>
  new Date(date).toLocaleDateString('pl-PL', { month: 'short' })

export const EventsBoard: React.FC<EventsBoardProps> = ({
  eyebrow,
  heading,
  lead,
  categories,
  events,
  upcomingHeading,
  emptyLabel,
  upcomingEmptyLabel,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER_ID)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: categoryDropdownRef,
    handler: () => setIsCategoryOpen(false),
    condition: isCategoryOpen,
  })

  const isRangeActive = Boolean(dateFrom || dateTo)

  const activeCategoryLabel =
    activeCategory === ALL_FILTER_ID
      ? 'Wszystkie'
      : (categories.find((category) => category.id === activeCategory)?.label ??
        'Wszystkie')

  const { activeMonthLabel, activeMonthEvents, upcomingEvents } =
    useMemo(() => {
      const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
      const monthKeys = Array.from(
        new Set(sorted.map((e) => getMonthKey(e.date)))
      )

      const currentKey = getMonthKey(new Date().toISOString())

      const activeKey = monthKeys.includes(currentKey)
        ? currentKey
        : (monthKeys.filter((key) => key > currentKey).sort()[0] ??
          monthKeys
            .filter((key) => key < currentKey)
            .sort()
            .reverse()[0] ??
          null)

      const monthEvents = activeKey
        ? sorted.filter((e) => getMonthKey(e.date) === activeKey)
        : []

      const futureEvents = activeKey
        ? sorted.filter((e) => getMonthKey(e.date) > activeKey)
        : []

      return {
        activeMonthLabel: activeKey ? formatMonthLabel(activeKey) : '',
        activeMonthEvents: monthEvents,
        upcomingEvents: futureEvents,
      }
    }, [events])

  const visibleEvents = useMemo(() => {
    const baseList = isRangeActive
      ? events.filter((event) => {
          if (dateFrom && event.date < dateFrom) return false
          if (dateTo && event.date > dateTo) return false
          return true
        })
      : activeMonthEvents

    const filtered =
      activeCategory === ALL_FILTER_ID
        ? baseList
        : baseList.filter((event) => event.type === activeCategory)

    return [...filtered].sort((a, b) => a.date.localeCompare(b.date))
  }, [
    activeMonthEvents,
    events,
    activeCategory,
    isRangeActive,
    dateFrom,
    dateTo,
  ])

  return (
    <Wrapper>
      <Container $variant="wide">
        <HeadingWrapper>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>
        </HeadingWrapper>

        <BoardGrid>
          <MainColumn>
            <MainHeader>
              <Text
                as="h3"
                $base={H400}
                $color="ink800"
                dangerouslySetInnerHTML={{
                  __html: isRangeActive
                    ? 'Wybrany zakres dat'
                    : activeMonthLabel,
                }}
              />

              <ControlsRow>
                <SelectWrapper ref={categoryDropdownRef}>
                  <SelectButton
                    type="button"
                    $open={isCategoryOpen}
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                  >
                    <Text
                      as="span"
                      $base={BodySmall}
                      $color="inherit"
                      dangerouslySetInnerHTML={{ __html: activeCategoryLabel }}
                    />
                    <Icon src={ChevronDown} size={14} />
                  </SelectButton>

                  {isCategoryOpen && (
                    <SelectOptions>
                      <SelectOption
                        type="button"
                        $active={activeCategory === ALL_FILTER_ID}
                        onClick={() => {
                          setActiveCategory(ALL_FILTER_ID)
                          setIsCategoryOpen(false)
                        }}
                      >
                        <Text as="span" $base={BodySmall} $color="inherit">
                          Wszystkie
                        </Text>
                      </SelectOption>

                      {categories.map((category) => (
                        <SelectOption
                          key={category.id}
                          type="button"
                          $active={activeCategory === category.id}
                          onClick={() => {
                            setActiveCategory(category.id)
                            setIsCategoryOpen(false)
                          }}
                        >
                          <Text
                            as="span"
                            $base={BodySmall}
                            $color="inherit"
                            dangerouslySetInnerHTML={{ __html: category.label }}
                          />
                        </SelectOption>
                      ))}
                    </SelectOptions>
                  )}
                </SelectWrapper>

                <DateRangeGroup>
                  <DateInput>
                    <Input
                      type="date"
                      value={dateFrom}
                      aria-label="Od"
                      onChange={(event) => setDateFrom(event.target.value)}
                    />
                  </DateInput>

                  <Text as="span" $base={BodySmall} $color="ink500">
                    –
                  </Text>

                  <DateInput>
                    <Input
                      type="date"
                      value={dateTo}
                      aria-label="Do"
                      onChange={(event) => setDateTo(event.target.value)}
                    />
                  </DateInput>

                  {isRangeActive && (
                    <SortButton
                      type="button"
                      onClick={() => {
                        setDateFrom('')
                        setDateTo('')
                      }}
                    >
                      <Text as="span" $base={BodySmall} $color="inherit">
                        Wyczyść
                      </Text>
                    </SortButton>
                  )}
                </DateRangeGroup>
              </ControlsRow>
            </MainHeader>

            {visibleEvents.length === 0 ? (
              <EmptyState>
                <Text
                  $base={BodyMedium}
                  $color="ink600"
                  dangerouslySetInnerHTML={{ __html: emptyLabel }}
                />
              </EmptyState>
            ) : (
              <EventsGrid>
                {visibleEvents.map((event) => {
                  const category = categories.find((c) => c.id === event.type)

                  return (
                    <EventCard key={event.id} to={`/wydarzenia/${event.id}`}>
                      <EventCardPhoto>
                        <PhotoFrame tone={event.tone} image={event.image} />
                      </EventCardPhoto>

                      <EventCardBody>
                        <EventCardMeta>
                          <Text as="span" $base={BodySmall} $color="ink500">
                            {formatDay(event.date)}{' '}
                            <Text
                              as="span"
                              $base={BodySmall}
                              $transform="uppercase"
                              $color="ink500"
                            >
                              {formatShortMonth(event.date)}
                            </Text>
                          </Text>

                          {category && (
                            <TypeTag $type={event.type}>
                              <Text
                                as="span"
                                $base={BodySmall}
                                $color="inherit"
                                dangerouslySetInnerHTML={{
                                  __html: category.label,
                                }}
                              />
                            </TypeTag>
                          )}
                        </EventCardMeta>

                        <Text
                          as="h4"
                          $base={H400}
                          $color="ink800"
                          dangerouslySetInnerHTML={{ __html: event.title }}
                        />

                        {event.description && (
                          <Text
                            $base={BodySmall}
                            $color="ink600"
                            dangerouslySetInnerHTML={{
                              __html: event.description,
                            }}
                          />
                        )}
                      </EventCardBody>
                    </EventCard>
                  )
                })}
              </EventsGrid>
            )}
          </MainColumn>

          <SideColumn>
            <SideHeadingWrapper>
              <Text
                as="h3"
                $base={H400}
                $color="ink800"
                dangerouslySetInnerHTML={{ __html: upcomingHeading }}
              />
            </SideHeadingWrapper>

            {upcomingEvents.length === 0 ? (
              <Text
                $base={BodySmall}
                $color="ink600"
                dangerouslySetInnerHTML={{ __html: upcomingEmptyLabel }}
              />
            ) : (
              <UpcomingList>
                {upcomingEvents.map((event) => (
                  <UpcomingRow key={event.id} to={`/wydarzenia/${event.id}`}>
                    <UpcomingDate>
                      <Text
                        as="span"
                        $base={BodySmall}
                        $color="ink800"
                        dangerouslySetInnerHTML={{
                          __html: formatDay(event.date),
                        }}
                      />
                      <Text
                        as="span"
                        $base={BodySmall}
                        $transform="uppercase"
                        $color="ink500"
                        dangerouslySetInnerHTML={{
                          __html: ` ${formatShortMonth(event.date)}`,
                        }}
                      />
                    </UpcomingDate>

                    <UpcomingDot $type={event.type} />

                    <UpcomingInfo>
                      <Text
                        as="span"
                        $base={BodySmall}
                        $color="ink800"
                        dangerouslySetInnerHTML={{ __html: event.title }}
                      />
                    </UpcomingInfo>
                  </UpcomingRow>
                ))}
              </UpcomingList>
            )}
          </SideColumn>
        </BoardGrid>
      </Container>
    </Wrapper>
  )
}
