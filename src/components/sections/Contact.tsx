import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { inViewProps, inViewLeft, inViewRight } from '../../lib/motion'
import content from '../../data/content.json'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const iconMap: Record<string, React.ElementType> = { Mail, Clock, Globe }

interface FormData {
  name: string
  email: string
  service: string
  budget: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', service: '', budget: '', message: '' })
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
      data.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY ?? '')
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('message', form.message)
      data.append('subject', `New Project Inquiry from ${form.name}`)
      if (form.service) data.append('service', form.service)
      if (form.budget)  data.append('budget', form.budget)
      // Honeypot anti-spam
      data.append('botcheck', '')

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()

      if (json.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', service: '', budget: '', message: '' })
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
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', budget: '', message: '' }) }}
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
                      <label className="form-label">{contact.formLabels.budget}</label>
                      <select name="budget" value={form.budget} onChange={handleChange} className="form-input">
                        <option value="">Select a budget</option>
                        {contact.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
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
