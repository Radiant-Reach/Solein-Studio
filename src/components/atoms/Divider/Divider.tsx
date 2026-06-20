import React from 'react'

import { Image } from 'components/atoms/Image'

import LogoMarkEspresso from 'assets/images/logo/mark/logo-mark-espresso.png'

import { Line, Mark, Wrapper } from './Divider.style'

export type DividerProps = {
  className?: string
}

export const Divider: React.FC<DividerProps> = ({ className }) => (
  <Wrapper className={className}>
    <Line />
    <Mark>
      <Image src={LogoMarkEspresso} alt="" objectFit="contain" />
    </Mark>
    <Line />
  </Wrapper>
)
