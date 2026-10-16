import { FaBullseye, FaEye } from 'react-icons/fa6'
import { cfg } from '../config'
import { services, process } from '../data/content'
import { useLoc } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import CtaBand from '../components/CtaBand'

export default function Company() {
  const loc = useLoc()
  return (
    <PageWrap>
      <PageHeader eyebrow="The company" title={<>This is <span className="gt">{cfg.brand}</span></>} text={cfg.companyAbout} />

      <section className="wrap grid gap-6 pb-16 md:grid-cols-2">
        {[[FaBullseye, 'Our mission', cfg.mission], [FaEye, 'Our vision', cfg.vision]].map(([Icon, t, x], i) => x && (
          <Reveal key={t} dir={i ? 'right' : 'left'}>
            <div className="glass h-full p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-a1 to-a3 text-2xl text-white"><Icon /></div>
              <h3 className="text-2xl font-bold">{t}</h3><p className="mt-3 text-lg text-mu">{x}</p>
              {i === 0 && cfg.founded && <p className="mt-5 text-sm text-a3">Founded {cfg.founded}</p>}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="wrap section">
        <SectionTitle eyebrow="Services" title={<>What <span className="gt">we do</span></>} />
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => { const Icon = s.Icon; return (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="glass glass-hover flex h-full gap-5 p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-a1 to-a2 text-2xl text-white"><Icon /></div>
                <div><h3 className="text-xl font-bold">{loc(s, 'title')}</h3><p className="mt-2 text-mu">{loc(s, 'text')}</p></div>
              </div>
            </Reveal>
          )})}
        </div>
      </section>

      <section className="wrap pb-20">
        <SectionTitle eyebrow="How we work" title={<>Our <span className="gt">process</span></>} />
        <div className="grid gap-6 md:grid-cols-4">
          {process.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <div className="glass relative h-full p-6 text-center">
                <span className="absolute right-4 top-3 font-display text-5xl font-bold text-tx/10">{i + 1}</span>
                <Icon className="mx-auto mb-4 text-3xl text-a2" /><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-mu">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </PageWrap>
  )
}
