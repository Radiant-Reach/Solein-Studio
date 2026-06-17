import React, { useRef, useState } from 'react'

import { Icon } from 'components/atoms/Icon'
import { BodyMedium, H100, H200, Text } from 'components/atoms/Typography'

import { useOutsideClick } from 'hooks/useOutsideClick'

import { ReactComponent as ChavronDown } from 'assets/icons/arrows/chevron-down.svg'

import * as S from './Dropdown.style'

type DropDownProps = {
  heading?: string
  options: any[]
  selectedOptions: any[]
  onChange: (values: any[]) => void
  defaultText?: string
}

export const DropDown: React.FC<DropDownProps> = ({
  heading,
  options,
  selectedOptions,
  defaultText = 'Wybierz',
  onChange,
}) => {
  const DropDownRef = useRef<HTMLDivElement>(null)

  const [menuOpened, setMenuOpened] = useState(false)
  const [menuAnimation, setMenuAnimation] = useState(false)

  const handleMenuOpen = () => {
    setMenuOpened((prev) => !prev)
    setTimeout(() => {
      setMenuAnimation((prev) => !prev)
    }, 10)
  }

  useOutsideClick({
    ref: DropDownRef,
    handler: handleMenuOpen,
    condition: menuOpened,
  })

  return (
    <S.Wrapper
      ref={DropDownRef}
      onClick={() => {
        handleMenuOpen()
      }}
    >
      {heading && (
        <Text
          $align="left"
          $base={H200}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      )}

      <S.DropDownWrapper>
        <Text
          $base={BodyMedium}
          $color="gray80"
          dangerouslySetInnerHTML={{
            __html:
              options.length === selectedOptions.length ||
              selectedOptions.length === 0
                ? defaultText
                : selectedOptions
                    .sort((a, b) => a - b)
                    .map((option) => option)
                    .join(', '),
          }}
        />

        <Icon src={ChavronDown} size={20} />

        {menuOpened && (
          <S.DropDownOptionsContainer $visible={menuAnimation}>
            {options.map((option) => (
              <S.DropDownOption
                key={option}
                $selected={selectedOptions.includes(option)}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()

                  const newOptions = selectedOptions.includes(option)
                    ? selectedOptions.filter(
                        (selectedOption) => selectedOption !== option
                      )
                    : [...selectedOptions, option]

                  onChange(newOptions)
                }}
              >
                {/* <Checkbox name="1" checked={selectedOptions.includes(option)} /> */}
                <Text
                  $base={H100}
                  dangerouslySetInnerHTML={{ __html: option }}
                />
              </S.DropDownOption>
            ))}
          </S.DropDownOptionsContainer>
        )}
      </S.DropDownWrapper>
    </S.Wrapper>
  )
}
