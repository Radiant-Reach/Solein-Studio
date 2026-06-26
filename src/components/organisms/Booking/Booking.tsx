import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Button } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Icon } from 'components/atoms/Icon'
import { Field } from 'components/atoms/Input/Field'
import { PHOTO_FRAME_TONES, PhotoFrame } from 'components/atoms/PhotoFrame'
import { BodyMedium, BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import { BOOKING_FORM_INIT_VALUES, BOOKING_FORM_SCHEMA } from 'constants/form'
import {
  GHL_ADD_ONS,
  GHL_SERVICES,
  GhlAddOnId,
  GhlRoomId,
  SLOT_DURATION_MINUTES,
} from 'constants/ghl'

import { useForm } from 'hooks/useForm'

import { createServiceBooking, upsertContact } from 'utils/ghl'
import { getAvailableSlots } from 'utils/ghlAvailability'
import { pickFromSeed } from 'utils/pickFromSeed'

import { ImageType } from 'types/page'

import { ReactComponent as ChevronLeft } from 'assets/icons/arrows/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/arrows/chevron-right.svg'

import {
  AddOnCheckbox,
  AddOnInfo,
  AddOnPrice,
  AddOnRow,
  AddOnsList,
  BackLink,
  CalendarColumn,
  CalendarLayout,
  DayAvailabilityDot,
  DayCell,
  DaysGrid,
  EmptySlotsNotice,
  FlowGrid,
  FormGrid,
  FormNotice,
  FullWidthField,
  HeadingWrapper,
  MonthNav,
  MonthNavButton,
  Panel,
  QuantityButton,
  QuantityStepper,
  SelectedServiceRow,
  ServiceCard,
  ServiceCardFooter,
  ServicePhoto,
  ServicesGrid,
  SidebarCard,
  SidebarLabel,
  SidebarRow,
  SidebarTitle,
  SidebarTotalRow,
  SlotButton,
  SlotRow,
  SlotsColumn,
  StepActions,
  StepHeading,
  SubmitButtonWrapper,
  WeekdaysRow,
  Wrapper,
} from './Booking.style'

export type BookingProps = {
  eyebrow: string
  heading: string
  lead?: string
  roomImages?: Partial<Record<GhlRoomId, ImageType>>
}

type Step = 'service' | 'addons' | 'datetime' | 'contact'

const TIMEZONE = 'Europe/Warsaw'
const WEEKDAY_LABELS = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

const isPastDay = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}

const formatPLN = (amount: number) => `${amount} zł`

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const formatTimeLabel = (date: Date) =>
  date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })

type MonthGridDay = { date: Date; inMonth: boolean }

const getMonthGridDays = (month: Date): MonthGridDay[] => {
  const first = startOfMonth(month)
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate()
  const leadingBlanks = first.getDay()

  const days: MonthGridDay[] = []

  for (let offset = leadingBlanks; offset > 0; offset -= 1) {
    days.push({
      date: new Date(month.getFullYear(), month.getMonth(), 1 - offset),
      inMonth: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      date: new Date(month.getFullYear(), month.getMonth(), day),
      inMonth: true,
    })
  }

  return days
}

