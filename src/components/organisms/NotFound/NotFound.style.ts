import { rem } from 'polished'
import styled from 'styled-components'

import { HEADER_HEIGHT } from 'components/organisms/Navigation/Navigation.style'

import LogoMarkEspresso from 'assets/images/logo/mark/logo-mark-espresso.png'

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: calc(100vh - ${rem(HEADER_HEIGHT)});
  padding: ${rem(56)} 0;
  text-align: center;

  background-color: ${({ theme }) => theme.colors.sand};
`

export const Watermark = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image: url(${LogoMarkEspresso});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  opacity: 0.05;
`

export const Content = styled.div`
  position: relative;
  max-width: ${rem(560)};
  margin: 0 auto;
  padding: 0 ${rem(24)};
`

export const CodeWrapper = styled.div`
  margin-bottom: ${rem(8)};
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(14)};
`

export const LeadWrapper = styled.div`
  margin-bottom: ${rem(32)};
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${rem(14)};
`
