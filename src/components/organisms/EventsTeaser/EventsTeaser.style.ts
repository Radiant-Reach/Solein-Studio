import { rem, rgba } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
  background-color: ${({ theme }) => theme.colors.sand100};
`

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${rem(20)};
  margin-bottom: ${rem(40)};
`

export const EmptyState = styled.div`
  padding: ${rem(40)};
  margin-bottom: ${rem(40)};
  text-align: center;

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
`

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(24)};
  margin-bottom: ${rem(40)};

  ${media.sm.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const EventCard = styled(Link)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(4)} ${rem(12)}
    ${({ theme }) => rgba(theme.colors.espresso, 0.05)};

  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    box-shadow: 0 ${rem(14)} ${rem(28)}
      ${({ theme }) => rgba(theme.colors.espresso, 0.12)};
    transform: translateY(-${rem(4)});
  }
`

export const EventPhoto = styled.div`
  aspect-ratio: 4 / 3;
`

export const EventBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  padding: ${rem(20)};
`

export const EventMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(12)};
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
