import React, { useEffect, useRef, useState } from 'react'

import * as S from './Testimonials1.style'

const GAP = 20
const DEFAULT_STARS =
  'https://assets.cdn.filesafe.space/OZeIsjuGLP70x007psf5/media/69e777a9a691ce6ea0893f74.png'

type Testimonial = {
  author: string
  content: string
}

type Testimonials1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  starsIconSrc?: string
  quoteIconSrc?: string
  testimonials?: Testimonial[]
  autoplayMs?: number
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    author: 'Ewelina Falkowska',
    content:
      '„Korzystałam z usługi manicure u Pani Darii jestem bardzo zadowolona, profesjonalnie wykonanie miła atmosfera. Polecam 🌷"',
  },
  {
    author: 'Дима Петросюк',
    content:
      '„Najlepszy barber w Białymstoku, chodzę do niego już od kilku lat 👍🏻"',
  },
  {
    author: 'Grażyna',
    content:
      '„Bardzo miła i profesjonalna obsługa. Farbowanie odrostów wykonane bardzo dokładnie, kolor idealnie dopasowany do reszty włosów. Wizyta przebiegła w przyjemnej atmosferze. Zdecydowanie polecam usługi pani Hanny."',
  },
  {
    author: 'Urszula',
    content:
      '„Usługa wykonana z dokładnością i starannością. Kolor rewelacyjny. Jestem bardzo zadowolona. Polecam panią Hannę."',
  },
  {
    author: 'Angelika Borowska',
    content:
      '„Zarówno Pani Hanna jak i Daria znają się na rzeczy. Włosy oraz paznokcie świetnie wykonane 🫶🏻"',
  },
  {
    author: 'Jarosław',
    content:
      '„Bardzo profesjonalna Pani fryzjerka dbająca o detale. Bardzo dokładna. Jestem przejazdem w Bydgoszczy a potrzebowałem strzyżenia. Dzięki tej Pani wiem że warto tu wracać."',
  },
  {
    author: 'Дарья',
    content: '„Bardzo polecam! Paznokcie bardzo ładnie wyglądają!"',
  },
  {
    author: 'Yana',
    content:
      '„Bardzo profesjonalna Pani Hanna, strzyżenie męskie wykonane na 10/10, mąż zadowolony z fryzury, polecamy jak najbardziej!"',
  },
  {
    author: 'Joanna',
    content:
      '„Polecam Panią Darię. ❤️❤️❤️ usługa wykonana profesjonalnie i w sympatycznej atmosferze. 💅🏽"',
  },
]

