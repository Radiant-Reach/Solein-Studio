import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

import { env } from 'env'

import { isBrowser } from 'utils/isSSR'
import { keys } from 'utils/object'

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i

const name = z.string().min(1, { message: 'Proszę podać imię i nazwisko' })

const phone = z
  .string()
  .min(1, { message: 'Proszę podać numer telefonu' })
  .regex(phoneRegex, { message: 'Numer telefonu jest nieprawidłowy' })

const email = z
  .string()
  .min(1, { message: 'Proszę podać adres e-mail' })
  .email({ message: 'Adres e-mail jest nieprawidłowy' })

const message = z.string().min(1, { message: 'Proszę podać wiadomość' })

const optionalEmail = email.optional()

const optionalPhone = phone.optional()

const optionalMessage = message.optional()

export const requiredAgree = z.literal<boolean>(true, {
  errorMap: () => ({ message: 'Proszę zaznaczyć zgodę' }),
})

export const agree = z.boolean()

const file = isBrowser ? z.instanceof(File).nullable() : z.any()

/**
 * Forms schemas
 */
// Main from schema
export const MAIN_FORM_SCHEMA = z.object({
  name,
  email,
  phone,
  message,
})

export type MainFormSchema = z.infer<typeof MAIN_FORM_SCHEMA>

export const MAIN_FORM_INIT_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: '',
} satisfies MainFormSchema

// Modal form schema
export const MODAL_FORM_SCHEMA = z.object({
  name,
  email,
  phone,
  message,
})

export type ModalFormSchema = z.infer<typeof MAIN_FORM_SCHEMA>

export const MODAL_FORM_INIT_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: '',
} satisfies ModalFormSchema

// Contact (booking inquiry) form schema
export const CONTACT_FORM_SCHEMA = z.object({
  name,
  email,
  phone: optionalPhone,
  eventDate: z.string().optional(),
  message: optionalMessage,
})

export type ContactFormSchema = z.infer<typeof CONTACT_FORM_SCHEMA>

export const CONTACT_FORM_INIT_VALUES = {
  name: '',
  email: '',
  phone: undefined,
  eventDate: undefined,
  message: undefined,
} satisfies ContactFormSchema

// Booking (GHL service booking) form schema
export const BOOKING_FORM_SCHEMA = z.object({
  firstName: name,
  lastName: z.string().optional(),
  phone,
  email,
  message: optionalMessage,
})

export type BookingFormSchema = z.infer<typeof BOOKING_FORM_SCHEMA>

export const BOOKING_FORM_INIT_VALUES = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: undefined,
} satisfies BookingFormSchema

// Job form schema
export const JOB_FORM_SCHEMA = z.object({
  name,
  email: optionalEmail,
  phone: optionalPhone,
  message,
  file,
})

export type JobFormSchema = z.infer<typeof JOB_FORM_SCHEMA>

export const JOB_FORM_INIT_VALUES = {
  name: '',
  email: undefined,
  phone: undefined,
  message: '',
  file: null,
} satisfies JobFormSchema

/**
 * Form Types
 */
export type FormType =
  | 'general'
  | 'flat'
  | 'career'
  | 'land-purchase'
  | 'technical-service'
  | 'customer-service'

type FormSchema = {
  general: MainFormSchema
  flat: MainFormSchema
  career: JobFormSchema
  'land-purchase': MainFormSchema
  'technical-service': MainFormSchema
  'customer-service': MainFormSchema
}

type FormAgreements = boolean[]

/**
 * Form data
 */
export type ExtraDataType = {
  investmentName?: string
  flatName?: string
  rooms?: string
  city?: string
  district?: string
}

export const generateFormData = <T extends FormType>(
  type: T,
  data: FormSchema[T],
  agreements: FormAgreements,
  extraData?: ExtraDataType
): FormData => {
  const formData = new FormData()

  agreements.forEach((agreement, index) => {
    formData.append(`consent${index}`, agreement.toString())
  })
  formData.append('url', window.location.href)

  switch (type) {
    case 'career': {
      const careerData = data as JobFormSchema

      formData.append('type', type)
      formData.append('fullname', careerData.name)
      formData.append('email', careerData.email || '')
      formData.append('phone', careerData.phone || '')
      formData.append('message', careerData.message)

      if (careerData.file) {
        formData.append('attachments ', careerData.file)
      }
      break
    }

    default: {
      const generalData = data as MainFormSchema

      formData.append('type', type)
      formData.append('fullname', generalData.name)
      formData.append('email', generalData.email)
      formData.append('phone', generalData.phone)
      formData.append('message', generalData.message)
    }
  }

  if (extraData?.investmentName) {
    formData.append('investmentName', extraData.investmentName)
  }

  if (extraData?.flatName) {
    formData.append('flatName', extraData.flatName)
  }

  if (extraData?.rooms) {
    formData.append('rooms', extraData.rooms)
  }

  if (extraData?.city) {
    formData.append('city', extraData.city)
  }

  if (extraData?.district) {
    formData.append('district', extraData.district)
  }

  formData.append('lang', 'pl')

  return formData
}

/**
 * Generate agreements
 */
export const generateAgreements = (agreements: {
  [x: `agree${number}`]: boolean
}): FormAgreements =>
  keys(agreements)
    .filter((key): key is `agree${number}` => key.startsWith('agree'))
    .map((key) => agreements[key])

/**
 * Send form
 */
type SendFormSuccessResponse = {
  code: 200
  status: 'success'
  leadId: string
  message: string
}
type SendFormErrorResponse = {
  code: 400
  status: 'error'
  message?: string
  validation?: Record<string, string>
}

export const sendForm = async <T extends FormType, S extends FormSchema[T]>(
  type: T,
  data: S,
  agreements: FormAgreements = [],
  extraData?: ExtraDataType
) =>
  axios.post<
    any,
    AxiosResponse<SendFormSuccessResponse | SendFormErrorResponse>
  >(
    `${env.GATSBY_MAILER_URL}`,
    generateFormData(type, data, agreements, extraData),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
