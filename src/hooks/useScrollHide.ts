import { startTransition, useLayoutEffect, useRef, useState } from 'react'

import { useScrollPosition } from 'hooks/useScroll'

export const useScrollHide = (
  wait: number,
  offset: number,
  dependencies: any[] = []
) => {
  const position = useScrollPosition(wait, dependencies)
  const previousPosition = useRef(position)
  const [hidden, setHidden] = useState(false)

  useLayoutEffect(() => {
    startTransition(() => {
      if (previousPosition.current.y >= position.y) {
        setHidden(false)
      } else if (position.y + 50 >= offset) {
        setHidden(true)
      }
    })

    previousPosition.current = position
  }, [...dependencies, position])

  return hidden
}

export default useScrollHide
