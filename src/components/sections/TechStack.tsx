import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Server, Smartphone, Cloud } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const iconMap: Record<string, React.ElementType> = {
  Monitor, Server, Smartphone, Cloud,
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(content.techStack.categories[0].id)

  const active = content.techStack.categories.find((c) => c.id === activeCategory)

  return (
    <section id="tech" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.techStack.badge}
          heading={content.techStack.heading}
          subheading={content.techStack.subheading}
        />

        {/* Category tabs */}
        <motion.div {...inViewProps(0)} className="flex flex-wrap justify-center gap-3 mb-12">
          {content.techStack.categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Monitor
            const isActive = activeCategory === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-semibold text-sm transition-colors ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-white/80 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                }`}
                style={isActive ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)`, boxShadow: `0 8px 24px ${cat.color}40` } : {}}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={16} />
                {cat.category}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Tech grid with AnimatePresence */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${active.color}15` }}
                  >
                    {(() => {
                      const Icon = iconMap[active.icon] ?? Monitor
                      return <Icon size={22} style={{ color: active.color }} />
                    })()}
                  </div>
                  <div>
                    <h3 className="display-font font-bold text-slate-900 text-lg">{active.category}</h3>
                    <p className="text-slate-500 text-sm">{active.techs.length} technologies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {active.techs.map((tech, i) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md transition-colors cursor-default shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: active.color }} />
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Marquee */}
        <motion.div {...inViewProps(0.1)} className="mt-12">
          <p className="text-center text-slate-400 text-sm mb-6">And many more...</p>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[
                ...content.techStack.categories.flatMap((c) => c.techs),
                ...content.techStack.categories.flatMap((c) => c.techs),
              ].map((tech, i) => (
                <div key={i} className="flex-shrink-0 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-medium shadow-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
