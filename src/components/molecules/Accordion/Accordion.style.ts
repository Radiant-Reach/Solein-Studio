import { rem } from 'polished'
import styled from 'styled-components'

export const List = styled.div`
  display: flex;
  flex-direction: column;
`

export const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};
`

export const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(16)};

  padding: ${rem(20)} 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`

export const Chevron = styled.span<{ $open: boolean }>`
  display: flex;
  flex-shrink: 0;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.2s ease;
`

export const AnswerWrapper = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  overflow: hidden;
  transition: grid-template-rows 0.3s ease;
`

export const AnswerInner = styled.div<{ $open: boolean }>`
  min-height: 0;
  padding-bottom: ${({ $open }) => ($open ? rem(20) : 0)};
  transition: padding-bottom 0.2s ease;
`
