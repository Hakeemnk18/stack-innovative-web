import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement
    if (!card) return
    const offset = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2
    container.scrollTo({ left: offset, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const go = (dir: 'prev' | 'next') => {
    const items = content.testimonials.items
    const next = dir === 'next'
      ? Math.min(activeIndex + 1, items.length - 1)
      : Math.max(activeIndex - 1, 0)
    scrollToIndex(next)
  }

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const n = content.testimonials.items.length
    const cardW = (el.scrollWidth + 20) / n
    const idx = Math.round(el.scrollLeft / cardW)
    setActiveIndex(Math.max(0, Math.min(idx, n - 1)))
  }, [])

  const items = content.testimonials.items

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
      <motion.div {...inViewProps(0.05)} className="relative">
        {/* Prev */}
        <motion.button
          onClick={() => go('prev')}
          disabled={activeIndex === 0}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Next */}
        <motion.button
          onClick={() => go('next')}
          disabled={activeIndex === items.length - 1}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight size={18} />
        </motion.button>

        {/* Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-[max(24px,calc((100vw-1280px)/2+24px))] pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,102,255,0.1)' }}
              className="flex-none w-[300px] sm:w-[360px] lg:w-[400px] snap-start card-base p-7 flex flex-col relative group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-6 group-hover:opacity-12 transition-opacity">
                <Quote size={36} className="text-blue-600" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-4 h-4 star-filled" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 italic">
                "{t.text}"
              </p>

              {/* Author */}
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

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? 'w-6 h-2 bg-blue-600'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Rating strip */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...inViewProps(0.1)} className="mt-12 text-center">
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
