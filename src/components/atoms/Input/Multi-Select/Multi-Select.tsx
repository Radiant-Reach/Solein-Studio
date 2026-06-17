import React from 'react'

import { Button } from 'components/atoms/Button'
import { H200, Text } from 'components/atoms/Typography'

import * as S from './Multi-Select.style'

export type Option = {
  id: string
  value: string
}

type MultiSelectProps = {
  label?: string
  size?: 'small' | 'medium'
  options: Option[]
  selectedItemId: string[]
  onChange: (option: Option) => void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  size = 'medium',
  options,
  selectedItemId,
  onChange,
}) => {
  return (
    <S.Wrapper $small={size === 'small'}>
      {label && (
        <Text $base={H200} dangerouslySetInnerHTML={{ __html: label }} />
      )}

      <S.SelectWrapper $small={size === 'small'}>
        {options.map((option) => (
          <Button
            key={option.id}
            $active={selectedItemId.includes(option.id)}
            $variant="secondary"
            $size={size}
            $fullWidth
            onClick={() => onChange(option)}
          >
            {option.value}
          </Button>
        ))}
      </S.SelectWrapper>
    </S.Wrapper>
  )
}
