import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { cfg, socials } from '../config'
import { faqs } from '../data/content'
import { ctxFromEnv, getRouteMeta, notFoundMeta } from './routes'
import { buildSchemas } from './structuredData'

const ctx = ctxFromEnv(import.meta.env)

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content || '')
}

/** Updates title, description, canonical, robots, social-share tags and JSON-LD on every page. */
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getRouteMeta(pathname, ctx) || notFoundMeta(ctx)
    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', meta.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large')
    setMeta('property', 'og:site_name', cfg.brand)
    setMeta('property', 'og:type', meta.type)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', meta.url)
    setMeta('property', 'og:image', meta.image)
    setMeta('name', 'twitter:card', meta.image ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', meta.image)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (meta.url && !meta.noindex) {
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
      link.href = meta.url
    } else link?.remove()

    const ld = buildSchemas({
      meta, ctx, faqs, phone: cfg.phone, email: cfg.email, logo: '/icon-512.png',
      sameAs: socials.map((x) => x.href).filter((h) => /^https?:\/\//.test(h) && !h.includes('wa.me')),
    })
    let el = document.getElementById('ld-json')
    if (!el) { el = document.createElement('script'); el.id = 'ld-json'; el.type = 'application/ld+json'; document.head.appendChild(el) }
    el.textContent = JSON.stringify(ld)
  }, [pathname])
  return null
}
