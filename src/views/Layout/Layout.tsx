/* eslint-disable react/jsx-no-useless-fragment */
import React, { Suspense, lazy } from 'react'

import { env } from 'env'

import { Footer } from 'components/organisms/Footer'
import { Navigation } from 'components/organisms/Navigation'

import { Main } from './Layout.style'

const Breakpoint = lazy(() => import('components/organisms/Breakpoint'))

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {env.GATSBY_BREAKPOINT_PREVIEW && (
        <Suspense fallback={<></>}>
          <Breakpoint />
        </Suspense>
      )}

      <Navigation />

      <Main>{children}</Main>

      <Footer />
    </>
  )
}
