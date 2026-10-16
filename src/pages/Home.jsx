import { Link } from 'react-router-dom'
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa6'
import { cfg } from '../config'
import { services } from '../data/content'
import { cases } from '../data/cases'
import { stories } from '../data/stories'
import { useT, useLoc } from '../i18n'
import Testimonials from '../components/Testimonials'
import ClientsStrip from '../components/ClientsStrip'
import PageWrap from '../components/PageWrap'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import Counter from '../components/Counter'
import ImageBox from '../components/ImageBox'
import CtaBand from '../components/CtaBand'
import BlurSection from '../components/BlurSection'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  const t = useT()
  const loc = useLoc()
  return (
    <PageWrap>
      <Hero />

      {/* Stats — proper section with blurred bg */}
      <BlurSection bgImage="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" className="py-20 md:py-28">
        <div className="wrap">
          <SectionTitle eyebrow="Impact" title={<>Numbers that <span className="gt">speak</span></>} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {cfg.stats.map((s) => (
              <Reveal key={s.label}>
                <div className="glass p-8 text-center">
                  <p className="gt font-display text-4xl font-bold md:text-6xl"><Counter to={s.n} suffix={s.suffix} /></p>
                  <p className="mt-3 text-sm text-mu md:text-base">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </BlurSection>

      <ClientsStrip />

      {/* Services — keep as-is */}
      <section className="wrap section !pt-6">
        <SectionTitle eyebrow={t('whatWeDo')} title={<>Services that <span className="gt">grow your business</span></>} sub={cfg.companyAbout} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => { const Icon = s.Icon; return (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="glass glass-hover h-full p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-a1 to-ge text-2xl text-on"><Icon /></div>
                <h3 className="text-xl font-bold">{loc(s, 'title')}</h3>
                <p className="mt-2 text-sm text-mu">{loc(s, 'text')}</p>
              </div>
            </Reveal>
          )})}
        </div>
      </section>

      {/* Featured work — mixed card variants */}
      <section className="wrap section !pt-0">
        <SectionTitle eyebrow="Portfolio" title={<>Featured <span className="gt">work</span></>} />
        <div className="space-y-6">
          {cases.length > 0 && (
            <Reveal>
              <ProjectCard project={cases[0]} variant="overlay" />
            </Reveal>
          )}
          {cases.length > 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              {cases.slice(1, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.15}>
                  <ProjectCard project={p} variant="standard" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-center"><Link to="/work" className="btn-ghost">{t('seeAll')} <FaArrowRight /></Link></div>
      </section>

      {/* Quote — keep as-is */}
      {cfg.quote && (
        <section className="relative overflow-hidden bg-bg2/60 py-24">
          <div className="blob left-1/4 top-0 h-72 w-72 bg-a1" />
          <Reveal className="wrap relative text-center">
            <FaQuoteLeft className="mx-auto mb-6 text-4xl text-a2" />
            <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed md:text-4xl">{cfg.quote}</p>
            <Link to="/philosophy" className="btn mt-9">My philosophy <FaArrowRight /></Link>
          </Reveal>
        </section>
      )}

      <Testimonials />

      {/* Stories — with blurred bg */}
      <BlurSection bgImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" className="py-20 md:py-28">
        <div className="wrap">
          <SectionTitle eyebrow="Stories" title={<>Words from <span className="gt">my journey</span></>} />
          <div className="grid gap-6 md:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link to={`/stories/${s.slug}`} className="glass glass-hover group block h-full overflow-hidden">
                  <ImageBox src={s.image} alt={s.title} gradient={s.gradient} className="h-44" imgClass="transition duration-700 group-hover:scale-110" />
                  <div className="p-6"><p className="text-xs text-mu">{s.date} · {s.read}</p><h3 className="mt-2 font-serif text-xl font-bold">{s.title}</h3><p className="mt-2 text-sm text-mu">{s.excerpt}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </BlurSection>

      <CtaBand />
    </PageWrap>
  )
}
