import React, { useEffect, useState } from 'react'
import { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Autoplay, Mousewheel } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'

import { Icon } from 'components/atoms/Icon'

import { generateArrayOfElements } from 'utils/object'
import type { BreakpointValue, TypedOmit } from 'utils/types'

import { ReactComponent as ChevronLeft } from 'assets/icons/arrows/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/arrows/chevron-right.svg'

import {
  NavButton,
  StyledSwiper,
  StyledSwiperSlide,
  StyledSwiperWrapper,
  SwiperWrapper,
} from './Swiper.style'

export const DEFAULT_SWIPER_OPTIONS = {
  modules: [Mousewheel],
  mousewheel: { forceToAxis: true },
  grabCursor: true,

  slidesPerView: 'auto',
  spaceBetween: 16,
  edgeSwipeDetection: 'prevent',
} satisfies SwiperOptions

type SwiperProps<T> = {
  items: T[]
  renderItem: (item: T, active: boolean, index: number) => JSX.Element
  renderPlaceholder?: () => JSX.Element
  extractKey: (item: T) => string
  onSlideChange?: (swiper: SwiperInstance) => void
  onSwiper?: (swiper: SwiperInstance) => void
  swiperOptions?: TypedOmit<SwiperOptions, 'modules' | 'initialSlide'>

  withNavigation?: boolean
  navigationPositionY?: `${number}%`
  withAutoplay?: boolean

  loading?: boolean
  overflow?: BreakpointValue<boolean>
  initialSlide?: number | null
  slideOnClick?: boolean
}

export const Swiper = <T,>({
  items,
  renderItem,
  renderPlaceholder,
  extractKey,
  onSlideChange,
  onSwiper,
  swiperOptions = {},
  loading = false,
  overflow = false,
  withNavigation = false,
  navigationPositionY,
  withAutoplay = false,
  slideOnClick = false,
  initialSlide = null,
}: SwiperProps<T>) => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [navState, setNavState] = useState({ isBeginning: true, isEnd: false })
  const finalModules = [
    ...DEFAULT_SWIPER_OPTIONS.modules,
    ...(withAutoplay ? [Autoplay] : []),
  ]

  const finalOptions = {
    ...DEFAULT_SWIPER_OPTIONS,
    ...swiperOptions,
    modules: finalModules,
    autoplay: withAutoplay
      ? { delay: 5000, disableOnInteraction: false }
      : undefined,
  } satisfies SwiperOptions

  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<
    SwiperOptions['slidesPerView']
  >(swiper?.params.slidesPerView ?? finalOptions.slidesPerView)

  const updateNavState = (s: SwiperInstance) => {
    setNavState({ isBeginning: s.isBeginning, isEnd: s.isEnd })
  }

  const onSwiperUpdate = (s: SwiperInstance) => {
    setSwiper(s)
    setCurrentSlidesPerView(s.params.slidesPerView)
    updateNavState(s)
    if (onSwiper) onSwiper(s)
  }

  const handleSlideChange = (s: SwiperInstance) => {
    updateNavState(s)
    onSlideChange?.(s)
  }

  useEffect(() => {
    if (swiper && initialSlide && initialSlide > -1) {
      swiper.slideTo(initialSlide, 0, false)
    } else if (swiper) {
      swiper.slideTo(0, 0, false)
    }
  }, [swiper, initialSlide, items])

  if (items.length === 0) return null

  return (
    <SwiperWrapper className="swiper-wrapper">
      <StyledSwiperWrapper className="styled-swiper-wrapper">
        <StyledSwiper
          {...finalOptions}
          onSlideChange={handleSlideChange}
          onSwiper={onSwiperUpdate}
          onResize={onSwiperUpdate}
          $overflow={overflow}
        >
          {loading
            ? generateArrayOfElements(4, (index) =>
                renderPlaceholder ? (
                  <StyledSwiperSlide
                    key={index}
                    $autoWidth={currentSlidesPerView === 'auto'}
                  >
                    {renderPlaceholder()}
                  </StyledSwiperSlide>
                ) : null
              )
            : items.map((item, index) => (
                <StyledSwiperSlide
                  key={extractKey(item)}
                  $autoWidth={currentSlidesPerView === 'auto'}
                  onClick={
                    slideOnClick ? () => swiper?.slideTo(index) : undefined
                  }
                >
                  {({ isActive }) => renderItem(item, isActive, index)}
                </StyledSwiperSlide>
              ))}
        </StyledSwiper>

        {withNavigation && !loading && items.length > 1 && (
          <>
            <NavButton
              type="button"
              $side="left"
              $positionY={navigationPositionY}
              aria-label="Poprzedni slajd"
              disabled={navState.isBeginning}
              onClick={() => swiper?.slidePrev()}
            >
              <Icon src={ChevronLeft} size={16} />
            </NavButton>

            <NavButton
              type="button"
              $side="right"
              $positionY={navigationPositionY}
              aria-label="Następny slajd"
              disabled={navState.isEnd}
              onClick={() => swiper?.slideNext()}
            >
              <Icon src={ChevronRight} size={16} />
            </NavButton>
          </>
        )}
      </StyledSwiperWrapper>
    </SwiperWrapper>
  )
}
