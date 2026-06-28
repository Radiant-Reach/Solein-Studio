import { isBrowser, isSSR } from 'utils/isSSR'
import { keys } from 'utils/object'

const client = {
  GATSBY_BREAKPOINT_PREVIEW: process.env.GATSBY_BREAKPOINT_PREVIEW === 'true',
  GATSBY_ROBOTS: process.env.GATSBY_ROBOTS!,
  GATSBY_DEBUG_MODE: process.env.GATSBY_DEBUG_MODE === 'true',
  GATSBY_MAILER_URL: process.env.GATSBY_MAILER_URL!,
  GATSBY_GHL_API_KEY: process.env.GATSBY_GHL_API_KEY!,
  GATSBY_RR_API_BASE_URL: process.env.GATSBY_RR_API_BASE_URL!,
  GATSBY_RR_API_KEY: process.env.GATSBY_RR_API_KEY!,
}

const server = {
  WORDPRESS_URL: process.env.WORDPRESS_URL as string,
}

const verifyEnv = <T extends typeof client | typeof server>(
  env: T,
  optional: (keyof T)[]
) => {
  keys(env).forEach((key) => {
    if (!env[key] && !optional.includes(key)) {
      const message = `Missing env variable: ${String(key)}`
      // eslint-disable-next-line no-console
      console.error(message)
    }
  })
  return true
}

if (isBrowser) {
  verifyEnv(client, ['GATSBY_BREAKPOINT_PREVIEW'])
}

if (isSSR) {
  verifyEnv(server, [])
}

export const env = {
  ...client,
  ...(isSSR ? server : {}),
}

export type ENV = typeof env
