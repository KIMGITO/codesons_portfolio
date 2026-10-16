import { Link, useParams, Navigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaGithub, FaTriangleExclamation, FaLightbulb, FaTrophy } from 'react-icons/fa6'
import { cases } from '../data/cases'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ImageBox from '../components/ImageBox'
import CtaBand from '../components/CtaBand'

export default function CaseStudy() {
  const t = useT()
  const { slug } = useParams()
  const idx = cases.findIndex((c) => c.slug === slug)
  if (idx < 0) return <Navigate to="/work" replace />
  const c = cases[idx]
  const next = cases[(idx + 1) % cases.length]
  const blocks = [[FaTriangleExclamation, t('problem'), c.problem], [FaLightbulb, t('solution'), c.solution], [FaTrophy, t('result'), c.result]]

  return (
    <PageWrap>
      <PageHeader eyebrow={c.category} title={<span className="gt">{c.title}</span>} text={c.summary} />
      <article className="wrap pb-16">
        <Reveal dir="zoom"><ImageBox src={c.image} alt={c.title} gradient={c.gradient} className="mb-10 h-64 rounded-3xl md:h-[26rem]" /></Reveal>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-sm text-mu">{t('stack')}:</span>
          {c.tags.map((x) => <span key={x} className="rounded-full bg-gradient-to-r from-a1 to-ge px-3 py-1 text-xs text-on">{x}</span>)}
          <span className="flex-1" />
          {c.demoUrl && <a href={c.demoUrl} target="_blank" rel="noopener noreferrer" className="btn !py-2 text-sm"><FaArrowUpRightFromSquare /> {t('liveDemo')}</a>}
          {c.repoUrl && <a href={c.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 text-sm"><FaGithub /> Code</a>}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map(([Icon, label, text], i) => (
            <Reveal key={label} delay={i * 0.12}>
              <div className="glass h-full p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-a1 to-ge text-xl text-on"><Icon /></div>
                <h2 className="text-xl font-bold">{label}</h2>
                <p className="mt-3 leading-relaxed text-mu">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {c.screenshots.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {c.screenshots.map((src, i) => <Reveal key={src + i} dir="zoom" delay={(i % 2) * 0.1}><img src={src} alt={`${c.title} screenshot ${i + 1}`} loading="lazy" decoding="async" className="w-full rounded-2xl border border-tx/10" /></Reveal>)}
          </div>
        )}

        <div className="mt-14 flex flex-wrap justify-between gap-4">
          <Link to="/work" className="btn-ghost"><FaArrowLeft /> {t('allWork')}</Link>
          {cases.length > 1 && <Link to={`/work/${next.slug}`} className="btn">{t('nextCase')} <FaArrowRight /></Link>}
        </div>
      </article>
      <CtaBand />
    </PageWrap>
  )
}
