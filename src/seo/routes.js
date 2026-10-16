/* ============================================================
   SEO: single source of truth for every page's title, description,
   image and type. Used by:
     - src/seo/Seo.jsx          (browser, updates tags on navigation)
     - functions/_middleware.js (Cloudflare edge, so WhatsApp / Facebook /
                                 Google see the right tags WITHOUT running JS)
     - seo/vite-plugin-seo.js   (sitemap)
   Keep this file free of React and import.meta so it runs everywhere.
   Edit page titles/descriptions in PAGES below.
   ============================================================ */
import { cases } from '../data/cases.js'
import { posts } from '../data/posts.js'
import { stories } from '../data/stories.js'

/** Builds the settings object from env vars (works with import.meta.env and Cloudflare env) */
export const ctxFromEnv = (e = {}) => ({
  name: e.VITE_NAME || 'Your Name',
  brand: e.VITE_BRAND || 'Your Brand',
  tagline: e.VITE_TAGLINE || '',
  companyAbout: e.VITE_COMPANY_ABOUT || '',
  siteUrl: (e.VITE_SITE_URL || '').replace(/\/$/, ''),
  ogImage: e.VITE_OG_IMAGE || '',
  location: e.VITE_LOCATION || '',
  seoTitle: e.VITE_SEO_TITLE || '',
  seoDescription: e.VITE_SEO_DESCRIPTION || '',
})

const clean = (p) => ((p || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/')
export const absUrl = (c, p) => (!p ? '' : /^https?:/i.test(p) ? p : c.siteUrl + (p.startsWith('/') ? p : '/' + p))

/** Static pages. title '' = home page. */
const PAGES = (c) => {
  const where = c.location ? ` in ${c.location}` : ''
  return {
    '/': { title: '', description: c.seoDescription || c.tagline },
    '/about': { title: 'About', description: `About ${c.name}, founder of ${c.brand}${where}: skills, education, experience and personal profile.` },
    '/company': { title: `${c.brand} - Company & Services`, description: c.companyAbout || `${c.brand} builds websites, web apps and mobile apps${where}.` },
    '/work': { title: 'Work & Case Studies', description: `Case studies of websites, web apps and mobile apps built by ${c.brand}${where}.` },
    '/pricing': { title: 'Pricing & Free Quote', description: `Clear starting prices for websites, web apps and mobile apps from ${c.brand}. Request a free quote today.` },
    '/blog': { title: 'Tips & Articles', description: `Practical tips on websites, apps and growing a business online, by ${c.name}.` },
    '/philosophy': { title: 'Philosophy', description: `The beliefs and principles behind every project at ${c.brand}.` },
    '/stories': { title: 'Stories', description: `Stories and lessons from the journey of ${c.name}, founder of ${c.brand}.` },
    '/gallery': { title: 'Gallery', description: `Photos, albums and links to the work of ${c.brand}.` },
    '/contact': { title: 'Contact', description: `Contact ${c.name} of ${c.brand}${where} on WhatsApp, phone, email or social media.` },
    '/terms': { title: 'Terms & Conditions', description: `Terms & Conditions for ${c.brand || 'Codensons'}, covering use of services, intellectual property, liability, privacy and contact.` },
  }
}

const SECTIONS = { work: cases, blog: posts, stories }

/** Returns { path, title, description, image, url, type, kind, item } or null for unknown pages */
export function getRouteMeta(pathname, c) {
  const path = clean(pathname)
  let m = PAGES(c)[path]
  let kind = 'page'
  let item = null
  if (!m) {
    const [, section, slug] = path.split('/')
    const found = slug && SECTIONS[section]?.find((x) => x.slug === slug)
    if (!found) return null
    kind = section === 'blog' ? 'post' : section === 'work' ? 'case' : 'story'
    item = found
    m = { title: found.title, description: found.summary || found.excerpt, image: found.image }
  }
  const title = path === '/' ? (c.seoTitle || `${c.name} | ${c.brand}`) : `${m.title} | ${c.brand}`
  return {
    path, kind, item, title,
    description: m.description || c.tagline,
    image: absUrl(c, m.image || c.ogImage),
    url: c.siteUrl ? c.siteUrl + (path === '/' ? '/' : path) : '',
    type: kind === 'post' ? 'article' : 'website',
  }
}

/** Fallback meta for unknown URLs (404) */
export const notFoundMeta = (c) => ({ path: '', kind: '404', item: null, title: `Page not found | ${c.brand}`, description: c.tagline, image: absUrl(c, c.ogImage), url: '', type: 'website', noindex: true })

/** Every indexable path (used for the sitemap) */
export const allPaths = () => [
  '/', '/about', '/company', '/work', '/pricing', '/blog', '/philosophy', '/stories', '/gallery', '/contact',
  ...cases.map((x) => `/work/${x.slug}`), ...posts.map((x) => `/blog/${x.slug}`), ...stories.map((x) => `/stories/${x.slug}`),
]
