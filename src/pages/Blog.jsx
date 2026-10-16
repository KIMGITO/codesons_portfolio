import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaWhatsapp, FaLink, FaCheck, FaLightbulb } from 'react-icons/fa6'
import { cfg } from '../config'
import { posts } from '../data/posts'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ImageBox from '../components/ImageBox'
import CtaBand from '../components/CtaBand'

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function PostCard({ p, t, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/blog/${p.slug}`} className="glass glass-hover group flex h-full flex-col overflow-hidden">
        <ImageBox src={p.image} alt={p.title} gradient={p.gradient} className="h-44" imgClass="transition duration-700 group-hover:scale-110" />
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-2 text-xs text-mu"><span className="chip">{p.category}</span> {fmt(p.date)} · {p.read}</p>
          <h2 className="mt-3 font-serif text-xl font-bold leading-snug">{p.title}</h2>
          <p className="mt-2 flex-1 text-sm text-mu">{p.excerpt}</p>
          <span className="gt mt-4 inline-flex items-center gap-2 font-semibold">{t('readPost')} <FaArrowRight className="text-a2" /></span>
        </div>
      </Link>
    </Reveal>
  )
}

export function Blog() {
  const t = useT()
  const [cat, setCat] = useState('All')
  const cats = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [])
  const sorted = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [])
  const list = cat === 'All' ? sorted : sorted.filter((p) => p.category === cat)
  const [first, ...rest] = list
  return (
    <PageWrap>
      <PageHeader eyebrow={t('blog')} title={<span className="gt">{t('blogTitle')}</span>} text="Practical advice on websites, apps, payments and growing your business online." />
      <section className="wrap pb-20">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by category">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat === c ? 'border-a1 bg-a1 text-on' : 'border-tx/15 text-mu hover:border-tx/40 hover:text-tx'}`}>{c}</button>
          ))}
        </div>

        {first && (
          <Reveal>
            <Link to={`/blog/${first.slug}`} className="glass glass-hover group mb-8 grid overflow-hidden md:grid-cols-5">
              <ImageBox src={first.image} alt={first.title} gradient={first.gradient} className="h-60 md:col-span-3 md:h-auto md:min-h-[320px]" imgClass="transition duration-700 group-hover:scale-105" />
              <div className="flex flex-col justify-center p-7 md:col-span-2 md:p-10">
                <p className="flex flex-wrap items-center gap-2 text-xs text-mu"><span className="chip">{first.category}</span> {fmt(first.date)} · {first.read}</p>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-snug md:text-3xl">{first.title}</h2>
                <p className="mt-3 text-mu">{first.excerpt}</p>
                <span className="gt mt-5 inline-flex items-center gap-2 font-semibold">{t('readPost')} <FaArrowRight className="text-a2" /></span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => <PostCard key={p.slug} p={p} t={t} delay={(i % 3) * 0.1} />)}
        </div>
      </section>
      <CtaBand />
    </PageWrap>
  )
}

function Block({ b }) {
  if (typeof b === 'string') return <p>{b}</p>
  if (b.h) return <h2>{b.h}</h2>
  if (b.ul) return <ul>{b.ul.map((x, i) => <li key={i}>{x}</li>)}</ul>
  if (b.ol) return <ol>{b.ol.map((x, i) => <li key={i}>{x}</li>)}</ol>
  if (b.callout) return <aside className="callout"><FaLightbulb className="mt-1 shrink-0 text-a2" /><p>{b.callout}</p></aside>
  return null
}

export function BlogPost() {
  const t = useT()
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx < 0) return <Navigate to="/blog" replace />
  const p = posts[idx]
  const next = posts[(idx + 1) % posts.length]
  const related = posts.filter((x) => x.slug !== p.slug && x.category !== p.category).concat(posts.filter((x) => x.slug !== p.slug && x.category === p.category)).slice(0, 2)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard blocked */ } }
  return (
    <PageWrap>
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[61] h-0.5 origin-left bg-a2" />
      <PageHeader eyebrow={`${p.category} · ${fmt(p.date)} · ${p.read}`} title={<span className="font-serif">{p.title}</span>} text={p.excerpt} />
      <article className="wrap max-w-3xl pb-16">
        <Reveal dir="zoom"><ImageBox src={p.image} alt={p.title} gradient={p.gradient} className="mb-10 h-64 rounded-3xl md:h-96" /></Reveal>

        {p.takeaways?.length > 0 && (
          <div className="glass mb-10 border-a1/30 p-6">
            <p className="eyebrow">In short</p>
            <ul className="mt-3 space-y-2">
              {p.takeaways.map((x, i) => <li key={i} className="flex gap-3 text-tx/90"><FaCheck className="mt-1 shrink-0 text-a3" /><span>{x}</span></li>)}
            </ul>
          </div>
        )}

        <div className="story">{p.body.map((b, i) => <Reveal key={i}><Block b={b} /></Reveal>)}</div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-tx/10 pt-6">
          <p className="font-serif italic text-mu">Written by {cfg.name}, {cfg.brand}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-mu">Share</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-tx/15 text-a1 transition hover:bg-a1 hover:text-on"><FaWhatsapp /></a>
            <button onClick={copy} aria-label="Copy link" className="flex h-10 w-10 items-center justify-center rounded-full border border-tx/15 text-a1 transition hover:bg-a1 hover:text-on">{copied ? <FaCheck /> : <FaLink />}</button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4">
          <Link to="/blog" className="btn-ghost"><FaArrowLeft /> {t('allPosts')}</Link>
          {posts.length > 1 && <Link to={`/blog/${next.slug}`} className="btn">{t('nextPost')} <FaArrowRight /></Link>}
        </div>
      </article>

      {related.length > 0 && (
        <section className="wrap pb-16">
          <h2 className="mb-6 font-serif text-2xl font-bold">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-2">{related.map((r, i) => <PostCard key={r.slug} p={r} t={t} delay={i * 0.1} />)}</div>
        </section>
      )}
      <CtaBand />
    </PageWrap>
  )
}
