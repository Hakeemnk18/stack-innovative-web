'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Timer, PhoneCall } from 'lucide-react'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { formatPrice } from '../../lib/format'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export interface PackageFeature {
  title: string
  desc: string
}

export interface PackageItem {
  id: string
  slug: string
  name: string
  tagline: string
  price?: number
  currency?: string
  cadence: string
  popular?: boolean
  limitedOffer?: boolean
  custom?: boolean
  includedIntro?: string
  highlightTitles?: string[]
  included?: PackageFeature[]
  alsoIncluded?: PackageFeature[]
  highlights?: PackageFeature[]
  note?: string
  cta: {
    primaryLabel: string
    secondaryLabel: string
    whatsappMessage: string
  }
}

interface PackageCardProps {
  pkg: PackageItem
  variant?: 'compact' | 'detailed'
  delay?: number
}

export default function PackageCard({ pkg, variant = 'detailed', delay = 0 }: PackageCardProps) {
  const compact = variant === 'compact'
  const paddingClasses = compact ? 'p-8 lg:p-10 lg:max-w-lg' : 'p-6 lg:p-8 lg:max-w-none'

  const badges = (
    <>
      {pkg.popular && (
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 mb-5 bg-gradient-primary rounded-full text-white text-xs font-semibold shadow-lg">
          <Sparkles size={12} />
          Most Popular
        </div>
      )}

      {pkg.limitedOffer && (
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 mb-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-semibold shadow-lg">
          <Timer size={12} />
          Limited Time Offer
        </div>
      )}

      {pkg.custom && (
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 mb-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-xs font-semibold shadow-lg">
          <PhoneCall size={12} />
          Free Consultation
        </div>
      )}
    </>
  )

  const priceBlock = pkg.custom ? (
    <p className="display-font font-black text-slate-900 text-2xl lg:text-3xl mb-6">
      Let&apos;s Talk First
    </p>
  ) : (
    <div className="flex items-baseline gap-2 mb-6">
      <span className="display-font font-black text-slate-900 text-4xl lg:text-5xl">
        {formatPrice(pkg.price!, pkg.currency!)}
      </span>
      <span className="text-slate-400 text-sm font-medium">/ {pkg.cadence}</span>
    </div>
  )

  // Custom package: no separate details page, keep the direct dual-CTA card.
  if (pkg.custom) {
    const waUrl = buildWhatsAppUrl(pkg.cta.whatsappMessage)
    const listItems = pkg.highlights ?? []

    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
        className={`card-base shadow-card flex flex-col relative w-full max-w-md mx-auto ${paddingClasses}`}
      >
        {badges}

        <h3 className="display-font font-bold text-slate-900 text-2xl mb-2">{pkg.name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{pkg.tagline}</p>

        {priceBlock}

        <ul className="space-y-3 mb-2">
          {listItems.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-blue-600" strokeWidth={3} />
              </span>
              <div>
                <span className="text-slate-800 text-sm font-semibold">{item.title}</span>
                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="flex flex-col gap-3 mt-8">
          <Link href="/#contact" className="btn-primary w-full justify-center py-3.5 group">
            {pkg.cta.primaryLabel}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full justify-center py-3.5"
          >
            {pkg.cta.secondaryLabel}
          </a>
        </div>
      </motion.div>
    )
  }

  // Priced packages: a short summary card — full details live on their own page.
  const allItems = pkg.included ?? []
  const highlightItems = pkg.highlightTitles
    ? allItems.filter((item) => pkg.highlightTitles!.includes(item.title))
    : allItems

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`card-base shadow-card flex flex-col relative w-full max-w-md mx-auto group ${paddingClasses}`}
    >
      <Link
        href={`/packages/${pkg.slug}`}
        className="absolute inset-0 z-10 rounded-[20px]"
        aria-label={`See full details for ${pkg.name}`}
      />

      {badges}

      <h3 className="display-font font-bold text-slate-900 text-2xl mb-2">{pkg.name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{pkg.tagline}</p>

      {priceBlock}

      {pkg.includedIntro && (
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
          {pkg.includedIntro}
        </p>
      )}

      <ul className="space-y-3 mb-2">
        {highlightItems.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} className="text-blue-600" strokeWidth={3} />
            </span>
            <div>
              <span className="text-slate-800 text-sm font-semibold">{item.title}</span>
              <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5 text-primary font-semibold text-sm mt-8 relative z-20 pointer-events-none">
        See Full Details
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  )
}
