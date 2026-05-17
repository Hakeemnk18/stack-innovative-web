import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, ShoppingCart, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { inViewProps, inViewScale } from '../../lib/motion'
import content from '../../data/content.json'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, ShoppingCart, TrendingUp, Shield,
}

export default function Services() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={content.services.badge}
          heading={content.services.heading}
          subheading={content.services.subheading}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.items.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe
            return (
              <motion.div
                key={service.id}
                {...inViewScale(i * 0.07)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="card-base p-7 flex flex-col group cursor-pointer"
                onClick={() => handleClick(service.href)}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${service.color}15` }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </motion.div>

                <h3 className="display-font font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  Learn More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>

        <motion.div {...inViewProps(0.1)} className="text-center mt-14">
          <p className="text-slate-500 mb-5 text-base">Not sure what you need? Let's talk about your project.</p>
          <motion.button
            onClick={() => handleClick('#contact')}
            className="btn-primary"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(0,102,255,0.38)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get a Free Consultation <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
