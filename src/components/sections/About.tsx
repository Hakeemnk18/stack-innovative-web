import { motion } from 'framer-motion'
import { Zap, Lock, RefreshCw, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react'
import { inViewProps, inViewLeft, inViewRight } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const iconMap: Record<string, React.ElementType> = {
  Zap, Lock, RefreshCw, HeartHandshake,
}

const achievements = [
  'Full-stack development from design to deployment',
  'Agile methodology with weekly sprint updates',
  'Source code ownership — always yours',
  'Post-launch support & maintenance included',
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: Image */}
          <motion.div {...inViewLeft(0)} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img
                src={content.about.image}
                alt="Stack Innovative"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/12 border border-white/15 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 28 28" width="16" height="16" fill="none">
                        <rect x="4" y="16" width="20" height="4" rx="2" fill="white" opacity="0.6"/>
                        <rect x="6" y="10" width="16" height="4" rx="2" fill="white" opacity="0.8"/>
                        <rect x="8" y="4" width="12" height="4" rx="2" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">Stack Innovative</div>
                      <div className="text-white/60 text-xs">Web & App Development</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ v: '50+', l: 'Projects' }, { v: '30+', l: 'Clients' }, { v: '3+', l: 'Years' }].map((s) => (
                      <div key={s.l} className="text-center">
                        <div className="text-white font-black text-xl">{s.v}</div>
                        <div className="text-white/50 text-xs">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-2.5"
            >
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <div>
                <div className="text-slate-900 text-xs font-bold">Available Now</div>
                <div className="text-slate-400 text-xs">Taking new projects</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div {...inViewRight(0.1)} className="space-y-8">
            <motion.div {...inViewProps(0)}>
              <span className="section-badge">{content.about.badge}</span>
            </motion.div>

            <motion.div {...inViewProps(0.08)} className="space-y-1">
              <h2 className="display-font font-black text-slate-900 text-4xl sm:text-5xl leading-tight">
                {content.about.heading}
              </h2>
              <h2 className="display-font font-black text-4xl sm:text-5xl leading-tight gradient-text">
                {content.about.headingAccent}
              </h2>
            </motion.div>

            <motion.div {...inViewProps(0.14)} className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed">{content.about.description}</p>
              <p className="text-slate-500 leading-relaxed">{content.about.description2}</p>
            </motion.div>

            <motion.div {...inViewProps(0.18)} className="space-y-2.5">
              {achievements.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: EASE }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...inViewProps(0.28)} className="grid sm:grid-cols-2 gap-4 pt-2">
              {content.about.highlights.map((h) => {
                const Icon = iconMap[h.icon] ?? Zap
                return (
                  <motion.div
                    key={h.title}
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,102,255,0.1)' }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group"
                  >
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm mb-0.5">{h.title}</div>
                      <div className="text-slate-500 text-xs leading-relaxed">{h.desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div {...inViewProps(0.32)}>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(0,102,255,0.38)' }}
                whileTap={{ scale: 0.97 }}
              >
                Work With Us <ArrowRight size={15} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
