import React, { useState } from 'react'

import { Input } from 'components/atoms/Input'

import * as S from './Contact2.style'

const DEFAULT_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/OZeIsjuGLP70x007psf5/webhook-trigger/AYiNZiP73brDdyQoozal'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const SUBMIT_LABELS: Record<FormStatus, string> = {
  idle: 'Wyślij',
  submitting: 'Wysyłanie...',
  success: 'Wiadomość wysłana! ✓',
  error: 'Błąd — Spróbuj ponownie',
}

type Contact2Props = {
  id?: string
  backgroundImage?: string
  mapSrc?: string
  mapHeight?: number
  emailHref?: string
  emailLabel?: string
  phoneHref?: string
  phoneLabel?: string
  formEyebrow?: string
  formTitle?: React.ReactNode
  formDescription?: string
  webhookUrl?: string
  submitLabel?: string
}

export const Contact2: React.FC<Contact2Props> = ({
  id = 'contact',
  backgroundImage,
  mapSrc = '',
  mapHeight = 420,
  emailHref = 'mailto:',
  emailLabel = '',
  phoneHref = 'tel:',
  phoneLabel = '',
  formEyebrow = 'Napisz do nas',
  formTitle = (
    <>
      Zrób <em>Pierwszy</em> Krok
    </>
  ),
  formDescription = 'Wypełnij formularz poniżej, a odezwiemy się najszybciej jak to możliwe.',
  webhookUrl = DEFAULT_WEBHOOK,
  submitLabel = 'Wyślij',
}) => {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (!res.ok) throw new Error('Server error')

      setStatus('success')
      setFields({ first_name: '', last_name: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <S.Section id={id} $bgImage={backgroundImage}>
      <S.Container>
        <S.MapWrap>
          {mapSrc && (
            <iframe
              src={mapSrc}
              width="100%"
              height={mapHeight}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          )}

          <S.InfoRow>
            <S.InfoCard href={emailHref}>
              <S.InfoCardIcon>📧</S.InfoCardIcon>
              <div>
                <S.InfoCardTitle>E-mail</S.InfoCardTitle>
                <S.InfoCardValue>{emailLabel}</S.InfoCardValue>
              </div>
            </S.InfoCard>

            <S.InfoCard href={phoneHref}>
              <S.InfoCardIcon>📱</S.InfoCardIcon>
              <div>
                <S.InfoCardTitle>Telefon</S.InfoCardTitle>
                <S.InfoCardValue>{phoneLabel}</S.InfoCardValue>
              </div>
            </S.InfoCard>
          </S.InfoRow>
        </S.MapWrap>

        <S.FormWrap>
          <S.FormHeader>
            <S.FormEyebrow>{formEyebrow}</S.FormEyebrow>
            <S.FormTitle>{formTitle}</S.FormTitle>
            <S.FormDescription>{formDescription}</S.FormDescription>
          </S.FormHeader>

          <form onSubmit={handleSubmit}>
            <S.NameRow>
              <Input
                name="first_name"
                type="text"
                placeholder="Imię"
                autoComplete="given-name"
                required
                value={fields.first_name}
                onChange={handleChange}
              />
              <Input
                name="last_name"
                type="text"
                placeholder="Nazwisko"
                autoComplete="family-name"
                required
                value={fields.last_name}
                onChange={handleChange}
              />
            </S.NameRow>

            <S.FormField>
              <Input
                name="phone"
                type="tel"
                placeholder="Numer telefonu"
                autoComplete="tel"
                required
                value={fields.phone}
                onChange={handleChange}
              />
            </S.FormField>

            <S.FormField>
              <Input
                $textarea
                name="message"
                placeholder="Twoja wiadomość"
                value={fields.message}
                onChange={handleChange}
              />
            </S.FormField>

            <S.SubmitButton
              as="button"
              type="submit"
              $variant="primary"
              $size="large"
              $success={status === 'success'}
              $error={status === 'error'}
              disabled={status === 'submitting'}
            >
              {status === 'idle' ? submitLabel : SUBMIT_LABELS[status]}
            </S.SubmitButton>
          </form>
        </S.FormWrap>
      </S.Container>
    </S.Section>
  )
}
