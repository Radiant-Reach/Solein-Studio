/* eslint-disable react/jsx-no-useless-fragment */
import React, { Suspense, lazy } from 'react'

import { env } from 'env'

import { Footer } from 'components/organisms/Footer'
import { Navigation } from 'components/organisms/Navigation'
import { NotificationBar } from 'components/organisms/NotificationBar'

import { useNotificationBar } from 'hooks/cms/useNotificationBar'

import { Main } from './Layout.style'

const Breakpoint = lazy(() => import('components/organisms/Breakpoint'))

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isVisible: notificationBarVisible } = useNotificationBar()

  return (
    <>
      {env.GATSBY_BREAKPOINT_PREVIEW && (
        <Suspense fallback={<></>}>
          <Breakpoint />
        </Suspense>
      )}

      <NotificationBar />
      <Navigation />

      <Main $notificationBarVisible={notificationBarVisible}>{children}</Main>

      <Footer />
    </>
  )
}
