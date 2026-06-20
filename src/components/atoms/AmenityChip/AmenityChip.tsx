import React from 'react'

import { Icon } from 'components/atoms/Icon'
import { BodySmall, Text } from 'components/atoms/Typography'

import { IconWrapper, Wrapper } from './AmenityChip.style'

export type AmenityChipProps = {
  icon: string
  label: string
}

export const AmenityChip: React.FC<AmenityChipProps> = ({ icon, label }) => (
  <Wrapper>
    <IconWrapper>
      <Icon src={icon} size={20} />
    </IconWrapper>
    <Text
      $base={BodySmall}
      $color="ink700"
      dangerouslySetInnerHTML={{ __html: label }}
    />
  </Wrapper>
)
