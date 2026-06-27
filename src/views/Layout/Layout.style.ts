import { rem } from 'polished'
import styled from 'styled-components'

import { HEADER_HEIGHT } from 'components/organisms/Navigation/Navigation.style'
import { NOTIFICATION_BAR_HEIGHT } from 'components/organisms/NotificationBar/NotificationBar.style'

export const Main = styled.main<{ $notificationBarVisible: boolean }>`
  padding-top: ${({ $notificationBarVisible }) =>
    rem(
      HEADER_HEIGHT + ($notificationBarVisible ? NOTIFICATION_BAR_HEIGHT : 0)
    )};
  background-color: ${({ theme }) => theme.colors.sand};
`
