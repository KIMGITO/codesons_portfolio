import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa6'
import { cfg } from '../config'
import { packages } from '../data/content'
import { useT, useLoc } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Testimonials from '../components/Testimonials'
import QuoteForm from '../components/QuoteForm'
import FAQ from '../components/FAQ'

export default function Pricing() {
  const t = useT()
  const loc = useLoc()
  return (
    <PageWrap>
      <PageHeader eyebrow={t('pricing')} title={<span className="gt">{t('pricingTitle')}</span>} text={t('pricingSub')} />

      <section className="wrap pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => {
            const numeric = /\d/.test(p.price)
            return (
              <Reveal key={p.key} delay={i * 0.12}>
                <div className={`glass glass-hover relative flex h-full flex-col p-8 ${p.popular ? '!border-a2 shadow-2xl shadow-a2/20' : ''}`}>
                  {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-a1 to-a2 px-4 py-1 text-xs font-bold text-white">{t('popular')}</span>}
                  <h3 className="text-2xl font-bold">{loc(p, 'name')}</h3>
                  <p className="mt-3 text-4xl font-bold">
                    {numeric ? <><span className="text-sm font-normal text-mu">{t('from')} {cfg.currency}</span> <span className="gt">{p.price}</span></> : <span className="gt">{p.price || t('getQuote')}</span>}
                  </p>
                  <p className="mt-3 text-sm text-mu">{loc(p, 'desc')}</p>
                  <ul className="my-6 flex-1 space-y-3">
                    {loc(p, 'features').map((f) => <li key={f} className="flex gap-3 text-sm"><FaCheck className="mt-0.5 shrink-0 text-a3" />{f}</li>)}
                  </ul>
                  <Link to="/pricing#quote" className={p.popular ? 'btn' : 'btn-ghost'}>{t('choose')}</Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Testimonials />
      <QuoteForm />
      <FAQ />
    </PageWrap>
  )
}
