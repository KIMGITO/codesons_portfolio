/* Build plugin: generates sitemap.xml and robots.txt into /dist
   from VITE_SITE_URL and the pages/slugs listed in src/seo/routes.js */
import { loadEnv } from 'vite'
import { allPaths } from '../src/seo/routes.js'

export default function seoFiles(mode) {
  return {
    name: 'codensons-seo-files',
    apply: 'build',
    generateBundle() {
      const env = loadEnv(mode, process.cwd(), '')
      const base = (env.VITE_SITE_URL || '').replace(/\/$/, '')
      const day = new Date().toISOString().slice(0, 10)

      if (!base || base.includes('your-domain.com')) {
        this.warn('SEO: set VITE_SITE_URL to your real address so sitemap.xml can be created.')
      } else {
        const priority = (p) => (p === '/' ? '1.0' : p.split('/').length > 2 ? '0.6' : ['/work', '/pricing', '/contact', '/about'].includes(p) ? '0.9' : '0.7')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths().map((p) => `  <url>\n    <loc>${base}${p === '/' ? '/' : p}</loc>\n    <lastmod>${day}</lastmod>\n    <priority>${priority(p)}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      }
      const robots = `User-agent: *\nAllow: /\n${base && !base.includes('your-domain.com') ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}
