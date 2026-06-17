import React from 'react'
import { Range, getTrackBackground } from 'react-range'

import { BodyMedium, H100, Text } from 'components/atoms/Typography'

import { formatPrice } from 'utils/format/formatNumbers'

import { colors } from 'styles/theme'

import * as S from './Range-Select.style'

type RangeSelectProps = {
  heading: string
  minValue: number
  maxValue: number
  onChange: (values: number[]) => void
  onFinalChange?: (values: number[]) => void
  value?: number[]
  unit: string
}

export const RangeSelect: React.FC<RangeSelectProps> = ({
  heading,
  minValue,
  maxValue,
  onChange,
  onFinalChange,
  value,
  unit,
}) => {
  return (
    <S.RangeWrapper>
      <Text
        $base={H100}
        $align="left"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      <S.RangeSliderWrapper>
        <S.RangeSliderInnerWrapper>
          <Range
            values={value || [minValue, maxValue]}
            step={1}
            min={minValue}
            max={maxValue}
            onChange={onChange}
            onFinalChange={onFinalChange}
            renderTrack={({ props, children }) => (
              <S.Track
                {...props}
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: value || [minValue, maxValue],
                    colors: [colors.gray05, colors.primary50, colors.gray05],
                    min: minValue,
                    max: maxValue,
                  }),
                }}
              >
                {children}
              </S.Track>
            )}
            renderThumb={({ props }) => <S.Thumb {...props} />}
          />
        </S.RangeSliderInnerWrapper>
      </S.RangeSliderWrapper>

      <S.RangeValuesWrapper>
        <Text
          $base={BodyMedium}
          dangerouslySetInnerHTML={{
            __html: `${formatPrice(value?.[0] || minValue)}${unit}`,
          }}
        />
        <Text
          $base={BodyMedium}
          dangerouslySetInnerHTML={{
            __html: `${formatPrice(value?.[1] || maxValue)}${unit}`,
          }}
        />
      </S.RangeValuesWrapper>
    </S.RangeWrapper>
  )
}
