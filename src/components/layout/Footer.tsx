import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Github, Youtube, ArrowRight, CheckCircle2 } from 'lucide-react'
import { inViewProps } from '../../lib/motion'
import content from '../../data/content.json'

const socialIconMap: Record<string, React.ElementType> = {
  Instagram, Twitter, Linkedin, Github, Youtube,
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  const { footer } = content

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-6 gap-10 lg:gap-12">

          {/* Brand + Newsletter */}
          <motion.div {...inViewProps(0)} className="lg:col-span-2 space-y-6">
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg viewBox="0 0 28 28" width="20" height="20" fill="none">
                  <rect x="4" y="16" width="20" height="4" rx="2" fill="white" opacity="0.6"/>
                  <rect x="6" y="10" width="16" height="4" rx="2" fill="white" opacity="0.8"/>
                  <rect x="8" y="4" width="12" height="4" rx="2" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-sm leading-tight">{content.brand.name}</div>
                <div className="text-slate-500 text-xs">{content.brand.tagline}</div>
              </div>
            </motion.a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{footer.tagline}</p>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                {footer.newsletter.heading}
              </div>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <CheckCircle2 size={16} />
                  <span>You're subscribed!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footer.newsletter.placeholder}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors min-w-0"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <ArrowRight size={15} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Link columns */}
          {footer.columns.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 + ci * 0.07, ease: EASE }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white text-sm">{col.heading}</h4>
              <ul className="space-y-0.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p {...inViewProps(0)} className="text-slate-600 text-xs">
            © {new Date().getFullYear()} {footer.copyright}
          </motion.p>

          <motion.div {...inViewProps(0.05)} className="flex items-center gap-2">
            {footer.social.map((s) => {
              const Icon = socialIconMap[s.icon] ?? Github
              return (
                <motion.a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="social-icon-btn"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon size={15} />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
