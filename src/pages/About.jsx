import { FaAward } from 'react-icons/fa6'
import { cfg } from '../config'
import { useT } from '../i18n'
import TechStack from '../components/TechStack'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ImageBox from '../components/ImageBox'
import Typewriter from '../components/Typewriter'
import CtaBand from '../components/CtaBand'

export default function About() {
  const t = useT()
  const initials = cfg.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <PageWrap>
      <PageHeader eyebrow="About me" title={<>Hi, I'm <span className="gt">{cfg.name}</span></>} text={cfg.tagline} />

      <section className="wrap grid items-start gap-10 pb-16 md:grid-cols-5">
        <Reveal dir="left" className="md:col-span-2">
          <div className="glass p-3">
            <ImageBox src={cfg.profileImage} alt={cfg.name} className="aspect-[4/5] rounded-2xl">
              {!cfg.profileImage && <div className="absolute inset-0 flex items-center justify-center font-display text-8xl font-bold text-on/90">{initials}</div>}
            </ImageBox>
          </div>
        </Reveal>
        <Reveal dir="right" className="md:col-span-3">
          <p className="text-2xl font-semibold md:text-3xl"><span className="gt"><Typewriter words={cfg.roles} /></span></p>
          <p className="mt-5 text-lg leading-relaxed text-mu">{cfg.about}</p>
          <div className="glass mt-8 p-6">
            <h3 className="mb-3 text-lg font-bold">Personal profile</h3>
            {cfg.profile.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-tx/10 py-3 text-sm last:border-0"><span className="text-mu">{k}</span><b className="text-right">{v}</b></div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="wrap pb-16">
        <Reveal><h2 className="mb-8 text-3xl font-bold">Education & <span className="gt">training</span></h2></Reveal>
        <div className="relative space-y-6 border-l-2 border-a2/50 pl-8">
          {cfg.education.map(([title, school, years], i) => (
            <Reveal key={i} dir="left" delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full bg-a2 ring" />
                <div className="glass p-5"><p className="text-lg font-bold">{title}</p><p className="text-mu">{school}</p><p className="mt-1 text-sm text-a3">{years}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {cfg.certificates.length > 0 && (
        <section className="wrap pb-16">
          <Reveal><h2 className="mb-8 text-3xl font-bold">{t('certs')}</h2></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cfg.certificates.map((c, i) => (
              <Reveal key={c.title + i} delay={(i % 3) * 0.1}>
                <div className="glass glass-hover h-full overflow-hidden">
                  {c.image && <a href={c.image} target="_blank" rel="noopener noreferrer"><ImageBox src={c.image} alt={c.title} className="h-40" /></a>}
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-a2 to-ge text-xl text-on"><FaAward /></div>
                    <div><p className="font-bold">{c.title}</p><p className="text-sm text-mu">{c.issuer}</p><p className="mt-1 text-xs text-a3">{c.year}</p></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="wrap">
          <Reveal><h2 className="mb-8 text-center text-3xl font-bold">Tech <span className="gt">Stack</span></h2></Reveal>
          <TechStack />
        </div>
      </section>

      <CtaBand title="Let's build something great together" />
    </PageWrap>
  )
}
