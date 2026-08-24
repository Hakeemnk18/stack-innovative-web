'use client'

import { motion } from 'framer-motion'
import { inViewProps } from '../../lib/motion'

interface SectionHeaderProps {
  badge?: string
  heading: string
  headingAccent?: string
  subheading?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeader({
  badge,
  heading,
  headingAccent,
  subheading,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-2xl ${center ? 'mx-auto' : ''} mb-14`}>
      {badge && (
        <motion.div
          {...inViewProps(0)}
          className={center ? 'flex justify-center mb-4' : 'mb-4'}
        >
          <span className="section-badge">{badge}</span>
        </motion.div>
      )}
      <motion.h2
        {...inViewProps(0.08)}
        className={`display-font font-bold tracking-tight leading-tight mb-4 ${
          light ? 'text-white' : 'text-slate-900'
        } text-3xl sm:text-4xl lg:text-5xl`}
      >
        {heading}{' '}
        {headingAccent && (
          <span className={light ? 'gradient-text-accent' : 'gradient-text'}>
            {headingAccent}
          </span>
        )}
      </motion.h2>
      {subheading && (
        <motion.p
          {...inViewProps(0.16)}
          className={`text-base sm:text-lg leading-relaxed ${
            light ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  )
}
