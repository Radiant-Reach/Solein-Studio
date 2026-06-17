import React, { useState } from 'react'

import { Button } from 'components/atoms/Button'
import { Input } from 'components/atoms/Input'

import * as S from './Hero3.style'

const DEFAULT_BG =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69adddb8e041da4849a19a8b.png'
const DEFAULT_BADGE =
  'https://assets.cdn.filesafe.space/7UnFVyWK1W17MytfitQR/media/69b6a0ddeaf0816cf079ea95.png'
const DEFAULT_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/7UnFVyWK1W17MytfitQR/webhook-trigger/617de256-1940-4061-b7a8-ff3ce1565cde'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type Hero3Props = {
  id?: string
  backgroundImage?: string
  description?: string
  reviewsBadgeSrc?: string
  reviewsText?: string
  ctaLabel?: string
  ctaHref?: string
  formEyebrow?: string
  formTitle?: React.ReactNode
  formDescription?: string
  webhookUrl?: string
}

const SUBMIT_LABELS: Record<FormStatus, string> = {
  idle: 'Wyślij',
  submitting: 'Wysyłanie...',
  success: 'Wiadomość wysłana! ✓',
  error: 'Błąd — Spróbuj ponownie',
}

export const Hero3: React.FC<Hero3Props> = ({
  id = 'home',
  backgroundImage = DEFAULT_BG,
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere a erat vel fermentum. Aenean nisl enim, facilisis non ex in, fringilla placerat nisl.',
  reviewsBadgeSrc = DEFAULT_BADGE,
  reviewsText = '300 pięciogwiazdkowych opinii',
  ctaLabel = 'Zobacz nasze Usługi',
  ctaHref = '#collections',
  formEyebrow = 'Napisz do nas',
  formTitle = (
    <>
      Zrób <em>Pierwszy</em> Krok
    </>
  ),
  formDescription = 'Wypełnij formularz poniżej, a odezwiemy się najszybciej jak to możliwe.',
  webhookUrl = DEFAULT_WEBHOOK,
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
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
    <S.HeroSection id={id} $bgImage={backgroundImage}>
      <S.HeroBg />
      <S.HeroContainer>
        <S.HeroLeft>
          <S.HeroTitle>
            <S.HeroLine $delay={0.2}>
              <span>Redefine</span>
            </S.HeroLine>
            <S.HeroLine $delay={0.3}>
              <span>
                Your <S.HeroAccent>Style</S.HeroAccent>
              </span>
            </S.HeroLine>
            <S.HeroLine $delay={0.4}>
              <span>Revolution</span>
            </S.HeroLine>
          </S.HeroTitle>

          <S.HeroDescription>{description}</S.HeroDescription>

          <S.HeroGoogleReviews>
            <img src={reviewsBadgeSrc} alt="Google 5 stars" />
            <S.HeroGoogleReviewsText>{reviewsText}</S.HeroGoogleReviewsText>
          </S.HeroGoogleReviews>

          <S.HeroCtaGroup>
            <Button as="a" href={ctaHref} $variant="primary" $size="large">
              {ctaLabel}
            </Button>
          </S.HeroCtaGroup>
        </S.HeroLeft>

        <S.HeroRight>
          <S.HeroFormWrap>
            <S.HeroFormHeader>
              <S.HeroFormEyebrow>{formEyebrow}</S.HeroFormEyebrow>
              <S.HeroFormTitle>{formTitle}</S.HeroFormTitle>
              <S.HeroFormSubtitle>{formDescription}</S.HeroFormSubtitle>
            </S.HeroFormHeader>

            <form onSubmit={handleSubmit}>
              <S.HeroNameRow>
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
              </S.HeroNameRow>

              <S.HeroFormField>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Numer telefonu"
                  autoComplete="tel"
                  required
                  value={fields.phone}
                  onChange={handleChange}
                />
              </S.HeroFormField>

              <S.HeroFormField>
                <Input
                  $textarea
                  name="message"
                  placeholder="Twoja wiadomość"
                  value={fields.message}
                  onChange={handleChange}
                />
              </S.HeroFormField>

              <S.HeroSubmitButton
                as="button"
                type="submit"
                $variant="primary"
                $size="large"
                $success={status === 'success'}
                $error={status === 'error'}
                disabled={status === 'submitting'}
              >
                {SUBMIT_LABELS[status]}
              </S.HeroSubmitButton>
            </form>
          </S.HeroFormWrap>
        </S.HeroRight>
      </S.HeroContainer>

      <S.HeroScrollIndicator>
        <span />
      </S.HeroScrollIndicator>
    </S.HeroSection>
  )
}
