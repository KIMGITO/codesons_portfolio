/* ============================================================
   Cloudflare Pages Function (runs at the edge on every page request).

   WHY: this site is a single-page React app. Google runs JavaScript, but
   WhatsApp, Facebook, LinkedIn, X and many other crawlers do NOT. This function
   rewrites <title>, description and share tags in the HTML for each URL
   (e.g. /blog/some-article) so link previews and search results are correct.
   Unknown URLs are served with a real 404 status (no "soft 404" for Google).

   It needs the same VITE_* variables in Cloudflare:
   Pages project > Settings > Variables and secrets (add them for Production).
   If anything fails it quietly serves the normal page.
   ============================================================ */
import { ctxFromEnv, getRouteMeta, notFoundMeta } from '../src/seo/routes.js'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const setAttr = (name, value) => ({ element(el) { el.setAttribute('content', value) } })

export async function onRequest({ request, env, next }) {
  const res = await next()
  try {
    const url = new URL(request.url)
    if (request.method !== 'GET' || !(res.headers.get('content-type') || '').includes('text/html')) return res

    const ctx = ctxFromEnv(env)
    if (!ctx.siteUrl) ctx.siteUrl = url.origin
    const found = getRouteMeta(url.pathname, ctx)
    const meta = found || notFoundMeta(ctx)

    const rewriter = new HTMLRewriter()
      .on('title', { element(el) { el.setInnerContent(meta.title) } })
      .on('meta[name="description"]', setAttr('description', meta.description))
      .on('meta[property="og:title"]', setAttr('og:title', meta.title))
      .on('meta[property="og:description"]', setAttr('og:description', meta.description))
      .on('meta[property="og:image"]', setAttr('og:image', meta.image))
      .on('meta[name="robots"]', setAttr('robots', meta.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'))
      .on('head', {
        element(el) {
          el.append(
            `<meta property="og:type" content="${esc(meta.type)}">` +
              `<meta property="og:site_name" content="${esc(ctx.brand)}">` +
              `<meta name="twitter:title" content="${esc(meta.title)}">` +
              `<meta name="twitter:description" content="${esc(meta.description)}">` +
              (meta.image ? `<meta name="twitter:image" content="${esc(meta.image)}">` : '') +
              (found ? `<meta property="og:url" content="${esc(meta.url)}"><link rel="canonical" href="${esc(meta.url)}">` : ''),
            { html: true },
          )
        },
      })

    const out = rewriter.transform(res)
    return found ? out : new Response(out.body, { status: 404, headers: out.headers })
  } catch {
    return res
  }
}
