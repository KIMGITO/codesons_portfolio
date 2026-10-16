import { Link, useParams, Navigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { cfg } from '../config'
import { stories } from '../data/stories'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ImageBox from '../components/ImageBox'
import CtaBand from '../components/CtaBand'

export function Stories() {
  const t = useT()
  return (
    <PageWrap>
      <PageHeader eyebrow="Stories" title={<>Stories from <span className="gt">my journey</span></>} text="The experiences, lessons and moments that shaped me and Codensons." />
      <section className="wrap space-y-8 pb-20">
        {stories.map((s, i) => (
          <Reveal key={s.slug}>
            <Link to={`/stories/${s.slug}`} className={`glass glass-hover group grid overflow-hidden md:grid-cols-5 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
              <ImageBox src={s.image} alt={s.title} gradient={s.gradient} className="h-56 md:col-span-2 md:h-auto" imgClass="transition duration-700 group-hover:scale-110" />
              <div className="p-8 md:col-span-3 md:p-10">
                <p className="text-sm text-mu">{s.date} · {s.read}</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-lg text-mu">{s.excerpt}</p>
                <span className="gt mt-5 inline-flex items-center gap-2 font-semibold">{t('readStory')} <FaArrowRight className="text-a2" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </PageWrap>
  )
}

export function StoryPage() {
  const t = useT()
  const { slug } = useParams()
  const idx = stories.findIndex((s) => s.slug === slug)
  if (idx < 0) return <Navigate to="/stories" replace />
  const s = stories[idx]
  const next = stories[(idx + 1) % stories.length]
  return (
    <PageWrap>
      <PageHeader eyebrow={`${s.date} · ${s.read}`} title={<span className="font-serif">{s.title}</span>} image={s.image} />
      <article className="wrap max-w-3xl pb-16">
        <Reveal dir="zoom"><ImageBox src={s.image} alt={s.title} gradient={s.gradient} className="mb-12 h-64 rounded-3xl md:h-96" /></Reveal>
        <div className="story">{s.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}</div>
        <p className="mt-10 font-serif italic text-mu">— {cfg.name}</p>
        <div className="mt-12 flex flex-wrap justify-between gap-4">
          <Link to="/stories" className="btn-ghost"><FaArrowLeft /> {t('allStories')}</Link>
          <Link to={`/stories/${next.slug}`} className="btn">{t('nextStory')} <FaArrowRight /></Link>
        </div>
      </article>
    </PageWrap>
  )
}
