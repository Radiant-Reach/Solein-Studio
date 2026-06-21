import { rem } from 'polished'
import styled from 'styled-components'

import { Divider } from 'components/atoms/Divider'

export const RulesSection = styled.section`
  padding: ${rem(64)} 0;
`

export const RulesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${rem(10)};

  max-width: ${rem(720)};
  margin: 0 auto;
  padding: 0;
  list-style: none;
  text-align: center;
`

export const NoticeDivider = styled(Divider)`
  max-width: ${rem(720)};
  margin: ${rem(24)} auto 0;
`

export const Notice = styled.div`
  max-width: ${rem(720)};
  margin: ${rem(20)} auto 0;
  text-align: center;
`
