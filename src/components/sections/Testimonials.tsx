import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const items = content.testimonials.items

  const syncIndex = useCallback(() => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return
    const cards = Array.from(el.children) as HTMLElement[]
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) { setActiveIndex(cards.length - 1); return }
    if (el.scrollLeft <= 4) { setActiveIndex(0); return }
    const vpCenter = el.scrollLeft + el.clientWidth / 2
    let best = 0, bestDist = Infinity
    cards.forEach((card, i) => {
      const d = Math.abs((card.offsetLeft + card.clientWidth / 2) - vpCenter)
      if (d < bestDist) { bestDist = d; best = i }
    })
    setActiveIndex(best)
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const card = cards[index]
    if (!card) return
    el.scrollTo({ left: Math.max(0, card.offsetLeft - (el.clientWidth - card.clientWidth) / 2), behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const { pause, resume } = useAutoScroll({ scrollRef, length: items.length, activeIndex, scrollToIndex, interval: 4000 })

  const go = (dir: 'prev' | 'next') => {
    pause()
    resume(4000)
    scrollToIndex(dir === 'next' ? Math.min(activeIndex + 1, items.length - 1) : Math.max(activeIndex - 1, 0))
  }

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.testimonials.badge}
          heading={content.testimonials.heading}
          subheading={content.testimonials.subheading}
        />
      </div>

      {/* ── Carousel ── */}
      <motion.div
        {...inViewProps(0.05)}
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={() => resume(1200)}
      >
        <button
          onClick={() => go('prev')}
          disabled={activeIndex === 0}
          className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => go('next')}
          disabled={activeIndex === items.length - 1}
          className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          onScroll={syncIndex}
          onPointerDown={() => { pause(); resume(4500) }}
          onWheel={(e) => { if (Math.abs(e.deltaX) > 5) { pause(); resume(3000) } }}
          className="flex overflow-x-auto gap-5 pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
            paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
          }}
        >
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
              whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,102,255,0.1)' }}
              className="card-base p-7 flex flex-col relative group"
              style={{ flexShrink: 0, width: 'clamp(280px, 38vw, 400px)', scrollSnapAlign: 'center' }}
            >
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-15 transition-opacity">
                <Quote size={36} className="text-blue-600" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-4 h-4 star-filled" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { pause(); resume(4000); scrollToIndex(i) }}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'}`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...inViewProps(0.1)} className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex -space-x-2">
              {items.slice(0, 4).map((t) => (
                <div
                  key={t.id}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 star-filled" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-600 text-sm font-medium">Rated 5/5 by 30+ clients worldwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
