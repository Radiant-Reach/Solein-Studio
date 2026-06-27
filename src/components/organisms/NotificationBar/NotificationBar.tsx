import React from 'react'

import { BodySmall, Text } from 'components/atoms/Typography'

import { useNotificationBar } from 'hooks/cms/useNotificationBar'

import { NotificationLink, Wrapper } from './NotificationBar.style'

export const NotificationBar: React.FC = () => {
  const { text, link } = useNotificationBar()

  if (!text) return null

  return (
    <Wrapper>
      <Text
        as="span"
        $base={BodySmall}
        $color="white"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {link?.url && (
        <NotificationLink
          to={link.url}
          dangerouslySetInnerHTML={{ __html: link.title || link.url }}
        />
      )}
    </Wrapper>
  )
}
