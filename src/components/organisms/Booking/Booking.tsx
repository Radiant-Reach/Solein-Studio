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
  RR_CALENDARS,
  RR_MESSAGE_FORM_ID,
  RrRoomId,
  SLOT_DURATION_MINUTES,
} from 'constants/rr'

import { useForm } from 'hooks/useForm'

import { pickFromSeed } from 'utils/pickFromSeed'
import { RrAddOn, createAppointment, getAddOns } from 'utils/rr'
import {
  getAvailableSlots,
  getDaysWithAvailability,
  toDateKey,
} from 'utils/rrAvailability'

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
  SuccessDetails,
  WeekdaysRow,
  Wrapper,
} from './Booking.style'

export type BookingProps = {
  eyebrow: string
  heading: string
  lead?: string
  roomImages?: Partial<Record<RrRoomId, ImageType>>
}

type Step = 'service' | 'addons' | 'datetime' | 'contact'

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
  const [roomId, setRoomId] = useState<RrRoomId | null>(null)
  const [addOns, setAddOns] = useState<RrAddOn[]>([])
  const [addOnQuantities, setAddOnQuantities] = useState<
    Record<string, number>
  >({})
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(new Date())
  )
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [availableDays, setAvailableDays] = useState<Set<string> | null>(null)
  const [slots, setSlots] = useState<Date[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Add-ons (name, description, price, whether they extend the booking's
  // duration) are configured in RR Dashboard's Settings now, not hardcoded
  // here -- fetched once, since they aren't room-specific.
  useEffect(() => {
    getAddOns()
      .then(setAddOns)
      .catch(() => setAddOns([]))
  }, [])

  const selectedService = roomId ? RR_CALENDARS[roomId] : null

  // Add-on prices come back from RR Dashboard in grosze (smallest currency
  // unit); this site still works in whole PLN everywhere else (formatPLN,
  // RR_CALENDARS' room prices), so divide down once here.
  const totalDurationMinutes = useMemo(
    () =>
      SLOT_DURATION_MINUTES +
      addOns.reduce(
        (sum, addOn) =>
          sum + (addOn.durationMinutes ?? 0) * (addOnQuantities[addOn.id] ?? 0),
        0
      ),
    [addOns, addOnQuantities]
  )

  const totalPrice = useMemo(() => {
    if (!selectedService) return 0

    const addOnsTotal = addOns.reduce(
      (sum, addOn) =>
        sum + (addOn.price / 100) * (addOnQuantities[addOn.id] ?? 0),
      0
    )

    return selectedService.price + addOnsTotal
  }, [selectedService, addOns, addOnQuantities])

  const selectedAddOns = useMemo(
    () =>
      addOns
        .map((addOn) => ({ addOn, quantity: addOnQuantities[addOn.id] ?? 0 }))
        .filter(({ quantity }) => quantity > 0)
        .map(({ addOn, quantity }) => ({
          id: addOn.id,
          label: addOn.name,
          quantity,
          subtotal: (addOn.price / 100) * quantity,
        })),
    [addOns, addOnQuantities]
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

  useEffect(() => {
    if (step !== 'datetime' || !roomId) return

    setAvailableDays(null)

    const monthEnd = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    )

    getDaysWithAvailability(
      roomId,
      visibleMonth,
      monthEnd,
      totalDurationMinutes
    )
      .then(setAvailableDays)
      .catch(() => setAvailableDays(new Set()))
  }, [step, roomId, visibleMonth, totalDurationMinutes])

  const { control, errors, onSubmit, isSubmitting, isSuccess, getFormValues } =
    useForm({
      schema: BOOKING_FORM_SCHEMA,
      options: { defaultValues: BOOKING_FORM_INIT_VALUES },
      resetOnSubmitSuccess: false,
      submitHandler: async (data) => {
        if (!roomId || !selectedSlot || !selectedService) return

        setSubmitError(null)

        // RR Dashboard validates same-calendar/resource conflicts on its own
        // when the appointment is created (it knows "Całe Studio" and the two
        // individual rooms share resources, see constants/rr.ts), but
        // re-verify right before submitting anyway, since anything could have
        // been booked since the slot was first fetched (a few minutes on the
        // contact step, another visitor, ...) and we'd rather show a clear
        // "already booked" message than a generic failure one. This sits
        // outside the try/catch below so its specific message doesn't get
        // overwritten by the generic failure one.
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
          const endTime = new Date(
            selectedSlot.getTime() + totalDurationMinutes * 60000
          )

          // RR Dashboard's services have no native add-ons concept either —
          // fold the selection into notes as plain text so staff still see it,
          // even though it isn't itemized/billed there.
          const addOnsSummary = selectedAddOns
            .map((addOn) =>
              addOn.quantity > 1
                ? `${addOn.label} ×${addOn.quantity}`
                : addOn.label
            )
            .join(', ')

          await createAppointment({
            calendarId: selectedService.calendarId,
            serviceId: selectedService.serviceId,
            assignedUserId: selectedService.assignedUserId,
            startTime: selectedSlot.toISOString(),
            endTime: endTime.toISOString(),
            title:
              `${selectedService.label} — ${data.firstName} ${data.lastName ?? ''}`.trim(),
            notes: addOnsSummary
              ? `Dodatki: ${addOnsSummary}. Łączna kwota: ${totalPrice} zł.`
              : `Łączna kwota: ${totalPrice} zł.`,
            customerName: `${data.firstName} ${data.lastName ?? ''}`.trim(),
            customerEmail: data.email,
            customerPhone: data.phone,
            addOns: selectedAddOns.map(({ id, quantity }) => ({
              addOnId: id,
              quantity,
            })),
            // The customer's own free-text message used to be collected by
            // this form and then silently dropped -- never sent anywhere,
            // see git history. RR Dashboard's forms feature is the proper
            // home for it now: a real, staff-visible field on the booking
            // rather than folded into notes as plain text like the add-ons
            // summary above (which has no structured equivalent on RR's side).
            formId: data.message ? RR_MESSAGE_FORM_ID : undefined,
            formResponses: data.message ? { message: data.message } : undefined,
          })
        } catch {
          setSubmitError(
            'Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.'
          )
          throw new Error('booking-failed')
        }
      },
    })

  const toggleAddOn = (id: string, checked: boolean) => {
    setAddOnQuantities((prev) => ({ ...prev, [id]: checked ? 1 : 0 }))
  }

  const setAddOnQuantity = (id: string, quantity: number) => {
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

            {selectedService && selectedSlot && (
              <SuccessDetails>
                <SidebarTitle>
                  <Text $base={BodyMedium} $color="ink800">
                    Szczegóły rezerwacji
                  </Text>
                </SidebarTitle>

                <SidebarRow>
                  <SidebarLabel>
                    <Text $base={BodySmall} $color="ink600">
                      Usługa
                    </Text>
                  </SidebarLabel>
                  <Text $base={BodySmall} $color="ink800">
                    {selectedService.label}
                  </Text>
                </SidebarRow>

                <SidebarRow>
                  <SidebarLabel>
                    <Text $base={BodySmall} $color="ink600">
                      Termin
                    </Text>
                  </SidebarLabel>
                  <Text $base={BodySmall} $color="ink800">
                    {formatDayLabel(selectedSlot)},{' '}
                    {formatTimeLabel(selectedSlot)}–
                    {formatTimeLabel(
                      new Date(
                        selectedSlot.getTime() + totalDurationMinutes * 60000
                      )
                    )}
                  </Text>
                </SidebarRow>

                {selectedAddOns.length > 0 && (
                  <SidebarRow>
                    <SidebarLabel>
                      <Text $base={BodySmall} $color="ink600">
                        Dodatki
                      </Text>
                    </SidebarLabel>
                    <Text $base={BodySmall} $color="ink800">
                      {selectedAddOns
                        .map((addOn) =>
                          addOn.quantity > 1
                            ? `${addOn.label} ×${addOn.quantity}`
                            : addOn.label
                        )
                        .join(', ')}
                    </Text>
                  </SidebarRow>
                )}

                <SidebarRow>
                  <SidebarLabel>
                    <Text $base={BodySmall} $color="ink600">
                      Dane kontaktowe
                    </Text>
                  </SidebarLabel>
                  <Text $base={BodySmall} $color="ink800">
                    {`${getFormValues('firstName')} ${getFormValues('lastName') ?? ''}`.trim()}
                    <br />
                    {getFormValues('email')}
                    <br />
                    {getFormValues('phone')}
                  </Text>
                </SidebarRow>

                <SidebarTotalRow>
                  <Text $base={BodyMedium} $color="ink800">
                    Łączna kwota
                  </Text>
                  <Text $base={BodyMedium} $color="ink800">
                    {formatPLN(totalPrice)}
                  </Text>
                </SidebarTotalRow>
              </SuccessDetails>
            )}
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
                    {(Object.keys(RR_CALENDARS) as RrRoomId[]).map((id) => {
                      const service = RR_CALENDARS[id]
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
                    {addOns.map((addOn) => {
                      const quantity = addOnQuantities[addOn.id] ?? 0

                      return (
                        <AddOnRow key={addOn.id} htmlFor={`addon-${addOn.id}`}>
                          <AddOnCheckbox
                            id={`addon-${addOn.id}`}
                            type="checkbox"
                            checked={quantity > 0}
                            onChange={(event) =>
                              toggleAddOn(addOn.id, event.target.checked)
                            }
                          />

                          <AddOnInfo>
                            <Text $base={BodySmall} $color="ink800">
                              {addOn.name}
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
                                    setAddOnQuantity(addOn.id, quantity - 1)
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
                                    setAddOnQuantity(addOn.id, quantity + 1)
                                  }}
                                >
                                  +
                                </QuantityButton>
                              </QuantityStepper>
                            )}
                          </AddOnInfo>

                          <AddOnPrice>
                            <Text $base={BodySmall} $color="ink600">
                              {formatPLN(addOn.price / 100)}
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
                            const isActive =
                              selectedDay !== null &&
                              isSameDay(date, selectedDay)
                            // While the month's availability is still
                            // loading (null), don't gray anything out yet
                            // beyond past days — avoids briefly flashing
                            // every day as unavailable.
                            const hasAvailability =
                              availableDays === null ||
                              availableDays.has(toDateKey(date))
                            const dayColor = isActive
                              ? 'cream'
                              : isPast || !hasAvailability
                                ? 'ink500'
                                : 'ink800'

                            return (
                              <DayCell
                                key={date.toISOString()}
                                type="button"
                                $active={isActive}
                                disabled={isPast || !hasAvailability}
                                onClick={() => selectDay(date)}
                              >
                                <Text
                                  as="span"
                                  $base={BodySmall}
                                  $color={dayColor}
                                >
                                  {date.getDate()}
                                </Text>
                                {!isPast && hasAvailability && !isActive && (
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
