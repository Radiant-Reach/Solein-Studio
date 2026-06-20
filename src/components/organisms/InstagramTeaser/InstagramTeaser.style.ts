import { rem } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${rem(20)};
  margin-bottom: ${rem(40)};
`

export const HandleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
  margin-top: ${rem(8)};
`

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${rem(16)};

  ${media.sm.min} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.lg.min} {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const PhotoTile = styled.div`
  position: relative;
  aspect-ratio: 9 / 16;
`

export const PhotoBadge = styled.div`
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
  width: ${rem(24)};
  height: ${rem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;

  background-color: ${({ theme }) => theme.colors.creamA8};
`
