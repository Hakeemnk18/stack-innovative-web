import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold }
    )

    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
