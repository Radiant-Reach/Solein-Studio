import { rem, rgba } from 'polished'
import styled from 'styled-components'

import { Link } from 'components/atoms/Link'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeaderRow = styled.div`
  margin-bottom: ${rem(48)};
`

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(24)};

  ${media.md.min} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const RoomCardPhoto = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`

export const RoomCard = styled(Link)`
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

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

export const RoomTag = styled.span<{ $color: string }>`
  position: absolute;
  top: ${rem(14)};
  left: ${rem(14)};

  padding: ${rem(6)} ${rem(14)};
  border-radius: 999px;
  background-color: ${({ $color }) => $color};
`

export const RoomCardBody = styled.div`
  padding: ${rem(24)};
`

export const RoomCardEyebrow = styled.div`
  margin-bottom: ${rem(8)};
`

export const RoomCardTitle = styled.div`
  margin-bottom: ${rem(10)};
`

export const RoomCardFooter = styled.div`
  margin-top: ${rem(20)};
`
