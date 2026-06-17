import React from 'react'
import styled from 'styled-components'

import { Hidden } from 'components/atoms/Hidden'

import { BreakpointContainer } from './Breakpoint.style'

const Flex = styled.div`
  display: flex;
  gap: 0.25rem;

  p {
    color: ${({ theme }) => theme.colors.black};

    text-shadow:
      1px 0px 0px ${({ theme }) => theme.colors.white},
      -1px 0px 0px ${({ theme }) => theme.colors.white},
      0px 1px 0px ${({ theme }) => theme.colors.white},
      0px -1px 0px ${({ theme }) => theme.colors.white};
  }
`

export const Breakpoint: React.FC = () => {
  return (
    <BreakpointContainer>
      <Flex>
        <p>BreakPoint:</p>
        <Hidden $base="visible" $xs="hidden">
          <p> base</p>
        </Hidden>
        <Hidden $base="hidden" $xs="visible" $sm="hidden">
          <p>xs</p>
        </Hidden>
        <Hidden $base="hidden" $sm="visible" $md="hidden">
          <p>sm</p>
        </Hidden>
        <Hidden $base="hidden" $md="visible" $lg="hidden">
          <p>md</p>
        </Hidden>
        <Hidden $base="hidden" $lg="visible" $xl="hidden">
          <p>lg</p>
        </Hidden>
        <Hidden $base="hidden" $xl="visible" $xxl="hidden">
          <p>xl</p>
        </Hidden>
        <Hidden $base="hidden" $xxl="visible" $xl3="hidden">
          <p>xxl</p>
        </Hidden>
        <Hidden $base="hidden" $xl3="visible">
          <p>xl3</p>
        </Hidden>
      </Flex>
    </BreakpointContainer>
  )
}