export const Booking: React.FC<BookingProps> = ({
  eyebrow,
  heading,
  lead,
  roomImages,
}) => {
  const [step, setStep] = useState<Step>('service')
  const [roomId, setRoomId] = useState<GhlRoomId | null>(null)
  const [addOnQuantities, setAddOnQuantities] = useState<
    Partial<Record<GhlAddOnId, number>>
  >({})
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(new Date())
  )
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [slots, setSlots] = useState<Date[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const selectedService = roomId ? GHL_SERVICES[roomId] : null
  const extraHours = addOnQuantities['extra-hours'] ?? 0
  const totalDurationMinutes =
    SLOT_DURATION_MINUTES +
    extraHours * (GHL_ADD_ONS['extra-hours'].unitDurationMinutes ?? 0)

  const totalPrice = useMemo(() => {
    if (!selectedService) return 0

    const addOnsTotal = (
      Object.entries(addOnQuantities) as [GhlAddOnId, number | undefined][]
    ).reduce(
      (sum, [id, qty]) => sum + GHL_ADD_ONS[id].pricePerUnit * (qty ?? 0),
      0
    )

    return selectedService.price + addOnsTotal
  }, [selectedService, addOnQuantities])

  const selectedAddOns = useMemo(
    () =>
      (Object.entries(addOnQuantities) as [GhlAddOnId, number | undefined][])
        .filter(([, qty]) => (qty ?? 0) > 0)
        .map(([id, qty]) => {
          const addOn = GHL_ADD_ONS[id]
          const quantity = qty ?? 0
          return {
            id,
            label: addOn.label,
            quantity,
            subtotal: addOn.pricePerUnit * quantity,
          }
        }),
    [addOnQuantities]
  )

  useEffect(() => {
    if (step !== 'datetime' || !roomId || !selectedDay) return

    setIsLoadingSlots(true)
    setSelectedSlot(null)

    getAvailableSlots(roomId, selectedDay, totalDurationMinutes)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setIsLoadingSlots(false))
  }, [step, roomId, selectedDay, totalDurationMinutes])

  const { control, errors, onSubmit, isSubmitting, isSuccess } = useForm({
    schema: BOOKING_FORM_SCHEMA,
    options: { defaultValues: BOOKING_FORM_INIT_VALUES },
    resetOnSubmitSuccess: false,
    submitHandler: async (data) => {
      if (!roomId || !selectedSlot || !selectedService) return

      setSubmitError(null)

      // GHL's own server-side availability check can't be trusted here
      // (see ghl.ts — `overrideAvailability` is set because the staff
      // schedules aren't linked to anything GHL's check can use), so
      // we're the only thing standing between two visitors double
      // booking the same room/slot. Re-verify right before submitting —
      // anything could have been booked since the slot was first fetched
      // (a few minutes on the contact step, another visitor, ...) —
      // instead of trusting the possibly-stale list from the datetime
      // step. This sits outside the try/catch below so its specific
      // message doesn't get overwritten by the generic failure one.
      const freshSlots = await getAvailableSlots(
        roomId,
        selectedSlot,
        totalDurationMinutes
      )
      const isStillAvailable = freshSlots.some(
        (slot) => slot.getTime() === selectedSlot.getTime()
      )

      if (!isStillAvailable) {
        setSubmitError(
          'Ten termin został właśnie zarezerwowany. Wróć i wybierz inny.'
        )
        setSelectedSlot(null)
        setStep('datetime')
        throw new Error('slot-no-longer-available')
      }

      try {
        const contact = await upsertContact({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        })

        const endTime = new Date(
          selectedSlot.getTime() + totalDurationMinutes * 60000
        )

        const addOns = (
          Object.entries(addOnQuantities) as [GhlAddOnId, number | undefined][]
        )
          .filter(([, qty]) => (qty ?? 0) > 0)
          .map(([id, qty]) => {
            const addOn = GHL_ADD_ONS[id]
            return {
              id: addOn.id,
              quantity: qty,
              duration: addOn.unitDurationMinutes
                ? addOn.unitDurationMinutes * (qty ?? 0)
                : undefined,
            }
          })

        await createServiceBooking({
          contactId: contact.id,
          startTime: selectedSlot.toISOString(),
          endTime: endTime.toISOString(),
          timezone: TIMEZONE,
          serviceId: selectedService.serviceId,
          addOns,
          title:
            `${selectedService.label} — ${data.firstName} ${data.lastName ?? ''}`.trim(),
        })
      } catch {
        setSubmitError(
          'Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.'
        )
        throw new Error('booking-failed')
      }
    },
  })

  const toggleAddOn = (id: GhlAddOnId, checked: boolean) => {
    setAddOnQuantities((prev) => ({ ...prev, [id]: checked ? 1 : 0 }))
  }

  const setAddOnQuantity = (id: GhlAddOnId, quantity: number) => {
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, quantity),
    }))
  }

  const selectDay = (date: Date) => {
    setSelectedDay(date)
  }

  const goToDateStep = () => {
    if (!selectedDay) {
      const today = new Date()
      setSelectedDay(today)
      setVisibleMonth(startOfMonth(today))
    }
    setStep('datetime')
  }

  return (
    <Wrapper>
      <Container $variant="wide">
        <HeadingWrapper>
          <SectionHeading eyebrow={eyebrow} lead={lead}>
            {heading}
          </SectionHeading>
        </HeadingWrapper>

        {isSuccess ? (
          <Panel>
            <Text as="h3" $base={H400} $color="ink800">
              Dziękujemy za rezerwację!
            </Text>
            <Text $base={BodyMedium} $color="ink600">
              Potwierdzenie wysłaliśmy na podany adres e-mail. Do zobaczenia w
              Soleil Studio!
            </Text>
          </Panel>
        ) : (
          <FlowGrid>
            <Panel>
              {step !== 'service' && (
                <BackLink
                  type="button"
                  onClick={() => {
                    if (step === 'addons') setStep('service')
                    if (step === 'datetime') setStep('addons')
                    if (step === 'contact') setStep('datetime')
                  }}
                >
                  <Text $base={BodySmall} $color="terracotta">
                    ← Powrót
                  </Text>
                </BackLink>
              )}

              {step === 'service' && (
                <>
                  <StepHeading>
                    <Text as="h3" $base={H400} $color="ink800">
                      Usługi
                    </Text>
                  </StepHeading>

                  <ServicesGrid>
                    {(Object.keys(GHL_SERVICES) as GhlRoomId[]).map((id) => {
                      const service = GHL_SERVICES[id]
                      return (
                        <ServiceCard key={id}>
                          <ServicePhoto>
                            <PhotoFrame
                              tone={pickFromSeed(id, PHOTO_FRAME_TONES)}
                              image={roomImages?.[id]}
                            />
                          </ServicePhoto>

                          <Text $base={BodyMedium} $color="ink800">
                            {service.label}
                          </Text>
                          <ServiceCardFooter>
                            <Text $base={BodySmall} $color="ink600">
                              {formatPLN(service.price)}
                            </Text>
                            <Button
                              type="button"
                              $variant="primary"
                              $size="small"
                              onClick={() => {
                                setRoomId(id)
                                setStep('addons')
                              }}
                            >
                              Umów
                            </Button>
                          </ServiceCardFooter>
                        </ServiceCard>
                      )
                    })}
                  </ServicesGrid>
                </>
              )}

              {step === 'addons' && selectedService && (
                <>
                  <StepHeading>
                    <Text as="h3" $base={H400} $color="ink800">
                      Zatwierdź swoją rezerwację
                    </Text>
                  </StepHeading>

                  <SelectedServiceRow>
                    <Text $base={BodyMedium} $color="ink800">
                      {selectedService.label}
                    </Text>
                    <Text $base={BodySmall} $color="ink600">
                      {formatPLN(selectedService.price)}
                    </Text>
                  </SelectedServiceRow>

                  <AddOnsList>
                    {(
                      Object.entries(GHL_ADD_ONS) as [
                        GhlAddOnId,
                        (typeof GHL_ADD_ONS)[GhlAddOnId],
                      ][]
                    ).map(([id, addOn]) => {
                      const quantity = addOnQuantities[id] ?? 0

                      return (
                        <AddOnRow key={id} htmlFor={`addon-${id}`}>
                          <AddOnCheckbox
                            id={`addon-${id}`}
                            type="checkbox"
                            checked={quantity > 0}
                            onChange={(event) =>
                              toggleAddOn(id, event.target.checked)
                            }
                          />

                          <AddOnInfo>
                            <Text $base={BodySmall} $color="ink800">
                              {addOn.label}
                            </Text>
                            {addOn.description && (
                              <Text $base={BodySmall} $color="ink500">
                                {addOn.description}
                              </Text>
                            )}

                            {addOn.allowsQuantity && quantity > 0 && (
                              <QuantityStepper>
                                <QuantityButton
                                  type="button"
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setAddOnQuantity(id, quantity - 1)
                                  }}
                                  disabled={quantity <= 1}
                                >
                                  −
                                </QuantityButton>
                                <Text $base={BodySmall} $color="ink800">
                                  {quantity}
                                </Text>
                                <QuantityButton
                                  type="button"
                                  onClick={(event) => {
                                    event.preventDefault()
                                    setAddOnQuantity(id, quantity + 1)
                                  }}
                                >
                                  +
                                </QuantityButton>
                              </QuantityStepper>
                            )}
                          </AddOnInfo>

                          <AddOnPrice>
                            <Text $base={BodySmall} $color="ink600">
                              {formatPLN(addOn.pricePerUnit)}
                              {addOn.allowsQuantity && '/h'}
                            </Text>
                          </AddOnPrice>
                        </AddOnRow>
                      )
                    })}
                  </AddOnsList>

                  <StepActions>
                    <Button
                      type="button"
                      $variant="primary"
                      $size="medium"
                      onClick={goToDateStep}
                    >
                      Dalej
                    </Button>
                  </StepActions>
                </>
              )}

              {step === 'datetime' && (
                <>
                  <StepHeading>
                    <Text as="h3" $base={H400} $color="ink800">
                      Wybierz datę i godzinę
                    </Text>
                  </StepHeading>

                  <CalendarLayout>
                    <CalendarColumn>
                      <MonthNav>
                        <MonthNavButton
                          type="button"
                          onClick={() =>
                            setVisibleMonth(
                              (prev) =>
                                new Date(
                                  prev.getFullYear(),
                                  prev.getMonth() - 1,
                                  1
                                )
                            )
                          }
                          disabled={isSameDay(
                            startOfMonth(visibleMonth),
                            startOfMonth(new Date())
                          )}
                        >
                          <Icon src={ChevronLeft} size={14} />
                        </MonthNavButton>

                        <Text $base={BodySmall} $color="ink800">
                          {visibleMonth.toLocaleDateString('pl-PL', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>

                        <MonthNavButton
                          type="button"
                          onClick={() =>
                            setVisibleMonth(
                              (prev) =>
                                new Date(
                                  prev.getFullYear(),
                                  prev.getMonth() + 1,
                                  1
                                )
                            )
                          }
                        >
                          <Icon src={ChevronRight} size={14} />
                        </MonthNavButton>
                      </MonthNav>

                      <WeekdaysRow>
                        {WEEKDAY_LABELS.map((label) => (
                          <Text
                            key={label}
                            as="span"
                            $base={BodySmall}
                            $color="ink500"
                            $align="center"
                          >
                            {label}
                          </Text>
                        ))}
                      </WeekdaysRow>

                      <DaysGrid>
                        {getMonthGridDays(visibleMonth).map(
                          ({ date, inMonth }) => {
                            if (!inMonth) {
                              return (
                                <span
                                  key={date.toISOString()}
                                  aria-hidden="true"
                                />
                              )
                            }

                            const isPast = isPastDay(date)
                            const isSunday = date.getDay() === 0
                            const isActive =
                              selectedDay !== null &&
                              isSameDay(date, selectedDay)

                            return (
                              <DayCell
                                key={date.toISOString()}
                                type="button"
                                $active={isActive}
                                disabled={isPast || isSunday}
                                onClick={() => selectDay(date)}
                              >
                                <Text
                                  as="span"
                                  $base={BodySmall}
                                  $color={isActive ? 'cream' : 'ink800'}
                                >
                                  {date.getDate()}
                                </Text>
                                {!isPast && !isSunday && !isActive && (
                                  <DayAvailabilityDot />
                                )}
                              </DayCell>
                            )
                          }
                        )}
                      </DaysGrid>
                    </CalendarColumn>

                    <SlotsColumn>
                      {isLoadingSlots && (
                        <Text $base={BodySmall} $color="ink500">
                          Sprawdzanie dostępności…
                        </Text>
                      )}

                      {!isLoadingSlots && slots.length === 0 && (
                        <EmptySlotsNotice>
                          <Text $base={BodySmall} $color="ink600">
                            Brak wolnych terminów tego dnia. Wybierz inny dzień.
                          </Text>
                        </EmptySlotsNotice>
                      )}

                      {!isLoadingSlots &&
                        slots.map((slot) => (
                          <SlotRow key={slot.toISOString()}>
                            <SlotButton
                              type="button"
                              $active={
                                selectedSlot !== null &&
                                slot.getTime() === selectedSlot.getTime()
                              }
                              onClick={() => setSelectedSlot(slot)}
                            >
                              <Text $base={BodySmall} $color="inherit">
                                {formatTimeLabel(slot)}
                              </Text>
                            </SlotButton>
                          </SlotRow>
                        ))}
                    </SlotsColumn>
                  </CalendarLayout>

                  <StepActions>
                    <Button
                      type="button"
                      $variant="primary"
                      $size="medium"
                      disabled={!selectedSlot}
                      onClick={() => setStep('contact')}
                    >
                      Dalej
                    </Button>
                  </StepActions>
                </>
              )}

              {step === 'contact' && (
                <>
                  <StepHeading>
                    <Text as="h3" $base={H400} $color="ink800">
                      Wprowadź swoje dane
                    </Text>
                  </StepHeading>

                  {submitError && (
                    <FormNotice>
                      <Text $base={BodySmall} $color="danger">
                        {submitError}
                      </Text>
                    </FormNotice>
                  )}

                  <FormGrid onSubmit={onSubmit}>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Field
                          {...field}
                          label="Imię"
                          placeholder="Imię"
                          errorMessage={errors.firstName?.message}
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Field
                          {...field}
                          label="Nazwisko"
                          placeholder="Nazwisko"
                        />
                      )}
                    />

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Field
                          {...field}
                          label="Telefon *"
                          placeholder="512 345 678"
                          errorMessage={errors.phone?.message}
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Field
                          {...field}
                          type="email"
                          label="Email *"
                          placeholder="twój@email.com"
                          errorMessage={errors.email?.message}
                        />
                      )}
                    />

                    <FullWidthField>
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <Field
                            {...field}
                            $textarea
                            rows={4}
                            label="Dodatkowa wiadomość"
                            placeholder="Dodatkowa wiadomość"
                          />
                        )}
                      />
                    </FullWidthField>
                  </FormGrid>
                </>
              )}
            </Panel>

            <SidebarCard>
              <SidebarTitle>
                <Text as="h4" $base={BodySmall} $color="ink800">
                  Szczegóły rezerwacji
                </Text>
              </SidebarTitle>

              <SidebarRow>
                <SidebarLabel>
                  <Text $base={BodySmall} $color="ink500">
                    Usługi
                  </Text>
                </SidebarLabel>
                {selectedService ? (
                  <Text $base={BodySmall} $color="ink800">
                    {`${selectedService.label} · ${formatPLN(selectedService.price)}`}
                  </Text>
                ) : (
                  <Text $base={BodySmall} $color="ink500">
                    Jeszcze do wyboru
                  </Text>
                )}
              </SidebarRow>

              {selectedAddOns.map((addOn) => (
                <SidebarRow key={addOn.id}>
                  <SidebarLabel>
                    <Text $base={BodySmall} $color="ink500">
                      {addOn.label}
                      {addOn.quantity > 1 && ` ×${addOn.quantity}`}
                    </Text>
                  </SidebarLabel>
                  <Text $base={BodySmall} $color="ink800">
                    {formatPLN(addOn.subtotal)}
                  </Text>
                </SidebarRow>
              ))}

              <SidebarRow>
                <SidebarLabel>
                  <Text $base={BodySmall} $color="ink500">
                    Dzień i godzina
                  </Text>
                </SidebarLabel>
                {selectedSlot ? (
                  <Text $base={BodySmall} $color="ink800">
                    {`${formatDayLabel(selectedSlot)}, ${formatTimeLabel(selectedSlot)}`}
                  </Text>
                ) : (
                  <Text $base={BodySmall} $color="ink500">
                    Jeszcze do wyboru
                  </Text>
                )}
              </SidebarRow>

              <SidebarTotalRow>
                <Text $base={BodyMedium} $color="ink800">
                  Całkowita kwota
                </Text>
                <Text $base={BodyMedium} $color="ink800">
                  {formatPLN(totalPrice)}
                </Text>
              </SidebarTotalRow>

              {step === 'contact' && (
                <SubmitButtonWrapper>
                  <Button
                    type="button"
                    $variant="primary"
                    $size="large"
                    $loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={onSubmit}
                  >
                    Zarezerwuj spotkanie
                  </Button>
                </SubmitButtonWrapper>
              )}
            </SidebarCard>
          </FlowGrid>
        )}
      </Container>
    </Wrapper>
  )
}
