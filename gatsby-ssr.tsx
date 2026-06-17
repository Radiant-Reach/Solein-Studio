/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
import { GatsbySSR } from 'gatsby'
import React from 'react'

import { wrapPageElement, wrapRootElement } from './gatsby-shared'

export { wrapRootElement, wrapPageElement }

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/IvyEpic_Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="RedHatDisplay-Bold"
    />,
    <link
      rel="preload"
      href="/fonts/IvyEpic_Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="RedHatDisplay-Medium"
    />,
    <link
      rel="preload"
      href="/fonts/IvyEpic_Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="RedHatDisplay-Regular"
    />,
  ])
}
