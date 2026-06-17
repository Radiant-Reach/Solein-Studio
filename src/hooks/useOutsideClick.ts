import { MutableRefObject, useEffect } from 'react'

type Props = {
  handler: (bool: boolean) => void
  condition?: boolean
  ref: MutableRefObject<HTMLDivElement | null>
  parentRef?: MutableRefObject<HTMLDivElement | null>
  preventClass?: string[]
  closeClass?: string[]
}

export const useOutsideClick = ({
  ref,
  handler,
  condition = true,
  parentRef,
  preventClass,
  closeClass,
}: Props) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      let shouldReturn = false
      if (preventClass) {
        preventClass.forEach((className) => {
          const clickableDOM = document.querySelectorAll(`.${className}`)
          clickableDOM.forEach((el) => {
            if (!shouldReturn)
              shouldReturn = !(e.target && (e.target as Node).contains(el))
          })
        })

        closeClass?.forEach((className) => {
          const closeableDOM = document.querySelectorAll(`.${className}`)
          closeableDOM.forEach((el) => {
            shouldReturn = !(e.target && (e.target as Node).contains(el))
          })
        })
      }

      if (
        shouldReturn ||
        !ref ||
        !ref.current ||
        (e.target && ref.current.contains(e.target as Node)) ||
        (parentRef &&
          parentRef.current &&
          parentRef.current.contains(e.target as Node))
      ) {
        return
      }
      handler(false)
    }

    if (condition) document.addEventListener('mousedown', listener)

    return () => document?.removeEventListener('mousedown', listener)
  }, [ref, handler, condition, parentRef, preventClass])
}
