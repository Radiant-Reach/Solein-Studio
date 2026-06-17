import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { scrollLockAtom } from 'store'

export const useScrollLock = () => {
  const [scrollLock] = useAtom(scrollLockAtom)

  useEffect(() => {
    if (scrollLock) {
      // Capture the current scroll position
      const { scrollY } = window
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      // Optionally adjust for scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.marginRight = `${scrollbarWidth}px`
      }
    } else {
      // Restore the scroll position and reset styles
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.marginRight = ''
      window.scrollTo(0, scrollY)
    }
  }, [scrollLock])
}
