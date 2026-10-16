import { FaQuoteLeft } from 'react-icons/fa6'
import { cfg } from '../config'
import { principles } from '../data/content'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'

export default function Philosophy() {
  return (
    <PageWrap>
      <PageHeader eyebrow="My philosophy" title={<>How I <span className="gt">think</span> & work</>} text="The beliefs behind every line of code and every client relationship." image={cfg.philosophyImage} />

      {cfg.quote && (
        <section className="wrap pb-20">
          <Reveal dir="zoom">
            <blockquote className="glass relative mx-auto max-w-4xl p-10 text-center md:p-16">
              <FaQuoteLeft className="absolute left-8 top-8 text-4xl text-a2/50" />
              <p className="font-serif text-2xl italic leading-relaxed md:text-4xl">{cfg.quote}</p>
              <footer className="mt-6 text-mu">— {cfg.name}</footer>
            </blockquote>
          </Reveal>
        </section>
      )}

      <section className="wrap space-y-6 pb-20">
        {principles.map(({ Icon, title, text }, i) => (
          <Reveal key={title} dir={i % 2 ? 'right' : 'left'}>
            <div className="glass glass-hover flex flex-col items-start gap-6 p-8 md:flex-row md:items-center">
              <span className="gt font-display text-6xl font-bold md:text-8xl">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <h3 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl"><Icon className="text-a2" /> {title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-mu">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      <CtaBand title="Share the same values? Let's talk." />
    </PageWrap>
  )
}
