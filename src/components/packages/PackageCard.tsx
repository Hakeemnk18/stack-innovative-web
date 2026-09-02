'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Timer, PhoneCall } from 'lucide-react'
import { buildWhatsAppUrl } from '../../lib/whatsapp'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PackageFeature {
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

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PackageCard({ pkg, variant = 'detailed', delay = 0 }: PackageCardProps) {
  const compact = variant === 'compact'
  const waUrl = buildWhatsAppUrl(pkg.cta.whatsappMessage)
  const listItems = pkg.custom ? pkg.highlights ?? [] : pkg.included ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`card-base shadow-card flex flex-col relative w-full max-w-md mx-auto ${compact ? 'p-8 lg:p-10 lg:max-w-lg' : 'p-6 lg:p-8 lg:max-w-none'}`}
    >
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

      <h3 className="display-font font-bold text-slate-900 text-2xl mb-2">{pkg.name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{pkg.tagline}</p>

      {pkg.custom ? (
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
      )}

      {pkg.includedIntro && (
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
          {pkg.includedIntro}
        </p>
      )}

      <ul className="space-y-3 mb-2">
        {(compact ? listItems.slice(0, 4) : listItems).map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} className="text-blue-600" strokeWidth={3} />
            </span>
            <div>
              <span className="text-slate-800 text-sm font-semibold">{item.title}</span>
              {!compact && <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>}
            </div>
          </li>
        ))}
      </ul>

      {!compact && !pkg.custom && (pkg.alsoIncluded?.length ?? 0) > 0 && (
        <>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-6 mb-3">
            Also Included, No Extra Cost
          </div>
          <ul className="space-y-3 mb-2">
            {(pkg.alsoIncluded ?? []).map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-emerald-600" strokeWidth={3} />
                </span>
                <div>
                  <span className="text-slate-800 text-sm font-semibold">{item.title}</span>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {!compact && pkg.note && (
        <p className="text-slate-400 text-xs leading-relaxed mt-6 pt-4 border-t border-slate-100">
          {pkg.note}
        </p>
      )}

      <div className="flex-1" />

      <div className="flex flex-col gap-3 mt-8">
        {compact ? (
          <Link href="/packages" className="btn-primary w-full justify-center py-3.5 group">
            View Full Details
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </motion.div>
  )
}
