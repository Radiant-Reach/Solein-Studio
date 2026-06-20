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
      href="/fonts/Marcellus-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="Marcellus-Regular"
    />,
  ])
}
