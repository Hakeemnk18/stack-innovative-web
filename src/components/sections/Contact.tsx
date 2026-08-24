'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { inViewProps, inViewLeft, inViewRight } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const iconMap: Record<string, React.ElementType> = { Mail, Clock, Globe }



const socialMeta: Record<string, { color: string; hoverBg: string; hoverText: string; svg: React.ReactNode }> = {
  instagram: {
    color: '#E1306C',
    hoverBg: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400',
    hoverText: 'hover:text-white hover:border-transparent',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.585.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  threads: {
    color: '#000000',
    hoverBg: 'hover:bg-black',
    hoverText: 'hover:text-white hover:border-transparent',
    svg: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-5 h-5">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.035l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.643 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96v.065c.223 28.685 6.882 51.515 19.788 67.92 14.503 18.437 36.094 27.885 64.121 28.08h.112c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.676-24.618zM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.705-13.58 28.713-23.802 29.274z"/>
      </svg>
    ),
  },
  linkedin: {
    color: '#0077B5',
    hoverBg: 'hover:bg-[#0077B5]',
    hoverText: 'hover:text-white hover:border-transparent',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  facebook: {
    color: '#1877F2',
    hoverBg: 'hover:bg-[#1877F2]',
    hoverText: 'hover:text-white hover:border-transparent',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  youtube: {
  color: '#FF0000',
  hoverBg: 'hover:bg-[#FF0000]',
  hoverText: 'hover:text-white hover:border-transparent',
  svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.566a2.997 2.997 0 0 0-2.11 2.12C0 8.074 0 12 0 12s0 3.926.502 5.814a2.997 2.997 0 0 0 2.11 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.566a2.997 2.997 0 0 0 2.11-2.12C24 15.926 24 12 24 12s0-3.926-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
    </svg>
  ),
},
}

interface FormData {
  name: string
  email: string
  service: string
  phone: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', service: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const data = new FormData()
      data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '')
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('message', form.message)
      data.append('subject', `New Project Inquiry from ${form.name}`)
      if (form.service) data.append('service', form.service)
      if (form.phone)   data.append('phone', form.phone)
      // Honeypot anti-spam
      data.append('botcheck', '')

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()

      if (json.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', service: '', phone: '', message: '' })
      } else {
        setError(json.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  const { contact } = content

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 xl:gap-20 items-start">

          {/* Left: Info */}
          <motion.div {...inViewLeft(0)} className="lg:col-span-2 space-y-8">
            <motion.div {...inViewProps(0)}>
              <span className="section-badge">{contact.badge}</span>
            </motion.div>

            <motion.div {...inViewProps(0.08)} className="space-y-2">
              <h2 className="display-font font-black text-slate-900 text-4xl sm:text-5xl leading-tight">
                {contact.heading}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">{contact.subheading}</p>
            </motion.div>

            <motion.div {...inViewProps(0.14)} className="space-y-4">
              {contact.infoCards.map((card, i) => {
                const Icon = iconMap[card.icon] ?? Mail
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group cursor-default shadow-sm"
                  >
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-medium mb-0.5">{card.title}</div>
                      <div className="text-slate-900 font-semibold text-sm">{card.value}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Social Links */}
            {contact.socialLinks?.length > 0 && (
              <motion.div {...inViewProps(0.18)}>
                <h4 className="display-font font-bold text-slate-900 text-sm mb-4">Connect With Us</h4>
                <div className="flex gap-3">
                  {contact.socialLinks.map((social, i) => {
                    const meta = socialMeta[social.id]
                    if (!meta) return null
                    return (
                      <motion.a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: EASE }}
                        whileHover={{ scale: 1.12, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        title={social.label}
                        className={`w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 shadow-sm transition-all duration-200 ${meta.hoverBg} ${meta.hoverText}`}
                      >
                        {meta.svg}
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Process steps */}
            <motion.div {...inViewProps(0.22)}>
              <h4 className="display-font font-bold text-slate-900 text-sm mb-4">Our Process</h4>
              <div className="space-y-3">
                {[
                  { step: '01', title: 'Discovery Call', desc: '30-min chat to understand your needs' },
                  { step: '02', title: 'Proposal', desc: 'Detailed scope, timeline & pricing within 24h' },
                  { step: '03', title: 'Build', desc: 'Weekly updates, transparent development' },
                  { step: '04', title: 'Launch', desc: 'Deployment, testing & handoff' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                      <div className="text-slate-500 text-xs">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...inViewRight(0.1)} className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-card">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="display-font font-bold text-slate-900 text-2xl mb-3">Message Sent!</h3>
                  <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Thanks for reaching out. We'll review your project and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', phone: '', message: '' }) }}
                    className="btn-secondary mt-6"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="display-font font-bold text-slate-900 text-xl mb-6">
                    Tell Us About Your Project
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">{contact.formLabels.name}</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder={contact.formLabels.namePlaceholder} className="form-input" required />
                    </div>
                    <div>
                      <label className="form-label">{contact.formLabels.email}</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder={contact.formLabels.emailPlaceholder} className="form-input" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">{contact.formLabels.service}</label>
                      <select name="service" value={form.service} onChange={handleChange} className="form-input" required>
                        <option value="">Select a service</option>
                        {contact.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">{contact.formLabels.phone}</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder={contact.formLabels.phonePlaceholder} className="form-input" />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">{contact.formLabels.message}</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder={contact.formLabels.messagePlaceholder} rows={5}
                      className="form-input resize-none" required />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed group"
                    whileHover={!sending ? { scale: 1.02, boxShadow: '0 10px 28px rgba(0,102,255,0.38)' } : {}}
                    whileTap={!sending ? { scale: 0.98 } : {}}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        {contact.formLabels.sending}
                      </>
                    ) : (
                      <>
                        {contact.formLabels.submit}
                        <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  {error && (
                    <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <p className="text-center text-slate-400 text-xs pt-1">
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}