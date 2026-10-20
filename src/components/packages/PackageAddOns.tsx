'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { formatPrice } from '../../lib/format'
import packagesData from '../../data/packages.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function PackageAddOns() {
  const addOns = packagesData.addOns
  if (!addOns) return null

  return (
    <div className="pt-16 lg:pt-20">
      <SectionHeader
        badge="Add-Ons"
        heading={addOns.heading}
        subheading={addOns.subheading}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addOns.items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
            className="card-base p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Plus size={15} className="text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-slate-900 font-bold text-sm">
                  {formatPrice(item.price, 'INR')}
                </div>
                {'unit' in item && item.unit && (
                  <div className="text-slate-400 text-[11px]">{item.unit}</div>
                )}
              </div>
            </div>
            <h3 className="text-slate-800 font-semibold text-sm mb-1">{item.name}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {addOns.bundleNote && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          {addOns.bundleNote}
        </motion.p>
      )}
    </div>
  )
}
