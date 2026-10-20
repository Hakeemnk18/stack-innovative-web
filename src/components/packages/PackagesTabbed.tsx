'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PackageScroller from './PackageScroller'
import PackageAddOns from './PackageAddOns'
import type { PackageItem } from './PackageCard'

interface Category {
  id: string
  label: string
}

interface PackagesTabbedProps {
  items: PackageItem[]
  categories: Category[]
}

export default function PackagesTabbed({ items, categories }: PackagesTabbedProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '')

  const visibleItems = items.filter((item) => item.custom || item.category === activeCategory)

  return (
    <div>
      {categories.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12 px-6"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      )}

      <PackageScroller key={activeCategory} items={visibleItems} variant="detailed" />

      {/* Add-ons are scoped to Portfolio for now by design — ecommerce add-ons
          (e.g. shipping/COD integrations) need their own section later. */}
      {activeCategory === 'portfolio' && (
        <div className="max-w-7xl mx-auto px-6">
          <PackageAddOns />
        </div>
      )}
    </div>
  )
}
