import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { scrollLockAtom } from 'store'

import { Icon } from 'components/atoms/Icon'

import { ReactComponent as ChevronLeft } from 'assets/icons/arrows/chevron-left.svg'
import { ReactComponent as ChevronRight } from 'assets/icons/arrows/chevron-right.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

import { CloseButton, Content, NavButton, Overlay } from './Lightbox.style'

export type LightboxProps = {
  isOpen: boolean
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  children: React.ReactNode
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  onPrev,
  onNext,
  children,
}) => {
  const setScrollLock = useSetAtom(scrollLockAtom)

  useEffect(() => {
    setScrollLock(isOpen)
    return () => setScrollLock(false)
  }, [isOpen, setScrollLock])

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <CloseButton type="button" aria-label="Zamknij" onClick={onClose}>
        <Icon src={CloseIcon} size={18} />
      </CloseButton>

      {onPrev && (
        <NavButton
          type="button"
          $side="left"
          aria-label="Poprzednie zdjęcie"
          onClick={(event) => {
            event.stopPropagation()
            onPrev()
          }}
        >
          <Icon src={ChevronLeft} size={18} />
        </NavButton>
      )}

      <Content onClick={(event) => event.stopPropagation()}>{children}</Content>

      {onNext && (
        <NavButton
          type="button"
          $side="right"
          aria-label="Następne zdjęcie"
          onClick={(event) => {
            event.stopPropagation()
            onNext()
          }}
        >
          <Icon src={ChevronRight} size={18} />
        </NavButton>
      )}
    </Overlay>
  )
}
