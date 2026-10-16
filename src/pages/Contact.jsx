import { FaLocationDot } from 'react-icons/fa6'
import { cfg, socials } from '../config'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import QuoteForm from '../components/QuoteForm'
import FAQ from '../components/FAQ'
import AvailabilityBadge from '../components/AvailabilityBadge'

export default function Contact() {
  const t = useT()
  const loc = cfg.profile.find(([k]) => k === 'Location')
  return (
    <PageWrap>
      <PageHeader eyebrow={t('contact')} title={<>Let's <span className="gt">talk</span></>} text="Have a project in mind? Reach me on any of these channels.">
        <AvailabilityBadge className="mt-6" />
      </PageHeader>

      <section className="wrap pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map(({ name, value, href, Icon, g }, i) => (
            <Reveal key={name} delay={(i % 3) * 0.08}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 p-6">
                <div className="ring flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-on" style={{ background: g }}><Icon /></div>
                <div className="min-w-0"><p className="font-bold">{name}</p><p className="truncate text-sm text-mu">{value}</p></div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteForm />
      {loc && <p className="flex items-center justify-center gap-2 pb-16 text-center text-mu"><FaLocationDot className="text-a2" /> Based in {loc[1]} · available for projects worldwide</p>}
      <FAQ />
    </PageWrap>
  )
}
