import { rem } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const NOTIFICATION_BAR_HEIGHT = 44

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 51;

  height: ${rem(NOTIFICATION_BAR_HEIGHT)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${rem(8)};
  padding: 0 ${rem(16)};
  text-align: center;

  background-color: ${({ theme }) => theme.colors.terracotta};

  ${media.sm.max} {
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
`

export const NotificationLink = styled(Link)`
  text-decoration: underline;
  flex-shrink: 0;
`
