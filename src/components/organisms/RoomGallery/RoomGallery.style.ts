import { rem } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.section`
  padding: ${rem(56)} 0;
`

export const GalleryTile = styled.button`
  display: block;
  width: ${rem(280)};
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
  width: 100%;
  aspect-ratio: 1 / 1;
`