export const Testimonials1: React.FC<Testimonials1Props> = ({
  id = 'testimonials',
  eyebrow = 'Opinie',
  title = (
    <>
      Co mówią nasi <em>klienci</em>
    </>
  ),
  starsIconSrc = DEFAULT_STARS,
  quoteIconSrc,
  testimonials = DEFAULT_TESTIMONIALS,
  autoplayMs = 4000,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [activePage, setActivePage] = useState(0)
  const [dotCount, setDotCount] = useState(Math.ceil(testimonials.length / 3))
  const [dragging, setDragging] = useState(false)

  // Exposed imperative handles so dot clicks can call into the effect's logic
  const goToRef = useRef<(index: number) => void>(() => {})
  const resetTimerRef = useRef<() => void>(() => {})

  useEffect(() => {
    const track = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    const state = {
      page: 0,
      perPage: 3,
      pages: Math.ceil(testimonials.length / 3),
      isDragging: false,
      startX: 0,
      baseOffset: 0,
      timer: null as ReturnType<typeof setInterval> | null,
    }

    const getPerPage = () => {
      if (window.innerWidth <= 600) return 1
      if (window.innerWidth <= 900) return 2
      return 3
    }

    const getItemWidth = () =>
      (track.children[0] as HTMLElement)?.offsetWidth ?? 0

    const computeOffset = (pageIndex: number) =>
      pageIndex * state.perPage * (getItemWidth() + GAP)

    const applyTransform = (offset: number, animate = true) => {
      track.style.transition = animate ? 'transform 0.5s ease' : 'none'
      track.style.transform = `translateX(${-offset}px)`
    }

    const goTo = (index: number) => {
      state.page = ((index % state.pages) + state.pages) % state.pages
      applyTransform(computeOffset(state.page))
      setActivePage(state.page)
    }

    const stopTimer = () => {
      if (state.timer) {
        clearInterval(state.timer)
        state.timer = null
      }
    }

    const startTimer = () => {
      stopTimer()
      if (autoplayMs > 0) {
        state.timer = setInterval(() => goTo(state.page + 1), autoplayMs)
      }
    }

    const resetTimer = () => {
      stopTimer()
      startTimer()
    }

    // Expose for dot buttons
    goToRef.current = (index: number) => {
      goTo(index)
      resetTimer()
    }
    resetTimerRef.current = resetTimer

    const recalc = () => {
      state.perPage = getPerPage()
      state.pages = Math.ceil(testimonials.length / state.perPage)
      state.page = 0
      setDotCount(state.pages)
      setActivePage(0)
      applyTransform(0, false)
      startTimer()
    }

    // Mouse drag
    const onMouseDown = (e: MouseEvent) => {
      state.isDragging = true
      state.startX = e.clientX
      state.baseOffset = computeOffset(state.page)
      applyTransform(state.baseOffset, false)
      setDragging(true)
      stopTimer()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!state.isDragging) return
      applyTransform(state.baseOffset + (state.startX - e.clientX), false)
    }

    const onMouseUp = (e: MouseEvent) => {
      if (!state.isDragging) return
      state.isDragging = false
      setDragging(false)
      const delta = state.startX - e.clientX
      if (delta > 60) goTo(state.page + 1)
      else if (delta < -60) goTo(state.page - 1)
      else goTo(state.page)
      resetTimer()
    }

    // Touch drag
    const onTouchStart = (e: TouchEvent) => {
      state.startX = e.touches[0].clientX
      state.baseOffset = computeOffset(state.page)
      applyTransform(state.baseOffset, false)
      stopTimer()
    }

    const onTouchMove = (e: TouchEvent) => {
      applyTransform(
        state.baseOffset + (state.startX - e.touches[0].clientX),
        false
      )
    }

    const onTouchEnd = (e: TouchEvent) => {
      const delta = state.startX - e.changedTouches[0].clientX
      if (delta > 60) goTo(state.page + 1)
      else if (delta < -60) goTo(state.page - 1)
      else goTo(state.page)
      resetTimer()
    }

    const onMouseLeave = () => {
      if (!state.isDragging) startTimer()
    }

    wrapper.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    wrapper.addEventListener('touchstart', onTouchStart, { passive: true })
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true })
    wrapper.addEventListener('touchend', onTouchEnd)
    wrapper.addEventListener('mouseenter', stopTimer)
    wrapper.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', recalc)

    requestAnimationFrame(recalc)

    return () => {
      stopTimer()
      wrapper.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      wrapper.removeEventListener('touchstart', onTouchStart)
      wrapper.removeEventListener('touchmove', onTouchMove)
      wrapper.removeEventListener('touchend', onTouchEnd)
      wrapper.removeEventListener('mouseenter', stopTimer)
      wrapper.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', recalc)
    }
  }, [autoplayMs, testimonials.length])

  return (
    <S.Section id={id}>
      <S.Container>
        <S.Header>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
        </S.Header>

        <S.CarouselWrapper ref={wrapperRef} $dragging={dragging}>
          <S.Track ref={trackRef}>
            {testimonials.map(({ author, content }) => (
              <S.Item key={author}>
                <S.ItemText>{content}</S.ItemText>
                <S.ItemAuthor>{author}</S.ItemAuthor>
                <S.StarsImg src={starsIconSrc} alt="5 gwiazdek" />
                {quoteIconSrc && <S.QuoteImg src={quoteIconSrc} alt="" />}
              </S.Item>
            ))}
          </S.Track>
        </S.CarouselWrapper>

        <S.Dots aria-label="Nawigacja karuzeli">
          {Array.from({ length: dotCount }, (_, i) => (
            <S.DotButton
              key={i}
              $active={i === activePage}
              onClick={() => goToRef.current(i)}
              aria-label={`Przejdź do strony ${i + 1}`}
            />
          ))}
        </S.Dots>
      </S.Container>
    </S.Section>
  )
}
