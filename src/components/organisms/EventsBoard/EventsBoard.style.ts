import { rem } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(48)};
`

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(48)};

  ${media.lg.min} {
    grid-template-columns: 2fr 1fr;
  }
`

export const MainColumn = styled.div``

export const MainHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(16)};
  margin-bottom: ${rem(24)};
`

export const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${rem(10)};
`

export const SelectWrapper = styled.div`
  position: relative;
  width: fit-content;
`

export const SelectButton = styled.button<{ $open: boolean }>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${rem(8)};
  margin: 0;
  padding: ${rem(8)} ${rem(16)};
  border-radius: 999px;
  font-family: inherit;
  font-weight: 600;

  border: 1.5px solid
    ${({ theme, $open }) =>
      $open ? theme.colors.terracotta : theme.colors.espresso38};
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.ink800};

  transition: border-color 0.2s ease;

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }
`

export const SelectOptions = styled.div`
  position: absolute;
  top: calc(100% + ${rem(8)});
  left: 0;
  z-index: 10;
  min-width: 100%;
  padding: ${rem(6)};
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(16)};
  box-shadow: 0 ${rem(12)} ${rem(24)} ${({ theme }) => theme.colors.espresso1F};
`

export const SelectOption = styled.button<{ $active: boolean }>`
  cursor: pointer;
  display: block;
  width: 100%;
  margin: 0;
  padding: ${rem(10)} ${rem(12)};
  text-align: left;
  white-space: nowrap;

  font-family: inherit;
  font-weight: 500;

  border: none;
  border-radius: ${rem(10)};
  outline: none;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terracotta : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.cream : theme.colors.ink800};

  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.terracotta : theme.colors.sand200};
  }

  & + & {
    margin-top: ${rem(2)};
  }
`

export const SortButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${rem(6)};
  padding: ${rem(8)} ${rem(18)};
  border-radius: 999px;

  background-color: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.espresso38};
  color: ${({ theme }) => theme.colors.ink600};
`

export const DateRangeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
`

export const DateInput = styled.div`
  width: ${rem(150)};

  input {
    padding: ${rem(9)} ${rem(12)};
  }
`

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(24)};

  ${media.sm.min} {
    grid-template-columns: repeat(2, 1fr);
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
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 ${rem(8)} ${rem(20)} ${({ theme }) => theme.colors.espresso1F};
  }
`

export const EventCardPhoto = styled.div`
  aspect-ratio: 4 / 3;
`

export const EventCardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${rem(10)};
  padding: ${rem(20)};
`

export const EventCardMeta = styled.div`
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

export const EmptyState = styled.div`
  padding: ${rem(40)};
  text-align: center;

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
`

export const SideColumn = styled.div`
  padding: ${rem(32)};

  background-color: ${({ theme }) => theme.colors.sand100};
  border-radius: ${rem(20)};
`

export const SideHeadingWrapper = styled.div`
  margin-bottom: ${rem(24)};
`

export const UpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
`

export const UpcomingRow = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${rem(14)};
  padding-bottom: ${rem(16)};
  text-decoration: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`

export const UpcomingDate = styled.div`
  flex-shrink: 0;
  width: ${rem(48)};
  text-align: center;
`

export const UpcomingDot = styled.span<{ $type: 'zewnetrzne' | 'solein' }>`
  flex-shrink: 0;
  width: ${rem(8)};
  height: ${rem(8)};
  border-radius: 999px;

  background-color: ${({ theme, $type }) =>
    $type === 'solein' ? theme.colors.terracotta : theme.colors.ink400};
`

export const UpcomingInfo = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: ${rem(2)};
`
