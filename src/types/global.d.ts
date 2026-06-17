import type { GtmEvent } from 'utils/gtm'

declare global {
  interface Window {
    dataLayer: GtmEvent[]
  }
}

export {}
