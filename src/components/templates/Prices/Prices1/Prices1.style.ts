import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Section = styled.section`
  padding: ${rem(80)} ${rem(30)};

  ${media.md.max} {
    padding: ${rem(60)} ${rem(20)};
  }
`

export const Container = styled.div`
  max-width: ${rem(900)};
  margin: 0 auto;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${rem(40)};
`

export const Eyebrow = styled.h6`
  font-size: ${rem(13)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray60};
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: ${rem(8)};
`

export const Title = styled.h4`
  font-size: ${rem(28)};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray80};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Group = styled.div`
  margin-bottom: ${rem(40)};

  &:last-child {
    margin-bottom: 0;
  }
`

export const GroupTitle = styled.h3`
  text-align: center;
  font-size: ${rem(22)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray80};
  letter-spacing: 0.05em;
  margin-bottom: ${rem(8)};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary50};
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid ${({ theme }) => theme.colors.gray10};

  thead tr {
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray60};

    &:hover {
      background: transparent;
    }
  }

  thead th {
    padding: ${rem(12)} ${rem(8)};
    font-size: ${rem(12)};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.gray60};

    &:nth-child(2) {
      text-align: center;
    }

    &:last-child {
      text-align: right;
    }
  }

  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};
    transition: background 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.gray05};
    }
  }

  td {
    padding: ${rem(16)} ${rem(8)};
    font-size: ${rem(14)};
    color: ${({ theme }) => theme.colors.gray80};
    line-height: 1.4;

    &:nth-child(2) {
      text-align: center;
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.gray60};
    }

    &:last-child {
      text-align: right;
      white-space: nowrap;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary100};
    }
  }
`
