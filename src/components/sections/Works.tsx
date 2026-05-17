import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'All'
    ? content.works.items
    : content.works.items.filter((w) => w.category === activeFilter)

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
    const next = dir === 'next'
      ? Math.min(activeIndex + 1, filtered.length - 1)
      : Math.max(activeIndex - 1, 0)
    scrollToIndex(next)
  }

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || filtered.length === 0) return
    const cardW = (el.scrollWidth + 20) / filtered.length
    const idx = Math.round(el.scrollLeft / cardW)
    setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)))
  }, [filtered.length])

  useEffect(() => {
    setActiveIndex(0)
    scrollRef.current?.scrollTo({ left: 0 })
  }, [activeFilter])

  return (
    <section id="works" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.works.badge}
          heading={content.works.heading}
          subheading={content.works.subheading}
        />

        {/* Filters */}
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
      <motion.div {...inViewProps(0.05)} className="relative">
        {/* Prev arrow */}
        <motion.button
          onClick={() => go('prev')}
          disabled={activeIndex === 0}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Next arrow */}
        <motion.button
          onClick={() => go('next')}
          disabled={activeIndex === filtered.length - 1}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight size={18} />
        </motion.button>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-[max(24px,calc((100vw-1280px)/2+24px))] pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.a
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                href={work.href}
                whileHover={{ y: -6 }}
                className="flex-none w-[300px] sm:w-[360px] lg:w-[400px] snap-start group overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-[0_16px_48px_rgba(0,102,255,0.12)] transition-colors block"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/11]">
                  <motion.img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10">
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
                    className="absolute top-4 right-4 w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10"
                  >
                    <ArrowUpRight size={15} className="text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="display-font font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {work.tags.map((tag) => (
                      <span key={tag} className="tech-badge">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Pagination dots ── */}
      <div className="flex justify-center gap-2 mt-6">
        {filtered.map((_, i) => (
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

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...inViewProps(0.1)} className="text-center mt-12">
          <p className="text-slate-500 mb-5 text-base">Have a project in mind? Let's build it together.</p>
          <motion.button
            onClick={() => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
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
