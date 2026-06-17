import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: fit-content;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
`

export const DropDownWrapper = styled.div`
  cursor: pointer;
  width: 100%;

  padding: 12px 16px;

  display: flex;
  justify-content: space-between;
  gap: 10px;

  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.gray40};
  background-color: ${({ theme }) => theme.colors.white};
`

export const DropDownOptionsContainer = styled.div<{
  $visible: boolean
}>`
  width: calc(100% - 14px);

  position: absolute;
  top: calc(100% + 1px);
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
  border: 8px solid ${({ theme }) => theme.colors.primary05};
  opacity: 0;

  transition: opacity 0.2s ease-in-out;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
    `}
`

export const DropDownOption = styled.div<{
  $selected: boolean
}>`
  padding: 10px 16px;

  display: flex;
  align-items: center;
  gap: 12px;

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary20 : theme.colors.white};
`
