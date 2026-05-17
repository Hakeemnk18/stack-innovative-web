import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? content.works.items
    : content.works.items.filter((w) => w.category === activeFilter)

  return (
    <section id="works" className="py-24 lg:py-32" style={{ background: 'rgba(241,245,249,0.55)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.works.badge}
          heading={content.works.heading}
          subheading={content.works.subheading}
        />

        {/* Filters */}
        <motion.div {...inViewProps(0)} className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.a
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                href={work.href}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-[0_16px_48px_rgba(0,102,255,0.12)] block transition-all"
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
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">No projects in this category yet.</div>
        )}

        <motion.div {...inViewProps(0.1)} className="text-center mt-14">
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
