'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import PackageCard, { type PackageItem } from './PackageCard'

const AUTOPLAY_DELAY_MS = 4000
const RESUME_AFTER_INTERACTION_MS = 6000
const REWIND_DELAY_MS = 550

interface PackageScrollerProps {
  items: PackageItem[]
  variant?: 'compact' | 'detailed'
}

export default function PackageScroller({ items, variant = 'detailed' }: PackageScrollerProps) {
  // Cards stay a horizontal scroller at every breakpoint (home and /packages
  // alike), and autoplay loops forward endlessly via a cloned second copy of
  // the list: once the scroll position crosses into the clone range it snaps
  // back by exactly one real-list-width — clones sit pixel-for-pixel where
  // the real cards would continue, so the reset is visually seamless.
  const renderItems = [...items, ...items]

  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastInteractionRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const markInteraction = () => {
    lastInteractionRef.current = Date.now()
  }

  // Width of one step (card + gap), measured from actual rendered layout
  // so it stays correct across breakpoints without hardcoding pixel values.
  const getStepWidth = () => {
    const a = cardRefs.current[0]
    const b = cardRefs.current[1]
    if (!a || !b) return 0
    return b.offsetLeft - a.offsetLeft
  }

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const card = cardRefs.current[index]
    const container = scrollRef.current
    if (card && container) {
      container.scrollTo({ left: card.offsetLeft - 24, behavior })
    }
  }

  // Keep the dot indicator in sync with whatever the user (or autoplay)
  // scrolls to, derived purely from scroll position — robust regardless of
  // how many cards happen to be visible at once on wide screens.
  useEffect(() => {
    const container = scrollRef.current
    if (!container || items.length < 2) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const step = getStepWidth()
        if (step > 0) {
          const idx = Math.round((container.scrollLeft + 24) / step)
          setActiveIndex(((idx % items.length) + items.length) % items.length)
        }
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items.length])

  // Auto-advance through the cards, pausing while the user is interacting
  // and while the row is scrolled out of view.
  useEffect(() => {
    const container = scrollRef.current
    if (!container || items.length < 2) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    container.addEventListener('pointerdown', markInteraction, { passive: true })
    container.addEventListener('touchstart', markInteraction, { passive: true })

    const interval = setInterval(() => {
      if (Date.now() - lastInteractionRef.current < RESUME_AFTER_INTERACTION_MS) return
      if (document.hidden) return

      const rect = container.getBoundingClientRect()
      const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0
      if (!isOnScreen) return

      const step = getStepWidth()
      if (step <= 0) return

      const totalRealWidth = step * items.length
      container.scrollTo({ left: container.scrollLeft + step, behavior: 'smooth' })
      setTimeout(() => {
        if (container.scrollLeft >= totalRealWidth - 1) {
          container.scrollTo({ left: container.scrollLeft - totalRealWidth, behavior: 'auto' })
        }
      }, REWIND_DELAY_MS)
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
        <div className="flex flex-col items-center gap-3 mb-4">
          <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
            <ArrowLeftRight size={13} />
            Scroll to see all packages
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

      <div ref={scrollRef} className="flex items-start overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-4">
        {renderItems.map((pkg, i) => {
          const isClone = i >= items.length
          return (
            <div
              key={`${pkg.id}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              aria-hidden={isClone || undefined}
              className="shrink-0 snap-center"
              style={{ width: 'clamp(280px, 32vw, 380px)' }}
            >
              <PackageCard pkg={pkg} variant={variant} delay={isClone ? 0 : 0.05 + i * 0.1} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
