import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, ShoppingCart, TrendingUp, Shield, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, ShoppingCart, TrendingUp, Shield,
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const items = content.services.items

  /* ── Reliable active-index from DOM positions ── */
  const syncIndex = useCallback(() => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return

    const cards = Array.from(el.children) as HTMLElement[]

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      setActiveIndex(cards.length - 1)
      return
    }
    if (el.scrollLeft <= 4) {
      setActiveIndex(0)
      return
    }

    const vpCenter = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs((card.offsetLeft + card.clientWidth / 2) - vpCenter)
      if (dist < bestDist) { bestDist = dist; best = i }
    })
    setActiveIndex(best)
  }, [])

  /* ── Scroll to a specific card, centered ── */
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const card = cards[index]
    if (!card) return
    const target = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const go = (dir: 'prev' | 'next') => {
    const next = dir === 'next'
      ? Math.min(activeIndex + 1, items.length - 1)
      : Math.max(activeIndex - 1, 0)
    scrollToIndex(next)
  }

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.services.badge}
          heading={content.services.heading}
          subheading={content.services.subheading}
        />
      </div>

      {/* ── Carousel ── */}
      <motion.div {...inViewProps(0.05)} className="relative">
        {/* Prev arrow */}
        <button
          onClick={() => go('prev')}
          disabled={activeIndex === 0}
          className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => go('next')}
          disabled={activeIndex === items.length - 1}
          className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronRight size={18} />
        </button>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onScroll={syncIndex}
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
          {items.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, delay: i * 0.05, ease: EASE }}
                whileHover={{ y: -6 }}
                onClick={() => handleClick(service.href)}
                className="card-base p-7 flex flex-col group cursor-pointer"
                style={{
                  flexShrink: 0,
                  width: 'clamp(280px, 38vw, 380px)',
                  scrollSnapAlign: 'center',
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${service.color}15` }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </motion.div>

                {/* Title */}
                <h3 className="display-font font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                </div>

                {/* CTA link */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  Learn More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Bottom colour accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ── Pagination dots ── */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to service ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 h-2 bg-blue-600'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...inViewProps(0.1)} className="text-center mt-12">
          <p className="text-slate-500 mb-5 text-base">
            Not sure what you need? Let's talk about your project.
          </p>
          <motion.button
            onClick={() => handleClick('#contact')}
            className="btn-primary"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(0,102,255,0.38)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get a Free Consultation <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
