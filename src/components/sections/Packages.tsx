'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import PackageCard from '../packages/PackageCard'
import packages from '../../data/packages.json'
import { inViewProps } from '../../lib/motion'

export default function Packages() {
  return (
    <section id="packages" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={packages.badge}
          heading={packages.heading}
          subheading={packages.subheading}
        />

        <div className="flex flex-wrap justify-center gap-8">
          {packages.items.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} variant="compact" delay={0.05 + i * 0.1} />
          ))}
        </div>

        <motion.div {...inViewProps(0.15)} className="text-center mt-12">
          <Link href="/packages" className="btn-secondary group">
            View All Packages
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
