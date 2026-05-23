import { useCallback, useEffect, useRef } from 'react'

interface Options {
  scrollRef: React.RefObject<HTMLDivElement>
  length: number
  activeIndex: number
  scrollToIndex: (index: number) => void
  interval?: number
}

export function useAutoScroll({ scrollRef, length, activeIndex, scrollToIndex, interval = 3500 }: Options) {
  const pausedRef  = useRef(false)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inViewRef  = useRef(false)
  const activeRef  = useRef(activeIndex)

  // Always current — safe to read inside the interval callback
  activeRef.current = activeIndex

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }, [])

  /** Stop auto-advance immediately */
  const pause = useCallback(() => {
    pausedRef.current = true
    clearTimer()
  }, [clearTimer])

  /** Resume auto-advance, optionally after a delay (ms) */
  const resume = useCallback((delay = 0) => {
    clearTimer()
    if (delay <= 0) {
      pausedRef.current = false
    } else {
      timerRef.current = setTimeout(() => { pausedRef.current = false }, delay)
    }
  }, [clearTimer])

  // Observe scroll-track visibility so we don't advance off-screen sections
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    obs.observe(el)
    // Mark in-view immediately if already visible
    inViewRef.current = el.getBoundingClientRect().top < window.innerHeight
    return () => obs.disconnect()
  }, [scrollRef])

  // The auto-advance tick — intentionally stable deps so interval never restarts
  useEffect(() => {
    if (length <= 1) return
    const id = setInterval(() => {
      if (pausedRef.current || !inViewRef.current) return
      const next = activeRef.current >= length - 1 ? 0 : activeRef.current + 1
      scrollToIndex(next)
    }, interval)
    return () => clearInterval(id)
    // scrollToIndex is useCallback([]) in every caller — stable reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, interval])

  return { pause, resume }
}
