import styled from 'styled-components'

import media from 'styles/media'

export const RangeWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 18px;

  ${media.lg.min} {
    justify-content: space-between;
  }
`

export const RangeSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const RangeSliderInnerWrapper = styled.div<{
  $secondaryLayout?: boolean
}>`
  width: 100%;

  padding: 0px 8px;
`
export const RangeValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Track = styled.div`
  height: 4px;

  border-radius: 5px;
`

export const Thumb = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.primary50};
  border-radius: 50%;
`
