import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 30

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 })

  useEffect(() => {
    const ids = content.nav.links.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.3 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const go = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, width: '100%' }}
      />

      <nav className="navbar">
        <div className="navbar-inner">
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className={`navbar-pill ${scrolled ? 'scrolled' : ''}`}>

              {/* Logo */}
              <motion.a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="flex items-center gap-2.5 flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative w-9 h-9">
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ['0 0 0px rgba(0,102,255,0)', '0 0 18px rgba(0,102,255,0.5)', '0 0 0px rgba(0,102,255,0)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <svg viewBox="0 0 28 28" width="18" height="18" fill="none">
                      <rect x="4" y="16" width="20" height="4" rx="2" fill="white" opacity="0.55"/>
                      <rect x="6" y="10" width="16" height="4" rx="2" fill="white" opacity="0.8"/>
                      <rect x="8" y="4" width="12" height="4" rx="2" fill="white"/>
                    </svg>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-bold text-sm leading-tight tracking-wide">{content.brand.name}</div>
                  <div className="text-slate-500 text-[10px] font-medium tracking-wider uppercase">{content.brand.tagline}</div>
                </div>
              </motion.a>

              {/* Desktop nav links */}
              <div className="hidden lg:flex items-center gap-0.5">
                {content.nav.links.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                      onClick={() => go(link.href)}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          className="nav-link-dot"
                          layoutId="navDot"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Available</span>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
                  onClick={() => go(content.nav.cta.href)}
                  className="btn-primary text-sm py-2.5 px-5 hidden sm:flex"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,102,255,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {content.nav.cta.label}
                  <ArrowRight size={13} />
                </motion.button>

                <motion.button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/8 rounded-full transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={mobileOpen ? 'x' : 'menu'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.18 }}
                    >
                      {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="lg:hidden mt-2 bg-slate-950/95 backdrop-blur-2xl border border-white/8 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-3 space-y-0.5">
                  {content.nav.links.map((link, i) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.05, ease: EASE }}
                      onClick={() => go(link.href)}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-white/65 hover:text-white hover:bg-white/6 rounded-xl transition-all flex items-center justify-between group"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.18 }}
                  className="px-3 pb-3 pt-1 border-t border-white/6"
                >
                  <div className="flex items-center gap-2 px-4 py-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-xs font-medium">Available for new projects</span>
                  </div>
                  <button onClick={() => go(content.nav.cta.href)} className="btn-primary w-full justify-center py-3">
                    {content.nav.cta.label} <ArrowRight size={14} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
