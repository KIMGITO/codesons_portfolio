# Hosting on Cloudflare Pages (free)

Cloudflare Pages hosts the built site for free, gives you HTTPS, a global CDN, and runs the small
SEO function in `functions/_middleware.js` (fixes link previews and 404 status for crawlers).

Files already prepared for you: `wrangler.toml`, `public/_headers` (security + caching),
`functions/_middleware.js`, `.nvmrc` (Node 20), `.dev.vars.example`.

---
## Option A: connect GitHub (recommended, auto-deploys on every push)

1. Put the project on GitHub (private repo is fine). `.env` is ignored by git on purpose.
2. Cloudflare dashboard > **Workers & Pages** > **Create** > **Pages** > **Connect to Git** > pick the repo.
3. Build settings:
   * Framework preset: **React (Vite)** (or None)
   * Build command: `npm run build`
   * Build output directory: `dist`
   * Root directory: leave empty
4. **Environment variables** (very important, because `.env` is not in git):
   open `.env.example`, and add **every `VITE_...` line** as a variable under
   *Settings > Variables and secrets* (Production, and Preview if you like).
   * Paste the value WITHOUT the surrounding quotes.
   * Also add `NODE_VERSION` = `20`.
   * These variables are used at build time (baked into the site) AND by the edge function (SEO tags).
5. **Save and Deploy**. You get a free address like `codensons-portfolio.pages.dev`.
6. After editing any variable: **Deployments > ... > Retry deployment** (or push a commit) to rebuild.

## Option B: upload from your computer (no GitHub)

```bash
npm install
npx wrangler login          # opens the browser once
npm run cf:deploy           # builds and uploads ./dist
```
The first run asks to create the project. Then add the `VITE_...` variables in the dashboard
(Settings > Variables and secrets) so the edge function can read them. The site itself uses your local `.env` at build time.

## Test locally like Cloudflare
```bash
cp .dev.vars.example .dev.vars   # fill in
npm run cf:preview               # http://localhost:8788
```

---
## Connect your own domain (e.g. codensons.com)

1. Pages project > **Custom domains** > **Set up a custom domain** > enter `codensons.com`.
2. If the domain's DNS is on Cloudflare it connects automatically. If you bought it elsewhere,
   add the domain to Cloudflare (free plan) and change the nameservers at your registrar to the two Cloudflare gives you.
3. Also add `www.codensons.com`, then create a redirect: **Rules > Redirect Rules**: `www` to the main domain (301).
4. Set `VITE_SITE_URL="https://codensons.com"` (no trailing slash) in the dashboard variables and redeploy.
   This feeds the sitemap, canonical links and share cards.
5. Create email (`hello@codensons.com`): Cloudflare **Email Routing** (free) forwards it to your Gmail,
   or use Zoho Mail's free plan to send and receive. Set `VITE_EMAIL`.

## Recommended Cloudflare settings (domain dashboard)
* **SSL/TLS** > mode **Full (strict)**; turn on **Always Use HTTPS**.
* **Speed > Optimization**: keep **Brotli** on. **Turn Rocket Loader OFF** (it can break React apps).
* **Caching > Configuration > Crawler Hints: ON** (tells Bing/Yandex when your site changes, via IndexNow).
* **Analytics & Logs > Web Analytics**: free, privacy-friendly stats (alternative to Plausible).
* **Scrape Shield > Email Address Obfuscation**: leave on unless an email link ever looks broken.

## Troubleshooting
| Problem | Fix |
|---|---|
| Blank page / default texts | `VITE_...` variables missing in the dashboard. Add them and redeploy. |
| Page not found when refreshing `/about` | Make sure there is no `404.html` in `public/` (Pages then treats the site as a single-page app automatically). |
| Wrong link preview on WhatsApp/Facebook | Check `VITE_SITE_URL`, `VITE_OG_IMAGE`, and that `functions/` is in the repo root. Then re-scrape with the Facebook Sharing Debugger (see `seo/SEO-GUIDE.md`). |
| Changed an image but the old one shows | Images are cached 24h (`public/_headers`). Rename the file or hard refresh. |
| Changed `.env` but site is unchanged | Redeploy: values are baked in at build time. |
| Free plan limits | 500 builds/month; Functions 100,000 requests/day, plenty for a portfolio. |
