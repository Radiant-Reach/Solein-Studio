import React from 'react'

import { BodySmall, Text } from 'components/atoms/Typography'

import { useNotificationBar } from 'hooks/cms/useNotificationBar'

import { Wrapper } from './NotificationBar.style'

export const NotificationBar: React.FC = () => {
  const { text } = useNotificationBar()

  if (!text) return null

  return (
    <Wrapper>
      <Text
        as="span"
        $base={BodySmall}
        $color="white"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Wrapper>
  )
}
