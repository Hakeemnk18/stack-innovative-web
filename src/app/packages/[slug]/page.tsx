import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Sparkles, Timer } from 'lucide-react'
import { formatPrice } from '../../../lib/format'
import { buildWhatsAppUrl } from '../../../lib/whatsapp'
import packagesData from '../../../data/packages.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

function findPackage(slug: string) {
  return packagesData.items.find((item) => item.slug === slug && !item.custom)
}

export async function generateStaticParams() {
  return packagesData.items.filter((item) => !item.custom).map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pkg = findPackage(slug)
  if (!pkg) return {}

  const title = `${pkg.name} — Full Details`
  return {
    title,
    description: pkg.tagline,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      url: `/packages/${pkg.slug}`,
      title: `${pkg.name} | Stack Innovative`,
      description: pkg.tagline,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pkg.name} | Stack Innovative`,
      description: pkg.tagline,
    },
  }
}

export default async function PackageDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const pkg = findPackage(slug)
  if (!pkg) notFound()

  const waUrl = buildWhatsAppUrl(pkg.cta.whatsappMessage)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.tagline,
    brand: { '@type': 'Brand', name: 'Stack Innovative' },
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: 'https://schema.org/InStock',
      url: `https://stackinnovative.com/packages/${pkg.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section className="pt-40 pb-12 lg:pt-48">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            All Packages
          </Link>

          {pkg.popular && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-gradient-primary rounded-full text-white text-xs font-semibold shadow-lg">
              <Sparkles size={12} />
              Most Popular
            </div>
          )}
          {pkg.limitedOffer && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-semibold shadow-lg">
              <Timer size={12} />
              Limited Time Offer
            </div>
          )}

          <h1 className="display-font font-bold text-slate-900 text-3xl sm:text-4xl mb-3">
            {pkg.name}
          </h1>
          <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-xl">{pkg.tagline}</p>

          <div className="flex items-baseline gap-2">
            <span className="display-font font-black text-slate-900 text-4xl sm:text-5xl">
              {formatPrice(pkg.price!, pkg.currency!)}
            </span>
            <span className="text-slate-400 text-sm font-medium">/ {pkg.cadence}</span>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="card-base shadow-card p-6 lg:p-10">
            {pkg.includedIntro && (
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">
                {pkg.includedIntro}
              </p>
            )}

            <ul className="space-y-4 mb-2">
              {(pkg.included ?? []).map((item) => (
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

            {(pkg.alsoIncluded?.length ?? 0) > 0 && (
              <>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-8 mb-4">
                  Also Included, No Extra Cost
                </div>
                <ul className="space-y-4 mb-2">
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

            {pkg.note && (
              <p className="text-slate-400 text-xs leading-relaxed mt-8 pt-5 border-t border-slate-100">
                {pkg.note}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/#contact" className="btn-primary flex-1 justify-center py-3.5 group">
              {pkg.cta.primaryLabel}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 justify-center py-3.5"
            >
              {pkg.cta.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
