import { rem } from 'polished'
import styled from 'styled-components'

import { Divider } from 'components/atoms/Divider'

export const HeroSection = styled.section`
  padding: ${rem(96)} 0;
  text-align: center;
`

export const ScriptLine = styled.p`
  margin: 0 0 ${rem(16)};
  font-family: ${({ theme }) => theme.fonts.secondary};
`

export const HeroLead = styled.p`
  max-width: 60ch;
  margin: ${rem(24)} auto 0;
`

export const HeroDivider = styled(Divider)`
  margin-top: ${rem(64)};
`
