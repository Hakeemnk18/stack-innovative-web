'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import PackageCard, { type PackageItem } from './PackageCard'

const AUTOPLAY_DELAY_MS = 4000
const RESUME_AFTER_INTERACTION_MS = 6000

interface PackageScrollerProps {
  items: PackageItem[]
  variant?: 'compact' | 'detailed'
}

export default function PackageScroller({ items, variant = 'detailed' }: PackageScrollerProps) {
  const compact = variant === 'compact'
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef(0)
  const lastInteractionRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const markInteraction = () => {
    lastInteractionRef.current = Date.now()
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container || items.length < 2) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(index)) {
              activeIndexRef.current = index
              setActiveIndex(index)
            }
          }
        })
      },
      { root: container, threshold: [0.6] }
    )

    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index]
    const container = scrollRef.current
    if (card && container) {
      container.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  // Auto-advance through the cards on mobile, pausing while the user is
  // interacting and while the row is scrolled out of view.
  useEffect(() => {
    const container = scrollRef.current
    if (!container || items.length < 2) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    container.addEventListener('pointerdown', markInteraction, { passive: true })
    container.addEventListener('touchstart', markInteraction, { passive: true })

    const interval = setInterval(() => {
      if (Date.now() - lastInteractionRef.current < RESUME_AFTER_INTERACTION_MS) return
      if (document.hidden) return

      const rect = container.getBoundingClientRect()
      const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0
      if (!isOnScreen) return

      scrollToIndex((activeIndexRef.current + 1) % items.length)
    }, AUTOPLAY_DELAY_MS)

    return () => {
      clearInterval(interval)
      container.removeEventListener('pointerdown', markInteraction)
      container.removeEventListener('touchstart', markInteraction)
    }
  }, [items.length])

  return (
    <div>
      {items.length > 1 && (
        <div className="flex flex-col items-center gap-3 mb-4 md:hidden">
          <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
            <ArrowLeftRight size={13} />
            Swipe to see all packages
          </p>
          <div className="flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to package ${i + 1}`}
                onClick={() => {
                  markInteraction()
                  scrollToIndex(i)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-primary' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className={`flex items-start overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-4 md:px-0 md:pb-0 md:overflow-visible md:snap-none ${
          compact
            ? 'md:flex-wrap md:justify-center md:gap-8'
            : 'md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3 md:items-stretch'
        }`}
      >
        {items.map((pkg, i) => (
          <div
            key={pkg.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            data-index={i}
            className={`shrink-0 snap-center md:contents ${compact ? 'w-[70vw] max-w-[260px]' : 'w-[75vw] max-w-[300px]'}`}
          >
            <PackageCard pkg={pkg} variant={variant} delay={0.05 + i * 0.1} />
          </div>
        ))}
      </div>
    </div>
  )
}
