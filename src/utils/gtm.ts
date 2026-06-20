import { isBrowser } from 'utils/isSSR'

export type GtmEvent = {
  event: string
  lead_id?: string
  user_email?: string
  user_phone?: string
  form_name?: string
}
export const sendGtmEvent = (event: GtmEvent) => {
  if (isBrowser) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  }
}
