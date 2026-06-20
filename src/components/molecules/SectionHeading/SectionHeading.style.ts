import { rem } from 'polished'
import styled from 'styled-components'

import { Text } from 'components/atoms/Typography'

export const Wrapper = styled.div<{ $align: 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  gap: ${rem(12)};
  align-items: ${({ $align }) =>
    $align === 'center' ? 'center' : 'flex-start'};
`

export const Lead = styled(Text)`
  max-width: 60ch;
`
