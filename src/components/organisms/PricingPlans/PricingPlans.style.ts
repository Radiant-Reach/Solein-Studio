import { rem } from 'polished'
import styled, { css } from 'styled-components'

import { Divider } from 'components/atoms/Divider'

import media from 'styles/media'

export const PlansSection = styled.section`
  padding: ${rem(96)} 0;
`

export const PlansDivider = styled(Divider)`
  margin-top: ${rem(64)};
`

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};

  ${media.lg.min} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const PlanCard = styled.div<{ $contrast?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${rem(32)};

  ${({ theme, $contrast }) =>
    $contrast
      ? css`
          background-color: ${theme.colors.espresso};
        `
      : css`
          background-color: ${theme.colors.sand50};
          border: 1px solid ${theme.colors.espresso1F};
        `}

  border-radius: ${rem(24)};

  ${media.lg.min} {
    padding: ${rem(48)};
  }
`

export const PlanHeading = styled.div`
  margin-bottom: ${rem(40)};
`

export const ScriptLine = styled.p`
  margin: 0 0 ${rem(16)};
  font-family: ${({ theme }) => theme.fonts.secondary};
`

export const RowsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(20)};
  margin-bottom: ${rem(40)};
`

export const Row = styled.div<{ $contrast?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${rem(16)};
  padding-bottom: ${rem(16)};

  border-bottom: 1px solid
    ${({ theme, $contrast }) =>
      $contrast ? theme.colors.cream33 : theme.colors.espresso1F};
`
