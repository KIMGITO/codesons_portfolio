import { useState } from 'react'
import { FaPaperPlane, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa6'
import { cfg } from '../config'
import { services } from '../data/content'
import { useT, useLoc } from '../i18n'
import Reveal from './Reveal'

const budgets = (c) => [`Under ${c} 20,000`, `${c} 20,000 - 50,000`, `${c} 50,000 - 100,000`, `${c} 100,000+`]

/** Quote request form. Saves to VITE_FORM_ENDPOINT (e.g. Formspree) and can also open WhatsApp / email. */
export default function QuoteForm() {
  const t = useT()
  const loc = useLoc()
  const empty = { name: '', contact: '', service: '', budget: '', deadline: '', message: '', _gotcha: '' }
  const [f, setF] = useState(empty)
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const summary = `Hello ${cfg.brand}, I'm ${f.name || '...'}.\nContact: ${f.contact}\nService: ${f.service}\nBudget: ${f.budget}\nTimeline: ${f.deadline}\n\n${f.message}`
  const enc = encodeURIComponent(summary)
  const ok = f.name.trim() && f.contact.trim() && f.message.trim()

  const submit = async (e) => {
    e.preventDefault()
    if (f._gotcha || !ok) return
    if (!cfg.formEndpoint) return // no endpoint: visitor uses the WhatsApp / email buttons
    setState('sending')
    try {
      const res = await fetch(cfg.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...f, _subject: `New quote request from ${f.name}` }) })
      if (!res.ok) throw new Error('bad')
      setState('sent'); setF(empty)
    } catch { setState('error') }
  }

  const deadlines = [t('asap'), t('m1'), t('m3'), t('flexible')]

  return (
    <section className="wrap section !pt-0" id="quote">
      <Reveal>
        <form onSubmit={submit} className="glass mx-auto max-w-3xl p-6 md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">{t('quoteTitle')}</h2>
          <p className="mb-6 mt-1 text-mu">{t('quoteSub')}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" required placeholder={t('fName')} value={f.name} onChange={set('name')} />
            <input className="field" required placeholder={t('fContact')} value={f.contact} onChange={set('contact')} />
            <select className="field" value={f.service} onChange={set('service')}>
              <option value="">{t('fService')}</option>
              {services.map((s) => <option key={s.title} value={s.title}>{loc(s, 'title')}</option>)}
            </select>
            <select className="field" value={f.budget} onChange={set('budget')}>
              <option value="">{t('fBudget')}</option>
              {budgets(cfg.currency).map((b) => <option key={b}>{b}</option>)}
              <option>{t('notSure')}</option>
            </select>
            <select className="field md:col-span-2" value={f.deadline} onChange={set('deadline')}>
              <option value="">{t('fDeadline')}</option>
              {deadlines.map((d) => <option key={d}>{d}</option>)}
            </select>
            <textarea className="field min-h-32 md:col-span-2" required placeholder={t('fMessage')} value={f.message} onChange={set('message')} />
            {/* spam trap: real visitors never see or fill this */}
            <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" name="_gotcha" value={f._gotcha} onChange={set('_gotcha')} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {cfg.formEndpoint && <button type="submit" disabled={state === 'sending'} className="btn disabled:opacity-60"><FaPaperPlane /> {state === 'sending' ? t('sending') : t('send')}</button>}
            {cfg.whatsapp && <a className={cfg.formEndpoint ? 'btn-ghost' : 'btn'} href={`https://wa.me/${cfg.whatsapp}?text=${enc}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> {t('whatsapp')}</a>}
            {cfg.email && <a className="btn-ghost" href={`mailto:${cfg.email}?subject=${encodeURIComponent('Project inquiry')}&body=${enc}`}><FaPaperPlane /> {t('email')}</a>}
            {cfg.bookingUrl && <a className="btn-ghost" href={cfg.bookingUrl} target="_blank" rel="noopener noreferrer"><FaCalendarCheck /> {t('bookCall')}</a>}
          </div>
          {state === 'sent' && <p className="mt-4 rounded-xl bg-a3/15 p-3 text-a3" role="status">{t('sent')}</p>}
          {state === 'error' && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-red-500" role="alert">{t('sendError')}</p>}
        </form>
      </Reveal>
    </section>
  )
}
