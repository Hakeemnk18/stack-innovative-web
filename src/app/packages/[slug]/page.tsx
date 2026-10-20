import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Timer,
  Home,
  User,
  LayoutGrid,
  Mail,
  Download,
  Pencil,
  UserCog,
} from 'lucide-react'
import { formatPrice } from '../../../lib/format'
import { buildWhatsAppUrl } from '../../../lib/whatsapp'
import type { PackageItem } from '../../../components/packages/PackageCard'
import packagesData from '../../../data/packages.json'

const packageItems = packagesData.items as PackageItem[]

interface PageProps {
  params: Promise<{ slug: string }>
}

const pageIcons: Record<string, React.ElementType> = {
  Home,
  User,
  LayoutGrid,
  Mail,
}

function findPackage(slug: string) {
  return packageItems.find((item) => item.slug === slug && !item.custom)
}

export async function generateStaticParams() {
  return packageItems.filter((item) => !item.custom).map((item) => ({ slug: item.slug }))
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
      url: `https://www.stackinnovative.in/packages/${pkg.slug}`,
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
            className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            All Packages
          </Link>

          {pkg.popular && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-gradient-primary rounded-full text-white text-xs font-semibold shadow-lg">
              <Sparkles size={12} />
              {pkg.badgeLabel ?? 'Most Popular'}
            </div>
          )}
          {pkg.limitedOffer && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-semibold shadow-lg">
              <Timer size={12} />
              {pkg.badgeLabel ?? 'Limited Time Offer'}
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
            {pkg.worthValue && (
              <span className="text-slate-400 text-sm font-medium">
                · worth {formatPrice(pkg.worthValue, pkg.currency!)}
              </span>
            )}
          </div>

          {(pkg.quickFacts?.length ?? 0) > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {pkg.quickFacts!.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-blue-50/60 border border-blue-100 rounded-xl px-3 py-3 text-center"
                >
                  <div className="text-primary font-bold text-sm">{fact.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{fact.label}</div>
                </div>
              ))}
            </div>
          )}

          {pkg.pdfUrl && (
            <a
              href={pkg.pdfUrl}
              download
              className="btn-secondary mt-6"
            >
              <Download size={16} />
              Download Full Package (PDF)
            </a>
          )}
        </div>
      </section>

      {pkg.pagesCaption && (packagesData.pagesIncluded?.length ?? 0) > 0 && (
        <section className="pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-slate-800 text-sm font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Your Website Pages
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {packagesData.pagesIncluded.map((page) => {
                const Icon = pageIcons[page.icon] ?? Home
                return (
                  <div key={page.title} className="card-base p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-50 flex items-center justify-center">
                      <Icon size={18} className="text-blue-600" />
                    </div>
                    <div className="text-slate-800 text-sm font-semibold mb-1">{page.title}</div>
                    <p className="text-slate-500 text-xs leading-relaxed">{page.desc}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mt-4">{pkg.pagesCaption}</p>
          </div>
        </section>
      )}

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
                  {pkg.alsoIncludedHeading ?? 'Also Included, No Extra Cost'}
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

          {(pkg.editPanel || pkg.editPanelNote) && (
            <div className="card-base shadow-card p-6 lg:p-10 mt-6">
              <h2 className="text-slate-800 text-sm font-bold mb-5 flex items-center gap-2">
                <UserCog size={16} className="text-primary" />
                Easy Edit Panel: What You Can Change
              </h2>

              {pkg.editPanelNote ? (
                <p className="text-slate-600 text-sm leading-relaxed">{pkg.editPanelNote}</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                    <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wide mb-3">
                      You can update these anytime
                    </p>
                    <ul className="space-y-2">
                      {pkg.editPanel!.selfEdit.map((item) => (
                        <li key={item} className="text-slate-600 text-sm flex items-start gap-2">
                          <Check size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={3} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">
                      We update these for you (paid)
                    </p>
                    <ul className="space-y-2">
                      {pkg.editPanel!.weEdit.map((item) => (
                        <li key={item} className="text-slate-500 text-sm flex items-start gap-2">
                          <Pencil size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {(pkg.howItWorks?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h2 className="text-slate-800 text-sm font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                How It Works
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pkg.howItWorks!.map((step, i) => (
                  <div key={step.title} className="bg-slate-900 rounded-xl p-4">
                    <div className="text-primary-light text-xs font-bold mb-1">Step {i + 1}</div>
                    <div className="text-white text-sm font-semibold mb-1">{step.title}</div>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
