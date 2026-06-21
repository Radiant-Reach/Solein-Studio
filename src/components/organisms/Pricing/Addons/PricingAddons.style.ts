import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const AddonsSection = styled.section`
  padding: ${rem(96)} 0;
  background-color: ${({ theme }) => theme.colors.sand100};
`

export const AddonsHeadingWrapper = styled.div`
  margin-bottom: ${rem(64)};
  text-align: center;
`

export const AddonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(48)};

  ${media.lg.min} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const AddonsColumn = styled.div``

export const ColumnDivider = styled.span`
  display: block;
  margin-bottom: ${rem(24)};
  height: 1px;
  background-color: ${({ theme }) => theme.colors.espresso1F};
`

export const AddonBlock = styled.div`
  margin-bottom: ${rem(40)};

  &:last-child {
    margin-bottom: 0;
  }
`

export const AddonPriceLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${rem(8)};
  margin-bottom: ${rem(12)};
`

export const QuoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};

  margin: 0 0 ${rem(32)};
  padding: 0;
  list-style: none;
`

export const QuoteRow = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${rem(12)};
`

export const QuoteBullet = styled.span`
  color: ${({ theme }) => theme.colors.terracotta};
`
