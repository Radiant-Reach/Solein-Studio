import { Hero1 } from 'components/templates/Hero/Hero1'
import { Hero2 } from 'components/templates/Hero/Hero2'
import { Hero3 } from 'components/templates/Hero/Hero3'
import React from 'react'

import { Layout } from 'views/Layout'

import { consoleLog } from 'utils/console'

const IndexPage: React.FC = () => {
  consoleLog('debug', ['index', 'IndexPage loaded'])

  return (
    <Layout>
      <Hero1 />
      <Hero2 />
      <Hero3 />
    </Layout>
  )
}

export default IndexPage
