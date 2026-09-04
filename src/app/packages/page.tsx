import type { Metadata } from 'next'
import SectionHeader from '../../components/ui/SectionHeader'
import PackageScroller from '../../components/packages/PackageScroller'
import PackagesFAQ from '../../components/packages/PackagesFAQ'
import packagesData from '../../data/packages.json'
import faqData from '../../data/faq.json'

export const metadata: Metadata = {
  title: 'Packages & Pricing',
  description:
    'Simple, transparent website packages from Stack Innovative. The Portfolio Website Package (₹4,999) includes a multi-page site, free hosting, SEO & GEO setup, a CMS, and more — no hidden costs.',
  alternates: { canonical: '/packages' },
  openGraph: {
    url: '/packages',
    title: 'Packages & Pricing | Stack Innovative',
    description:
      'Simple, transparent website packages from Stack Innovative. The Portfolio Website Package (₹4,999) includes a multi-page site, free hosting, SEO & GEO setup, a CMS, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Packages & Pricing | Stack Innovative',
    description:
      'Simple, transparent website packages from Stack Innovative. The Portfolio Website Package (₹4,999) includes a multi-page site, free hosting, SEO & GEO setup, a CMS, and more.',
  },
}

const productJsonLd = packagesData.items.filter((pkg) => !pkg.custom).map((pkg) => ({
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
    url: 'https://stackinnovative.com/packages',
  },
}))

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge={packagesData.badge}
            heading={packagesData.heading}
            subheading={packagesData.subheading}
          />
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <PackageScroller items={packagesData.items} variant="detailed" />
        </div>
      </section>

      <PackagesFAQ />
    </>
  )
}
