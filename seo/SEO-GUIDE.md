# SEO Guide for the Codensons Portfolio

SEO = getting found on Google/Bing when someone searches for what you do
(for example "web developer Nairobi", "mobile app developer Kenya").
This guide lists **what is already built in**, then **everything you still need to do**, and **where to submit what**.
Be patient: new sites usually take 2 to 12 weeks to appear, and rankings grow over months. Nobody can promise page 1.

---
## 1. Already built into this project

| Feature | Where |
|---|---|
| Unique title + description + canonical link + share tags for **every** page, blog post, case study and story | `src/seo/routes.js` (edit titles/descriptions here), `src/seo/Seo.jsx` |
| Home page title/description (the text Google shows) | `.env` > `VITE_SEO_TITLE`, `VITE_SEO_DESCRIPTION` |
| Structured data (JSON-LD): Organization, Person, WebSite, Breadcrumbs, FAQ, Blog articles, Case studies | `src/seo/structuredData.js` |
| `sitemap.xml` and `robots.txt` created automatically on every build | `seo/vite-plugin-seo.js` (needs `VITE_SITE_URL`) |
| Correct link previews (WhatsApp, Facebook, LinkedIn) and a real **404 status** for wrong URLs | `functions/_middleware.js` (Cloudflare edge) |
| Share image for links | `public/images/og/og-image.jpg` (replace with your design, 1200x630) |
| Fast loading: lazy images, long caching, compression, mobile-first design | `public/_headers`, `ImageBox` |
| `<noscript>` text fallback for crawlers without JavaScript | `index.html` |
| Readable page structure (one H1 per page, headings, descriptive links) | all pages |
| Installable app (PWA) | `public/manifest.webmanifest` |

---
## 2. Before you launch (checklist)

- [ ] Buy your domain (e.g. `codensons.com`) and host on Cloudflare Pages (`docs/CLOUDFLARE.md`).
- [ ] Set `VITE_SITE_URL="https://your-real-domain.com"` (no trailing slash). Redeploy.
- [ ] Write your **real** `VITE_SEO_TITLE` (max about 60 characters) and `VITE_SEO_DESCRIPTION` (max about 155 characters). Put your main keyword and city in both.
- [ ] Replace **every placeholder**: photos, OG image, CV, testimonials, case-study results, stories, certificates, prices (`docs/ASSETS.md`). Google ranks real, helpful content, not templates.
- [ ] Set real phone, WhatsApp, email and social handles in `.env` (they also feed the structured data).
- [ ] Open `https://your-domain.com/sitemap.xml` and `/robots.txt`: both must load.
- [ ] Test on your phone (most Kenyan visitors use mobile).
- [ ] Remove the sample blog posts you don't agree with; keep only content you stand behind.

---
## 3. Submit and verify (do these in the first week)

| # | Where | What to do | Why |
|---|---|---|---|
| 1 | **Google Search Console** (search.google.com/search-console) | Add property > choose **Domain**. Verify by adding the DNS TXT record in Cloudflare (DNS > Records). Then **Sitemaps** > submit `sitemap.xml`. Then **URL Inspection**: paste your home page, `/pricing`, `/work`, `/contact` and click **Request indexing**. | Puts you in Google and shows errors and search terms. |
| 2 | **Bing Webmaster Tools** (bing.com/webmasters) | Sign in, **Import from Google Search Console** (one click), submit the sitemap. | Covers Bing, Yahoo, DuckDuckGo and Ecosia. |
| 3 | **IndexNow / Crawler Hints** | In Cloudflare: Caching > Configuration > **Crawler Hints: On**. | Notifies Bing/Yandex automatically when you change pages. |
| 4 | **Google Business Profile** (business.google.com) | Create a profile for Codensons. Category: *Web designer* or *Software company*. Choose **service-area business** (hide your address if you work from home) and add Nairobi. Add services, photos, logo, website link and phone. Verify (video or phone). Ask happy clients for Google reviews. | Biggest win for local searches ("web developer near me"), appears on Google Maps. |
| 5 | **Bing Places** (bingplaces.com) | Import from your Google Business Profile. | Same, for Bing. |
| 6 | **Social profiles** | Create/finish: Facebook Page, Instagram, LinkedIn (personal + Company Page), X, TikTok/YouTube if you use them, **WhatsApp Business** (add website + catalog). Put your website link in every bio. Use the **same name, phone and description** everywhere. | Builds trust; these profiles are also listed in your structured data (`sameAs`). |
| 7 | **GitHub** | Profile README with your website link; pin your best repos and link each to its case study. | A strong backlink for developers. |

### Test your link previews
* **Facebook Sharing Debugger**: developers.facebook.com/tools/debug (paste a URL, click "Scrape Again").
* **LinkedIn Post Inspector**: linkedin.com/post-inspector
* **WhatsApp** has no tool. If a preview is stale, add `?v=2` to the link when sharing.
* **X (Twitter)** has no public validator now. Post the link in a draft to see the card.

