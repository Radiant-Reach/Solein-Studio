import { rem } from 'polished'
import styled from 'styled-components'

import LogoMarkCream from 'assets/images/logo/mark/logo-mark-cream.png'

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.espresso};
`

export const Watermark = styled.div`
  position: absolute;
  inset: 0;
  transform: translateY(50%);
  pointer-events: none;

  background-image: url(${LogoMarkCream});
  background-repeat: no-repeat;
  background-position: right 30% center;
  background-size: 430px;
  opacity: 0.08;
`

export const Content = styled.div`
  position: relative;
  max-width: ${rem(640)};
  margin: 0 auto;
  padding: ${rem(96)} ${rem(24)};
  text-align: center;
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(14)};
`

export const LeadWrapper = styled.div`
  margin-bottom: ${rem(28)};
`

export const CtaAction = styled.div`
  display: flex;
  justify-content: center;
`
