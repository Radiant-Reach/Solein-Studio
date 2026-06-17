import { navigate as gatsbyNavigate } from 'gatsby'

type NavigateOptions = {
  locale?: 'pl' | 'en'
  replace?: boolean
  state?: Record<string, unknown>
}
export const navigate = (link: string, options?: NavigateOptions) => {
  const urlWithEn = window.location.pathname.startsWith('/en')
  const currentLocale = options?.locale ?? (urlWithEn ? 'en' : 'pl')

  gatsbyNavigate(`${currentLocale === 'pl' ? '' : '/en'}${link}`, {
    replace: options?.replace,
    state: options?.state,
  })
}
