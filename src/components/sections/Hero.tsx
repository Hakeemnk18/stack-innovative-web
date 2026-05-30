import { motion } from 'framer-motion'
import { ArrowRight, Code2, Zap, Globe } from 'lucide-react'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const serviceBadges = [
  { label: 'Mobile Apps', color: '#61DAFB' },
  { label: 'Portfolio Websites', color: '#FFFFFF' },
  { label: 'E-Commerce', color: '#3178C6' },
  { label: 'ERP Systems', color: '#68A063' },
  { label: 'HRM Solutions', color: '#38BDF8' },
  { label: 'CRM Platforms', color: '#336791' },
  { label: 'Billing Software', color: '#54C5F8' },
  { label: 'Custom Web Apps', color: '#8B5CF6' },
]

const floatingCards = [
  { icon: Zap, label: 'Fast Delivery', sub: 'Quick Turnaround', color: '#0066FF', delay: 0 },
  { icon: Zap, label: '99% Satisfaction', sub: 'Client Rating', color: '#10B981', delay: 1.5 },
  { icon: Globe, label: 'Worldwide', sub: 'Remote Ready', color: '#7C3AED', delay: 3 },
]

const positions = [
  { top: '-20px', left: '-24px', bottom: 'auto', right: 'auto' },
  { top: '42%', left: 'auto', bottom: 'auto', right: '-24px' },
  { top: 'auto', left: '-24px', bottom: '-16px', right: 'auto' },
]

export default function Hero() {
  const handleCTA = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section pt-24" id="home">
      <div className="hero-grid-overlay" />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {content.hero.availableBadge}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="space-y-1"
            >
              <h1 className="display-font font-black text-white leading-none text-5xl sm:text-6xl xl:text-7xl">
                {content.hero.headline}
              </h1>
              <h1 className="display-font font-black leading-none text-5xl sm:text-6xl xl:text-7xl gradient-text">
                {content.hero.headlineAccent}
              </h1>
              <h1 className="display-font font-black text-white/40 leading-none text-5xl sm:text-6xl xl:text-7xl">
                {content.hero.headline2}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-slate-400 text-lg sm:text-xl leading-relaxed"
              style={{ maxWidth: 'min(32rem, calc(100vw - 3rem))' }}
            >
              {content.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={() => handleCTA(content.hero.cta1.href)}
                className="btn-primary text-base group"
                whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(0,102,255,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                {content.hero.cta1.label}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => handleCTA(content.hero.cta2.href)}
                className="btn-ghost-white text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {content.hero.cta2.label}
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 pt-2"
            >
              {/* Row 1 on mobile: avatar circles */}
              <div className="flex -space-x-2 flex-shrink-0">
                {['AM', 'SC', 'MJ', 'PP'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: ['#0066FF', '#7C3AED', '#10B981', '#F59E0B'][i] }}
                  >
                    {initials}
                  </div>
                ))}
              </div>

              {/* Row 2 on mobile: stars + location text */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 star-filled flex-shrink-0" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-slate-500 text-xs break-words">{content.hero.socialProof}</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Browser Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="hidden lg:block relative"
          >
            {/* Floating cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: EASE }}
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  ...positions[i],
                  animation: `float 6s ease-in-out ${card.delay}s infinite`,
                }}
                className="bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-xl"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${card.color}20` }}
                >
                  <card.icon size={18} style={{ color: card.color }} />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold leading-tight">{card.label}</div>
                  <div className="text-slate-500 text-xs">{card.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Browser mockup */}
            <motion.div
              className="browser-mockup"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="browser-chrome">
                <div className="browser-dot" style={{ background: '#EF4444' }} />
                <div className="browser-dot" style={{ background: '#F59E0B' }} />
                <div className="browser-dot" style={{ background: '#10B981' }} />
                <div className="browser-url">stackinnovative.com/project</div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Live</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Fake nav */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    {[32, 40, 36, 28].map((w, i) => (
                      <div key={i} className="h-2 rounded-full bg-white/8" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <div className="h-7 w-20 bg-blue-500/80 rounded-full" />
                </div>

                {/* Fake hero */}
                <div className="bg-white/4 rounded-xl p-5 border border-white/6 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <div className="h-1.5 w-20 bg-emerald-400/60 rounded-full" />
                  </div>
                  <div className="h-4 bg-white/20 rounded-full w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-blue-500/60 to-violet-500/60 rounded-full w-1/2" />
                  <div className="space-y-1.5">
                    <div className="h-2 bg-white/10 rounded-full" />
                    <div className="h-2 bg-white/10 rounded-full w-4/5" />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <div className="h-8 w-24 bg-blue-500 rounded-full" />
                    <div className="h-8 w-24 bg-white/10 rounded-full border border-white/10" />
                  </div>
                </div>

                {/* Fake cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[{ c: '#3B82F6', w: '70%' }, { c: '#8B5CF6', w: '60%' }, { c: '#10B981', w: '80%' }].map((item, i) => (
                    <div key={i} className="bg-white/4 rounded-xl p-3 border border-white/6 space-y-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.c}25` }}>
                        <div className="w-3 h-3 rounded-sm" style={{ background: item.c }} />
                      </div>
                      <div className="h-1.5 bg-white/15 rounded-full" />
                      <div className="h-1.5 bg-white/8 rounded-full" style={{ width: item.w }} />
                    </div>
                  ))}
                </div>

                {/* Tech row */}
                <div className="flex items-center gap-2 py-1">
                  {serviceBadges.slice(0, 5).map((t, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 rounded-full border flex-shrink-0"
                      style={{ borderColor: `${t.color}30`, color: t.color, background: `${t.color}10`, fontSize: '10px', fontWeight: 500 }}
                    >
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Glow behind mockup */}
            <div
              className="absolute inset-0 -z-10 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.18) 0%, transparent 70%)', transform: 'scale(1.15)' }}
            />
          </motion.div>
        </div>

        {/* Scrolling tech strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="mt-24 relative"
        >
          <div className="text-center mb-6">
            <span className="text-slate-600 text-xs font-medium tracking-widest uppercase">
              Services We Offer
            </span>
          </div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...serviceBadges, ...serviceBadges].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/4 text-sm font-medium text-white/60"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
