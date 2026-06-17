import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { H200, Text } from '../Typography'

const TextWrapper = styled.div<{
  $expanded?: boolean
}>`
  display: flex;
  gap: 4px;
  justify-content: space-between;

  ${Text} {
    line-height: 1.25rem;

    a {
      color: ${({ theme }) => theme.colors.gray100};
      text-decoration: underline;

      transition: color 200ms ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.colors.gray80};
      }
    }
  }

  ${({ $expanded }) =>
    $expanded
      ? css`
          ${Text} {
            display: block;
            text-overflow: clip;
            -webkit-line-clamp: none;
          }
        `
      : css`
          ${Text} {
            width: calc(100% - 50px);

            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        `}
`

const ButtonExpand = styled.button`
  cursor: pointer;
  height: fit-content;
  padding: 0;
  ${H200}
  color: ${({ theme }) => theme.colors.gray100};
  background-color: transparent;
  border: transparent;
  outline: none;
  white-space: nowrap;
`

type ExpandTextProps = {
  children: React.ReactNode
}

export const ExpandText: React.FC<ExpandTextProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  const { t } = useTranslation('form')

  return (
    <TextWrapper $expanded={expanded}>
      {children}
      <ButtonExpand
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setExpanded((prev) => !prev)
        }}
      >
        {expanded ? t('less') : t('more')}
      </ButtonExpand>
    </TextWrapper>
  )
}
