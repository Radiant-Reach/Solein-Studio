import { useEffect, useState } from 'react'

export const useDelayedLoad = (ms = 1500) => {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = () => {
      setLoaded(true)
    }

    document.addEventListener('scroll', load, { once: true, passive: true })
    document.addEventListener('click', load, { once: true, passive: true })
    document.addEventListener('keydown', load, { once: true, passive: true })
    document.addEventListener('touchstart', load, { once: true, passive: true })
    document.addEventListener('mousemove', load, { once: true, passive: true })

    setTimeout(load, ms)

    return () => {
      document.removeEventListener('scroll', load)
      document.removeEventListener('click', load)
      document.removeEventListener('keydown', load)
      document.removeEventListener('touchstart', load)
      document.removeEventListener('mousemove', load)
    }
  }, [])

  return isLoaded
}
