# Codensons Portfolio (Vite + React)

React 18 · Vite · Tailwind CSS · Zustand · Framer Motion · React Router · React Icons

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist (also creates sitemap.xml + robots.txt)
npm run preview    # test the production build
npm run cf:preview # test with Cloudflare Pages Functions (needs .dev.vars)
npm run cf:deploy  # upload straight to Cloudflare Pages
```
Needs Node 18+.

## Pages
`/` Home · `/about` · `/company` · `/work` and `/work/:slug` (case studies) · `/pricing` (packages, quote form, FAQ)
· `/blog` and `/blog/:slug` · `/philosophy` · `/stories` and `/stories/:slug` · `/gallery` · `/contact`

Also on every page: floating WhatsApp button, English / Kiswahili toggle, theme switcher, availability badge.

## Guides (read these)
| File | What it covers |
|---|---|
| `docs/CLOUDFLARE.md` | Host on Cloudflare Pages (GitHub or direct upload), custom domain, email, settings, troubleshooting |
| `docs/ASSETS.md` | Every picture/document slot, sizes, and how to replace the placeholders |
| `seo/SEO-GUIDE.md` | What SEO is built in, launch checklist, **where to submit what**, off-page and content plan |
| `seo/KEYWORDS.md` | Keyword planning template |

Project map for SEO: `src/seo/` (page meta, structured data), `seo/` (sitemap plugin + guides), `functions/` (Cloudflare edge SEO).
Pictures: `public/images/...` and documents: `public/documents/...` already contain **placeholders**: replace them keeping the same names.

## 1. Everything personal lives in `.env`
`.env` is already created from `.env.example`. Edit it, then restart `npm run dev`.
Lists use commas; fields inside an item use `|`; education/certificates/clients items are separated by `;`.
Images: a full `https://` link, or put the file in `public/images/` and use `/images/yourfile.jpg`.

| Setting | What it does |
|---|---|
| `VITE_NAME`, `VITE_BRAND`, `VITE_TAGLINE`, `VITE_ABOUT` ... | Identity and About page |
| `VITE_AGE`, `VITE_LOCATION`, `VITE_EDUCATION` | Personal profile + education timeline |
| `VITE_EMAIL`, `VITE_PHONE`, `VITE_WHATSAPP`, `VITE_INSTAGRAM` ... | Contact cards, footer icons, floating WhatsApp (blank = hidden) |
| `VITE_PRICE_STARTER`, `VITE_PRICE_BUSINESS`, `VITE_CURRENCY` | Pricing page (the numbers are samples: set your real ones) |
| `VITE_CERTIFICATES`, `VITE_CLIENTS` | Certificates/awards and the "Trusted by" strip (client logo link optional) |
| `VITE_AVAILABILITY_STATUS` / `_TEXT` | Green "available" or amber "busy" badge |
| `VITE_FORM_ENDPOINT` | Saves quote-form messages (see below) |
| `VITE_BOOKING_URL` | Cal.com / Calendly link: adds "Book a free call" buttons |
| `VITE_CV_URL` | Adds "Download CV" buttons (put the PDF in `public/`, e.g. `/Dennis-Kimanthi-CV.pdf`) |
| `VITE_PLAUSIBLE_DOMAIN` | Turns on Plausible analytics |
| `VITE_SITE_URL`, `VITE_OG_IMAGE` | Sitemap, canonical links and the picture shown when your link is shared |
| `VITE_SEO_TITLE`, `VITE_SEO_DESCRIPTION` | Home page title and description shown on Google |
| `VITE_HERO_IMAGES`, `VITE_HERO_ADVERT_IMG`, `VITE_GALLERY_IMAGES`, `VITE_PROFILE_IMAGE` | Images. `heroAdvertImg` is the right-side "advert" image in the hero. |
| `VITE_GALLERY_LINKS` | Google Photos / Drive / YouTube links |
| `VITE_DEFAULT_LANG`, `VITE_DEFAULT_THEME` | `en`/`sw`, `midnight`/`light`/`sunset` |

## 2. Longer content: files in `src/data/`
| File | Content |
|---|---|
| `cases.js` | Projects as **case studies** (problem, solution, result, screenshots, demo link) |
| `content.js` | Hero slides, services, process, principles, **pricing features, FAQ, testimonials** |
| `stories.js` | Your personal stories |
| `posts.js` | Blog / tips articles (3 useful starters included) |

**Replace the placeholders:** testimonials, case-study results, stories, certificates, clients and prices are samples.
Do not publish made-up testimonials or client names; use real ones (with permission).

Swahili: buttons, menus, forms, pricing labels, services, hero slides, packages and FAQ are translated.
For any other text add a `_sw` version of a field (e.g. `title_sw`) and it is used automatically in Swahili.

## 3. Setting up the tools
* **Quote form that saves messages:** create a free form at formspree.io, copy its URL into `VITE_FORM_ENDPOINT`.
  Messages arrive in your email. Without it, visitors still use the WhatsApp / email buttons.
* **Booking:** create a free event on cal.com or calendly.com and paste its link in `VITE_BOOKING_URL`.
* **Analytics:** sign up at plausible.io (or self-host), add your domain to `VITE_PLAUSIBLE_DOMAIN`.
* **Custom domain + email:** buy a domain (e.g. codensons.com), point it at your host (Vercel/Netlify show how),
  then set `VITE_SITE_URL` and `VITE_EMAIL` (e.g. hello@codensons.com; Zoho Mail offers a free plan).
* **Search engines:** after deploying, submit `https://your-domain/sitemap.xml` in Google Search Console.
* **PWA:** the site can be installed on phones ("Add to Home Screen") and shows its last visit offline.
  Replace `public/icon-192.png` and `public/icon-512.png` with your own logo.
* **Fast images:** compress photos before adding them (squoosh.app or tinypng.com), aim for under 300 KB each.
  Images already lazy-load.

## Theming
Colours are central tokens in `src/index.css`. Add a theme by adding a `[data-theme='name']` block
and its name in `THEMES` (`src/store/useStore.js`).

## Deploy
* **Cloudflare Pages (recommended):** see `docs/CLOUDFLARE.md`. `wrangler.toml`, `public/_headers` and `functions/` are ready.
* **Vercel / Netlify:** build `npm run build`, output `dist`. `vercel.json` and `netlify.toml` make direct links work (the Cloudflare SEO function only runs on Cloudflare).
  Add every `VITE_...` value in the host's Environment Variables screen, then redeploy after changes.
* Any static host: upload `dist` and route all paths to `index.html`.

## Notes
* `VITE_` values are public in the built site. Never put passwords or secret keys in `.env`.
* The Gallery "Quick add" links are saved in the visitor's own browser only; use `VITE_GALLERY_LINKS` for permanent ones.
# codesons_portfolio
