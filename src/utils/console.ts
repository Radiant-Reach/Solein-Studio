import { env } from 'env'

type LogType = 'error' | 'prod' | 'debug'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const consoleLog = (type: LogType, params: any[]) => {
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  switch (type) {
    case 'error':
      // eslint-disable-next-line no-console
      console.error(`[${timestamp}] ERROR:`, ...params)
      break
    case 'prod':
      // eslint-disable-next-line no-console
      console.log(`[${timestamp}] PROD:`, ...params)
      break
    case 'debug':
    default:
      if (IS_PRODUCTION || !env.GATSBY_DEBUG_MODE) return
      // eslint-disable-next-line no-console
      console.log(`[${timestamp}] DEBUG:`, ...params)
      break
  }
}

// Usage:
// consoleLog('error', ['Something went wrong', error]);
// consoleLog('prod', ['Important production message']);
// consoleLog('debug', ['Debug info', { data }]);
