import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewScale, inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.testimonials.badge}
          heading={content.testimonials.heading}
          subheading={content.testimonials.subheading}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.testimonials.items.map((t, i) => (
            <motion.div
              key={t.id}
              {...inViewScale(i * 0.07)}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,102,255,0.1)' }}
              transition={{ duration: 0.25 }}
              className="card-base p-7 flex flex-col relative group"
            >
              <div className="absolute top-6 right-6 opacity-8 group-hover:opacity-15 transition-opacity">
                <Quote size={36} className="text-blue-600" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-4 h-4 star-filled" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 italic">
                "{t.text}"
              </p>

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

        <motion.div {...inViewProps(0.1)} className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex -space-x-2">
              {content.testimonials.items.slice(0, 4).map((t) => (
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
