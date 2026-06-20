import React from 'react'

import {
  BodyMedium,
  H400,
  H500,
  H600,
  H800,
  Text,
} from 'components/atoms/Typography'

import { Lead, Wrapper } from './SectionHeading.style'

export type SectionHeadingProps = {
  eyebrow?: string
  align?: 'left' | 'center'
  lead?: string
  children: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  align = 'left',
  lead,
  children,
}) => (
  <Wrapper $align={align}>
    {eyebrow && (
      <Text
        as="span"
        $base={BodyMedium}
        $transform="uppercase"
        $color="terracotta"
        $align={align}
        dangerouslySetInnerHTML={{ __html: eyebrow }}
      />
    )}

    <Text
      as="h2"
      $base={H500}
      $md={H600}
      $lg={H800}
      $align={align}
      dangerouslySetInnerHTML={{ __html: children }}
    />

    {lead && (
      <Lead
        $base={BodyMedium}
        $md={H400}
        $color="ink600"
        $align={align}
        dangerouslySetInnerHTML={{ __html: lead }}
      />
    )}
  </Wrapper>
)