### Test quality
* **Rich Results Test**: search.google.com/test/rich-results (confirms FAQ / breadcrumb data)
* **Schema Markup Validator**: validator.schema.org
* **PageSpeed Insights**: pagespeed.web.dev (aim for green scores on mobile; compress big images first)
* **Lighthouse** (Chrome DevTools > Lighthouse) for SEO, accessibility and performance.

---
## 4. Get listed and linked (off-page SEO)

Links from other trusted websites are one of the strongest ranking signals. Do a few each month:

* **Freelance / agency profiles** (always link to your site): Upwork, Fiverr, Freelancer, **Clutch**, **GoodFirms**, LinkedIn Services.
* **Developer / design communities:** Dev.to, Hashnode, Medium (cross-post your articles and set the *canonical URL* to your own site), Behance/Dribbble for design work.
* **Launch your apps:** Product Hunt, Kenyan tech communities, Nairobi developer meetups and Facebook/LinkedIn groups (be helpful, don't spam).
* **Local directories:** reputable Kenyan business directories and chamber/association member pages. Keep your name, phone and website identical everywhere.
* **Clients:** ask every client to link to you from their website ("Website by Codensons") and to leave a Google review.
* **Guest posts / interviews** on local tech or business blogs.
* Avoid buying links or "SEO packages with 1000 backlinks": it can get you penalised.

---
## 5. Content plan (what Google rewards)

1. **One clear page per service and city.** Example: add pages like "Website design in Nairobi", "Mobile app developer in Kenya". Add them to `PAGES` in `src/seo/routes.js` and create the page (ask me and I'll add them).
2. **Publish helpful articles regularly** (2 per month is great): answer real customer questions
   ("How much does a website cost in Kenya?", "M-Pesa payments on my website", "Do I need an app or a website?"). Edit `src/data/posts.js`, then redeploy. The sitemap updates itself.
3. **Case studies with numbers.** Fill in the *result* for each project (time saved, users, sales). Add screenshots.
4. **Real testimonials with names and photos** (with permission).
5. **Link between your pages**: from blog posts to Pricing/Contact, from case studies to services.
6. **Keep contact info consistent** (name, phone, area) on the site, Google Business Profile and socials.
7. Use `seo/KEYWORDS.md` to plan which page targets which search phrase.

Writing tips: use the keyword naturally in the title, first paragraph and one heading. Write for people first. Never copy text from other sites.

---
## 6. Honest limitations (and upgrades if you need them)

* **It is a single-page React app.** Google can index it, but pages that rely on JavaScript are sometimes indexed more slowly than plain HTML. The edge function fixes titles, descriptions, canonical links and share cards in the raw HTML, but the page body is still drawn by JavaScript.
  If SEO becomes your main source of customers, upgrade to **pre-rendered pages** (e.g. `vite-react-ssg`) or move to **Astro / Next.js**. The content files in `src/data/` can be reused.
* **Language toggle (EN / SW)** changes text in the browser on the same URL, so Google indexes the English text only. For Swahili search traffic, create separate Swahili pages (e.g. `/sw/...`) later.
* **Sitemap is built at build time** from `src/data/*.js`. After adding a post, case study or story, redeploy.
* **The edge function needs the `VITE_...` variables inside Cloudflare** (dashboard > Variables and secrets). Without them previews fall back to default texts.
* **Images from Google Photos / Drive links** can't be displayed (see `docs/ASSETS.md`).

---
## 7. Routine to follow

**Weekly (10 min):** reply to enquiries fast, post on social with your link, check Search Console for errors.
**Monthly (1 to 2 hours):** publish 1 to 2 articles, add a finished project as a case study, ask for a review, get 1 to 2 new profile links, run PageSpeed on the home page and fix issues, check which search terms bring visitors (Search Console > Performance) and improve those pages.
**Quarterly:** refresh old articles and prices, update the OG image and testimonials, review `seo/KEYWORDS.md`.

### Suggested first 90 days
* **Days 1-7:** launch, domain, Search Console + Bing, Google Business Profile, social profiles, request indexing.
* **Days 8-30:** replace all placeholders, add 3 real case studies and 5 testimonials, publish 2 articles, create Upwork/LinkedIn/Clutch profiles.
* **Days 31-90:** 2 articles per month, collect Google reviews, add city/service pages, get 5 to 10 quality links, review Search Console data and improve the pages that nearly rank.

---
## 8. Where to change things

| I want to change... | File |
|---|---|
| Home title & description | `.env` (`VITE_SEO_TITLE`, `VITE_SEO_DESCRIPTION`) |
| Other page titles & descriptions | `src/seo/routes.js` (`PAGES`) |
| Blog article / case study / story SEO text | `src/data/posts.js`, `cases.js`, `stories.js` (`title`, `excerpt`/`summary`) |
| Structured data (business type, address, FAQ) | `src/seo/structuredData.js`, FAQ in `src/data/content.js` |
| Sitemap / robots rules | `seo/vite-plugin-seo.js` |
| Social share card image | `public/images/og/og-image.jpg` |
| Edge SEO function | `functions/_middleware.js` |
| Keyword planning | `seo/KEYWORDS.md` |
