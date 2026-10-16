import { Link, useParams, Navigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { cfg } from '../config'
import { posts } from '../data/posts'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ImageBox from '../components/ImageBox'
import CtaBand from '../components/CtaBand'

export function Blog() {
  const t = useT()
  return (
    <PageWrap>
      <PageHeader eyebrow={t('blog')} title={<span className="gt">{t('blogTitle')}</span>} text="Practical advice on websites, apps and growing your business online." />
      <section className="wrap grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.1}>
            <Link to={`/blog/${p.slug}`} className="glass glass-hover group flex h-full flex-col overflow-hidden">
              <ImageBox src={p.image} alt={p.title} gradient={p.gradient} className="h-44" imgClass="transition duration-700 group-hover:scale-110" />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-a3">{p.category} · {p.read}</p>
                <h2 className="mt-2 font-serif text-xl font-bold">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-mu">{p.excerpt}</p>
                <span className="gt mt-4 inline-flex items-center gap-2 font-semibold">{t('readPost')} <FaArrowRight className="text-a2" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </PageWrap>
  )
}

export function BlogPost() {
  const t = useT()
  const { slug } = useParams()
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx < 0) return <Navigate to="/blog" replace />
  const p = posts[idx]
  const next = posts[(idx + 1) % posts.length]
  return (
    <PageWrap>
      <PageHeader eyebrow={`${p.category} · ${p.date} · ${p.read}`} title={<span className="font-serif">{p.title}</span>} />
      <article className="wrap max-w-3xl pb-16">
        <Reveal dir="zoom"><ImageBox src={p.image} gradient={p.gradient} className="mb-12 h-64 rounded-3xl md:h-80" /></Reveal>
        <div className="story">{p.body.map((x, i) => <Reveal key={i}><p>{x}</p></Reveal>)}</div>
        <p className="mt-10 font-serif italic text-mu">— {cfg.name}, {cfg.brand}</p>
        <div className="mt-12 flex flex-wrap justify-between gap-4">
          <Link to="/blog" className="btn-ghost"><FaArrowLeft /> {t('allPosts')}</Link>
          {posts.length > 1 && <Link to={`/blog/${next.slug}`} className="btn">{t('nextPost')} <FaArrowRight /></Link>}
        </div>
      </article>
      <CtaBand />
    </PageWrap>
  )
}
