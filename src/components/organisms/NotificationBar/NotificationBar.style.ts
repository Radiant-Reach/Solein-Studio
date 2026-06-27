import { rem } from 'polished'
import styled from 'styled-components'

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
  padding: 0 ${rem(16)};
  text-align: center;

  background-color: ${({ theme }) => theme.colors.terracotta};
`
