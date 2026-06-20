import { rem } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(56)} 0 ${rem(96)};
`

export const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: ${rem(32)};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ink500};
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};
  align-items: center;

  ${media.lg.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const DetailPhoto = styled.div`
  aspect-ratio: 4 / 3;
`

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
`

export const TypeTag = styled.span<{ $type: 'zewnetrzne' | 'solein' }>`
  display: inline-flex;
  width: fit-content;
  padding: ${rem(4)} ${rem(12)};
  border-radius: 999px;

  background-color: ${({ theme, $type }) =>
    $type === 'solein' ? theme.colors.terracotta100 : theme.colors.sand200};
  color: ${({ theme, $type }) =>
    $type === 'solein' ? theme.colors.terracotta : theme.colors.ink600};
`

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(8)} ${rem(16)};
`

export const Description = styled.div`
  max-width: 56ch;
`
