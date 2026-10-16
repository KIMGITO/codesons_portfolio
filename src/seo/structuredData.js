/* JSON-LD structured data (rich results in Google).
   Test it at https://search.google.com/test/rich-results after deploying. */
import { absUrl } from './routes.js'

const crumbName = { work: 'Work', blog: 'Blog', stories: 'Stories', about: 'About', company: 'Company', pricing: 'Pricing', philosophy: 'Philosophy', gallery: 'Gallery', contact: 'Contact' }

export function buildSchemas({ meta, ctx, sameAs = [], phone = '', email = '', faqs = [], logo = '' }) {
  const base = ctx.siteUrl
  const graph = []

  graph.push({ '@type': 'WebSite', '@id': `${base}/#website`, url: base || undefined, name: ctx.brand, inLanguage: 'en' })
  graph.push({
    '@type': ['Organization', 'ProfessionalService'], '@id': `${base}/#org`, name: ctx.brand, url: base || undefined,
    description: ctx.companyAbout || ctx.tagline, logo: logo ? absUrl(ctx, logo) : undefined, image: absUrl(ctx, ctx.ogImage) || undefined,
    telephone: phone || undefined, email: email || undefined, sameAs: sameAs.length ? sameAs : undefined,
    address: ctx.location ? { '@type': 'PostalAddress', addressLocality: ctx.location.split(',')[0].trim(), addressCountry: (ctx.location.split(',')[1] || '').trim() || undefined } : undefined,
    areaServed: ctx.location || undefined, founder: { '@id': `${base}/#person` },
  })
  graph.push({ '@type': 'Person', '@id': `${base}/#person`, name: ctx.name, url: base || undefined, jobTitle: 'Web & Mobile App Developer', worksFor: { '@id': `${base}/#org` }, sameAs: sameAs.length ? sameAs : undefined })

  if (meta.path && meta.path !== '/') {
    const parts = meta.path.split('/').filter(Boolean)
    const items = [{ name: 'Home', url: base + '/' }]
    parts.forEach((p, i) => items.push({ name: i === parts.length - 1 && meta.item ? meta.item.title : crumbName[p] || p, url: base + '/' + parts.slice(0, i + 1).join('/') }))
    graph.push({ '@type': 'BreadcrumbList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.url })) })
  }
  if (meta.kind === 'post') {
    graph.push({ '@type': 'BlogPosting', headline: meta.item.title, description: meta.description, image: meta.image || undefined, datePublished: meta.item.date, dateModified: meta.item.date, mainEntityOfPage: meta.url || undefined, author: { '@id': `${base}/#person` }, publisher: { '@id': `${base}/#org` } })
  }
  if (meta.kind === 'case') {
    graph.push({ '@type': 'CreativeWork', name: meta.item.title, description: meta.description, image: meta.image || undefined, url: meta.url || undefined, creator: { '@id': `${base}/#org` }, keywords: (meta.item.tags || []).join(', ') })
  }
  if ((meta.path === '/pricing' || meta.path === '/contact') && faqs.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
