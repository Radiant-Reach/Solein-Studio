import React, { useState } from 'react'

import { Input } from 'components/atoms/Input'

import * as S from './Contact1.style'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type InfoItem = {
  icon: string
  title: string
  content: React.ReactNode
}

type Contact1Props = {
  id?: string
  title?: React.ReactNode
  subtitle?: string
  infoItems?: InfoItem[]
  mapSrc?: string
  webhookUrl?: string
  submitLabel?: string
}

const SUBMIT_LABELS: Record<FormStatus, string> = {
  idle: 'Send Message',
  submitting: 'Sending...',
  success: 'Message Sent! ✓',
  error: 'Error — Try Again',
}

const DEFAULT_INFO: InfoItem[] = [
  {
    icon: '📍',
    title: 'Visit Our Flagship Store',
    content: (
      <>
        123 Fashion Avenue
        <br />
        Bangkok, Thailand 10110
        <br />
        Siam District
      </>
    ),
  },
  {
    icon: '📞',
    title: 'Call Us',
    content: (
      <>
        Main: <a href="tel:+66021234567">+66 02 123 4567</a>
        <br />
        Support: <a href="tel:+66021234568">+66 02 123 4568</a>
        <br />
        Mon–Fri, 9AM–6PM ICT
      </>
    ),
  },
  {
    icon: '✉️',
    title: 'Email Us',
    content: (
      <>
        General: <a href="mailto:hello@noir.com">hello@noir.com</a>
        <br />
        Support: <a href="mailto:support@noir.com">support@noir.com</a>
        <br />
        Press: <a href="mailto:press@noir.com">press@noir.com</a>
      </>
    ),
  },
]

const DEFAULT_MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.551370220076!2d100.53515!3d13.730314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2993fa2f8c6d9%3A0x92cf0e47c4c2ed08!2sSilom%20MRT%20Station!5e0!3m2!1sen!2sth!4v1697000000000'

export const Contact1: React.FC<Contact1Props> = ({
  id = 'contact',
  title = 'Get In Touch',
  subtitle = "We'd love to hear from you",
  infoItems = DEFAULT_INFO,
  mapSrc = DEFAULT_MAP_SRC,
  webhookUrl,
  submitLabel = 'Send Message',
}) => {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
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
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        })
        if (!res.ok) throw new Error('Server error')
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      setStatus('success')
      setFields({ firstName: '', lastName: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <S.Section id={id}>
      <S.Container>
        <S.Header>
          <S.SectionTitle>{title}</S.SectionTitle>
          <S.Subtitle>{subtitle}</S.Subtitle>
        </S.Header>

        <S.Content>
          <S.FormWrapper>
            <form onSubmit={handleSubmit}>
              <S.FormRow>
                <S.FormGroup>
                  <S.FormLabel htmlFor="contact1-firstName">First Name</S.FormLabel>
                  <Input
                    id="contact1-firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={fields.firstName}
                    onChange={handleChange}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel htmlFor="contact1-lastName">Last Name</S.FormLabel>
                  <Input
                    id="contact1-lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={fields.lastName}
                    onChange={handleChange}
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <S.FormLabel htmlFor="contact1-email">Email</S.FormLabel>
                <Input
                  id="contact1-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={fields.email}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="contact1-subject">Subject</S.FormLabel>
                <Input
                  id="contact1-subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  value={fields.subject}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel htmlFor="contact1-message">Message</S.FormLabel>
                <Input
                  $textarea
                  id="contact1-message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  value={fields.message}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.SubmitButton
                as="button"
                type="submit"
                $variant="primary"
                $size="large"
                $success={status === 'success'}
                disabled={status === 'submitting'}
              >
                {status === 'idle' ? submitLabel : SUBMIT_LABELS[status]}
              </S.SubmitButton>
            </form>
          </S.FormWrapper>

          <S.InfoPanel>
            {infoItems.map(({ icon, title: itemTitle, content }) => (
              <S.InfoItem key={itemTitle}>
                <S.InfoIcon>{icon}</S.InfoIcon>
                <S.InfoContent>
                  <S.InfoItemTitle>{itemTitle}</S.InfoItemTitle>
                  <S.InfoText>{content}</S.InfoText>
                </S.InfoContent>
              </S.InfoItem>
            ))}
          </S.InfoPanel>
        </S.Content>

        {mapSrc && (
          <S.MapContainer>
            <iframe
              src={mapSrc}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </S.MapContainer>
        )}
      </S.Container>
    </S.Section>
  )
}
