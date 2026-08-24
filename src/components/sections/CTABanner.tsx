'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

export default function CTABanner() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="cta-section py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,102,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.2) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div {...inViewProps(0)} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/15 border border-blue-500/25 rounded-full text-blue-400 text-xs font-semibold tracking-widest uppercase">
            <Sparkles size={12} />
            {content.ctaBanner.badge}
          </span>
        </motion.div>

        <motion.h2
          {...inViewProps(0.08)}
          className="display-font font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
        >
          {content.ctaBanner.heading}
        </motion.h2>

        <motion.p
          {...inViewProps(0.15)}
          className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          {content.ctaBanner.subheading}
        </motion.p>

        <motion.div {...inViewProps(0.22)} className="flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={() => handleClick(content.ctaBanner.cta1.href)}
            className="btn-primary text-base px-8 py-4 group"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 36px rgba(0,102,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            {content.ctaBanner.cta1.label}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => handleClick(content.ctaBanner.cta2.href)}
            className="btn-ghost-white text-base px-8 py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {content.ctaBanner.cta2.label}
          </motion.button>
        </motion.div>

        <motion.div
          {...inViewProps(0.3)}
          className="mt-14 flex flex-wrap justify-center gap-3 opacity-35"
        >
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Tailwind'].map((tech) => (
            <span key={tech} className="px-4 py-2 border border-white/10 rounded-full text-white/60 text-xs font-medium">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}