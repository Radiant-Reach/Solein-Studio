import { rem } from 'polished'
import styled from 'styled-components'

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

export const PhotoTile = styled.button`
  display: block;
  width: ${rem(340)};
  aspect-ratio: 1 / 1;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: ${rem(16)};
  cursor: pointer;
  background: none;
  overflow: hidden;
`

export const LightboxPhoto = styled.div`
  aspect-ratio: 1 / 1;
  width: min(90vw, 85vh);
  max-width: 90vw;
  max-height: 85vh;
`
