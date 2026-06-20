import React from 'react'
import { Controller } from 'react-hook-form'

import { AmenityChip } from 'components/atoms/AmenityChip'
import { Button } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Field } from 'components/atoms/Input/Field'
import { PhotoFrame } from 'components/atoms/PhotoFrame'
import { BodyMedium, BodySmall, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import { CONTACT_FORM_INIT_VALUES, CONTACT_FORM_SCHEMA } from 'constants/form'

import { useForm } from 'hooks/useForm'

import { sendGtmEvent } from 'utils/gtm'

import CoffeeIcon from 'assets/images/icons/icon-coffee.png'
import ParkingIcon from 'assets/images/icons/icon-parking.png'
import PinIcon from 'assets/images/icons/icon-pin.png'
import SunIcon from 'assets/images/icons/icon-sun.png'

import {
  AmenityList,
  ContactLink,
  ContactLinks,
  FormGrid,
  FullWidthField,
  Grid,
  HeadingWrapper,
  InfoCard,
  InfoColumn,
  InfoEyebrow,
  PhotoTeaser,
  SuccessIcon,
  SuccessPanel,
  Wrapper,
} from './Contact.style'

export type ContactProps = {
  eyebrow: string
  heading: string
  lead: string
  photoLabel: string
  address: string
  hours: string
  parking: string
  email: string
  phone: string
}

export const Contact: React.FC<ContactProps> = ({
  eyebrow,
  heading,
  lead,
  photoLabel,
  address,
  hours,
  parking,
  email,
  phone,
}) => {
  const {
    control,
    errors,
    isSubmitting,
    isSuccess,
    onSubmit: onFormSubmit,
  } = useForm({
    schema: CONTACT_FORM_SCHEMA,
    options: { defaultValues: CONTACT_FORM_INIT_VALUES },
    resetOnSubmitSuccess: false,
    // No booking backend wired up yet for Soleil Studio — replace with a real
    // submission call once one exists.
    submitHandler: async () => {
      sendGtmEvent({ event: 'form_submit', form_name: 'contact' })
    },
  })

  const phoneHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <Wrapper>
      <Container $variant="wide">
        <Grid>
          <div>
            <HeadingWrapper>
              <SectionHeading eyebrow={eyebrow} lead={lead}>
                {heading}
              </SectionHeading>
            </HeadingWrapper>

            {isSuccess ? (
              <SuccessPanel>
                <SuccessIcon src={SunIcon} alt="" />
                <Text as="h3" $base={H400} $color="ink800">
                  Dziękujemy!
                </Text>
                <Text $base={BodyMedium} $color="ink600">
                  Twoje zapytanie do nas dotarło. Odezwiemy się wkrótce.
                </Text>
              </SuccessPanel>
            ) : (
              <FormGrid onSubmit={onFormSubmit}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Field
                      {...field}
                      label="Imię i nazwisko"
                      placeholder="Jak się do Ciebie zwracać?"
                      errorMessage={errors.name?.message}
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
                      label="E-mail"
                      placeholder="ty@example.com"
                      errorMessage={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Field
                      {...field}
                      label="Telefon"
                      placeholder="+48 ___ ___ ___"
                      errorMessage={errors.phone?.message}
                    />
                  )}
                />

                <Controller
                  name="eventDate"
                  control={control}
                  render={({ field }) => (
                    <Field {...field} type="date" label="Data wydarzenia" />
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
                        rows={5}
                        label="Wiadomość"
                        placeholder="Jaką salę i termin masz na myśli? Ile osób planujesz?"
                        errorMessage={errors.message?.message}
                      />
                    )}
                  />
                </FullWidthField>

                <FullWidthField>
                  <Button
                    type="submit"
                    $variant="primary"
                    $size="large"
                    $loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Wyślij zapytanie
                  </Button>
                </FullWidthField>
              </FormGrid>
            )}
          </div>

          <InfoColumn>
            <PhotoTeaser>
              <PhotoFrame tone="terracotta" label={photoLabel} />
            </PhotoTeaser>

            <InfoCard>
              <InfoEyebrow>
                <Text
                  as="span"
                  $base={BodySmall}
                  $transform="uppercase"
                  $color="ink600"
                >
                  Studio
                </Text>
              </InfoEyebrow>

              <AmenityList>
                <AmenityChip icon={PinIcon} label={address} />
                <AmenityChip icon={CoffeeIcon} label={hours} />
                <AmenityChip icon={ParkingIcon} label={parking} />
              </AmenityList>

              <ContactLinks>
                <ContactLink
                  to={`mailto:${email}`}
                  dangerouslySetInnerHTML={{ __html: email }}
                />
                <ContactLink
                  to={phoneHref}
                  dangerouslySetInnerHTML={{ __html: phone }}
                />
              </ContactLinks>
            </InfoCard>
          </InfoColumn>
        </Grid>
      </Container>
    </Wrapper>
  )
}
