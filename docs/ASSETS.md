# Pictures and documents: where everything goes

All images live in `public/images/` and documents in `public/documents/`.
Every spot already has a **placeholder** file. To use your real file:

> **Save your file with the SAME NAME and SAME FOLDER, replacing the placeholder.**
> No code or `.env` change needed. (Use `.jpg`. If you use another extension, update the path in `.env` / `src/data/`.)

Rules: lowercase names, no spaces (use dashes), JPG or WebP, **under 300 KB each**
(compress at squoosh.app or tinypng.com), real photos not screenshots of photos.

## Pictures
| File (replace me) | Size | Shown on | Set in |
|---|---|---|---|
| `images/profile/profile.jpg` | 800x1000 (portrait) | About page photo | `.env` VITE_PROFILE_IMAGE |
| `images/hero/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` | 1920x1080 (landscape) | Home carousel backgrounds (add more in `.env`) | `.env` VITE_HERO_IMAGES |
| `images/projects/<project>.jpg` | 1200x800 | Project cover (Work page, case study, Home) | `src/data/cases.js` `image` |
| `images/projects/<project>-1.jpg`, `-2.jpg` | 1200x800 | Case study screenshots (add as many as you like) | `src/data/cases.js` `screenshots` |
| `images/stories/story-1.jpg` ... | 1200x800 | Story cards and story pages | `src/data/stories.js` |
| `images/blog/blog-1.jpg` ... | 1200x800 | Blog cards and articles | `src/data/posts.js` |
| `images/avatars/avatar-1.jpg` ... | 300x300 (square) | Testimonial photos (ask clients permission) | `src/data/content.js` testimonials |
| `images/gallery/gallery-1.jpg` ... `-6.jpg` | width 1000, any height | Gallery page grid + lightbox | `.env` VITE_GALLERY_IMAGES |
| `images/clients/client-1.png` ... | about 480x140, transparent PNG | "Trusted by" logo strip | `.env` VITE_CLIENTS |
| `images/certificates/certificate-1.jpg` ... | 1200x850 | Certificates & awards on About | `.env` VITE_CERTIFICATES |
| `images/og/og-image.jpg` | **1200x630** | Picture shown when your link is shared (WhatsApp, Facebook, LinkedIn, Google) | `.env` VITE_OG_IMAGE |
| `icon-192.png`, `icon-512.png` (in `public/`) | 192x192 and 512x512 | Phone home-screen icon | `public/manifest.webmanifest` |
| `favicon.svg` (in `public/`) | any | Browser tab icon | `index.html` |

### Adding more
* **More gallery photos:** put `gallery-7.jpg` in the folder, then add `,/images/gallery/gallery-7.jpg` to `VITE_GALLERY_IMAGES`.
* **A new project:** copy a block in `src/data/cases.js`, give it a unique `slug`, and add `images/projects/<slug>.jpg`.
* **More hero slides:** add the image to `VITE_HERO_IMAGES`; add a slide text in `src/data/content.js` (`slides`).

### Pictures from Google Photos / Drive / Facebook
A Google Photos or Drive **share link is a web page, not a picture file**, so it cannot be used as an image source.
Use those links in the Gallery **links** section (`VITE_GALLERY_LINKS`) so visitors can open the album.
For pictures shown on the site, download them and put them in `public/images/`.
(Images from other websites can also be used with a full `https://...jpg` link, but they can break or be removed, so prefer your own files.)

## Documents
| File (replace me) | Used for | Set in |
|---|---|---|
| `documents/Dennis-Kimanthi-CV.pdf` | "Download CV" buttons (About page + footer) | `.env` VITE_CV_URL |
| `documents/Codensons-Company-Profile.pdf` | Optional company brochure / price list. Link to it from a page or WhatsApp | any link: `/documents/Codensons-Company-Profile.pdf` |

Add any other PDF (price list, terms, brochure) to `public/documents/` and link it as `/documents/your-file.pdf`.
Keep PDFs under 2 MB and give them clear names (Google reads file names).

## Accessibility and SEO for images
* Use descriptive file names (`barbershop-manager-dashboard.jpg`, not `IMG_2034.jpg`): they help Google Images.
* Project, case-study, story and blog images automatically use their title as alt text. Gallery photos use "Gallery N": rename the files descriptively or tell me and I will add captions.
