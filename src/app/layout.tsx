import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import content from '../data/content.json'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-PQRE73EFQ7'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const SITE_URL = 'https://stackinnovative.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Stack Innovative | Web & App Development Agency — Calicut, Kerala',
    template: '%s | Stack Innovative',
  },
  description:
    'Stack Innovative is a professional web & app development agency based in Calicut, Kerala, serving Kozhikode district including Balussery, Nanmanda, Kakkur, Narikkuni, Kakkodi, and Kunnamangalam. We build React, Next.js, React Native, and full-stack solutions for startups and businesses worldwide.',
  keywords: [
    'website design calicut',
    'website designing kozhikode',
    'website development calicut',
    'web development calicut',
    'software development calicut',
    'app development kerala',
    'website design balussery',
    'website development balussery',
    'web development nanmanda',
    'web development nanminda',
    'website design kakkur',
    'software development narikkuni',
    'website designing kakkodi',
    'web development kunnamangalam',
    'React developer calicut',
    'Next.js developer kerala',
    'freelance web developer calicut kozhikode',
    'Stack Innovative',
    'web design kerala',
    'mobile app development calicut',
    'full stack developer kerala',
    'portfolio website package',
  ],
  authors: [{ name: 'Stack Innovative' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: content.brand.logo, sizes: '32x32', type: 'image/png' },
      { url: content.brand.logo, sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: content.brand.logo, sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Stack Innovative | Web & App Development — Calicut, Kerala',
    description:
      'Professional web & app development agency in Calicut, Kerala. React, Next.js, React Native. Serving clients worldwide.',
    images: [{ url: '/og-image.png' }],
    locale: 'en_IN',
    siteName: 'Stack Innovative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack Innovative | Web & App Development — Calicut, Kerala',
    description:
      'Professional web & app development agency in Calicut, Kerala. React, Next.js, React Native. Serving clients worldwide.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'IN-KL',
    'geo.placename': 'Calicut, Kerala, India',
    'geo.position': '11.2588;75.7804',
    ICBM: '11.2588, 75.7804',
  },
}

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stack Innovative',
  description:
    'Professional web and app development agency in Calicut, Kerala, providing website design, website development, and software development services across Kozhikode district — including Balussery, Nanmanda, Kakkur, Narikkuni, Kakkodi, and Kunnamangalam.',
  url: SITE_URL,
  email: content.brand.email,
  telephone: content.brand.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Calicut',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.2588,
    longitude: 75.7804,
  },
  areaServed: [
    { '@type': 'Place', name: 'Calicut (Kozhikode)' },
    { '@type': 'Place', name: 'Balussery' },
    { '@type': 'Place', name: 'Nanmanda' },
    { '@type': 'Place', name: 'Kakkur' },
    { '@type': 'Place', name: 'Narikkuni' },
    { '@type': 'Place', name: 'Kakkodi' },
    { '@type': 'Place', name: 'Kunnamangalam' },
    { '@type': 'Place', name: 'Kozhikode District' },
    { '@type': 'Place', name: 'Kerala' },
    'Worldwide',
  ],
  serviceType: ['Web Development', 'App Development', 'UI/UX Design', 'E-Commerce', 'SEO'],
  priceRange: '$$',
  sameAs: content.contact.socialLinks.map((s) => s.href),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <div className="w-full min-h-screen">
          <Navbar />
          <main className="w-full">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  )
}
