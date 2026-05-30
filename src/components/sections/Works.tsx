import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Works() {
  
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  

  const filtered = activeFilter === 'All'
    ? content.works.items
    : content.works.items.filter((w) => w.category === activeFilter)

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

  const { pause, resume } = useAutoScroll({ scrollRef, length: filtered.length, activeIndex, scrollToIndex })

  const go = (dir: 'prev' | 'next') => {
    pause()
    resume(4000)
    scrollToIndex(dir === 'next' ? Math.min(activeIndex + 1, filtered.length - 1) : Math.max(activeIndex - 1, 0))
  }

  useEffect(() => {
    setActiveIndex(0)
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }, [activeFilter])

  return (
    <section id="works" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.works.badge}
          heading={content.works.heading}
          subheading={content.works.subheading}
        />

        <motion.div {...inViewProps(0)} className="flex flex-wrap justify-center gap-2 mb-10">
          {content.works.filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
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
          disabled={activeIndex === filtered.length - 1}
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
          {filtered.map((work, i) => (
            <motion.a
              key={work.id}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.38, delay: i * 0.05, ease: EASE }}
              href={work.href}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-[0_16px_48px_rgba(0,102,255,0.12)] transition-colors block"
              style={{ flexShrink: 0, width: 'clamp(280px, 38vw, 400px)', scrollSnapAlign: 'center' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/11' }}>
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-black/55 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10">
                    {work.category}
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5"
                >
                  <p className="text-white/90 text-sm leading-relaxed">{work.description}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center border border-white/10"
                >
                  <ArrowUpRight size={15} className="text-white" />
                </motion.div>
              </div>

              <div className="p-5">
                <h3 className="display-font font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {work.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => <span key={tag} className="tech-badge">{tag}</span>)}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {filtered.map((_, i) => (
          <button
            key={i}
            onClick={() => { pause(); resume(4000); scrollToIndex(i) }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'}`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...inViewProps(0.1)} className="text-center mt-12">
          <p className="text-slate-500 mb-5 text-base">Have a project in mind? Let's build it together.</p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(0,102,255,0.38)' }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project <ExternalLink size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
