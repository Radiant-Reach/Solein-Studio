import { rem } from 'polished'
import styled, { css } from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(32)};
`

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(10)};
  margin-top: ${rem(24)};
`

export const FilterChip = styled.button<{ $active: boolean }>`
  cursor: pointer;
  padding: ${rem(8)} ${rem(18)};
  border-radius: 999px;
  font-weight: 600;

  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.terracotta : theme.colors.espresso38};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terracotta : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.cream : theme.colors.ink800};

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
`

export const Grid = styled.div`
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: ${rem(220)};
  gap: ${rem(16)};

  ${media.sm.min} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const GridItem = styled.div<{ $colSpan?: 2; $rowSpan?: 2 }>`
  grid-column: span 1;
  grid-row: span ${({ $rowSpan }) => $rowSpan ?? 1};

  ${({ $colSpan }) =>
    $colSpan === 2 &&
    css`
      ${media.sm.min} {
        grid-column: span 2;
      }
    `}
`
