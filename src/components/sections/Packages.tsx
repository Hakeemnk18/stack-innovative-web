'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import PackageScroller from '../packages/PackageScroller'
import packages from '../../data/packages.json'
import { inViewProps } from '../../lib/motion'

export default function Packages() {
  return (
    <section id="packages" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="px-6">
          <SectionHeader
            badge={packages.badge}
            heading={packages.heading}
            subheading={packages.subheading}
          />
        </div>

        <PackageScroller items={packages.items} variant="compact" />

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
