import { FaWhatsapp, FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn, FaGithub, FaTiktok, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa6'

import { IMG } from './data/images'

const e = import.meta.env
const GRADIENT = 'linear-gradient(135deg, rgb(var(--a1)), rgb(var(--ge)))'
const list = (v, sep = ',') => (v || '').split(sep).map((s) => s.trim()).filter(Boolean)
const handle = (base, v) => (!v ? null : /^https?:\/\//i.test(v) ? v : base + v.replace(/^@/, ''))

const wa = (e.VITE_WHATSAPP || '').replace(/\D/g, '')
const phone = e.VITE_PHONE || ''

export const cfg = {
  name: e.VITE_NAME || 'Your Name',
  brand: e.VITE_BRAND || 'Your Brand',
  tagline: e.VITE_TAGLINE || '',
  roles: list(e.VITE_ROLES),
  siteUrl: e.VITE_SITE_URL || '',
  defaultTheme: ['midnight', 'light', 'sunset'].includes(e.VITE_DEFAULT_THEME) ? e.VITE_DEFAULT_THEME : 'midnight',
  about: e.VITE_ABOUT || '',
  profile: [
    ['Full name', e.VITE_NAME],
    ['Age', e.VITE_AGE && e.VITE_AGE !== 'XX' ? `${e.VITE_AGE} years` : e.VITE_AGE],
    ['Location', e.VITE_LOCATION],
    ['Company', e.VITE_BRAND],
    ['Languages', e.VITE_LANGUAGES],
    ['Status', e.VITE_STATUS],
  ].filter(([, v]) => v),
  education: list(e.VITE_EDUCATION, ';').map((x) => x.split('|').map((s) => s.trim())),
  companyAbout: e.VITE_COMPANY_ABOUT || '',
  mission: e.VITE_MISSION || '',
  vision: e.VITE_VISION || '',
  founded: e.VITE_FOUNDED || '',
  stats: [
    { n: Number(e.VITE_STAT_PROJECTS || 0), label: 'Projects delivered', suffix: '+' },
    { n: Number(e.VITE_STAT_CLIENTS || 0), label: 'Happy clients', suffix: '+' },
    { n: Number(e.VITE_STAT_YEARS || 0), label: 'Years building', suffix: '' },
  ],
  quote: e.VITE_PHILOSOPHY_QUOTE || '',
  profileImage: e.VITE_PROFILE_IMAGE || IMG.profile,
  philosophyImage: e.VITE_PHILOSOPHY_IMAGE || IMG.philosophy,
  heroImages: list(e.VITE_HERO_IMAGES).length ? list(e.VITE_HERO_IMAGES) : IMG.hero,
  heroAdvertImg: e.VITE_HERO_ADVERT_IMG || IMG.advert,
  galleryImages: list(e.VITE_GALLERY_IMAGES),
  galleryLinks: list(e.VITE_GALLERY_LINKS).map((x) => {
    const [title, ...rest] = x.split('|')
    const url = rest.join('|').trim()
    return { title: title.trim(), url, host: (() => { try { return new URL(url).hostname } catch { return url } })() }
  }).filter((l) => l.url),
  email: e.VITE_EMAIL || '',
  phone,
  whatsapp: wa,
}

// Contact / social buttons — a button only appears when you set its value in .env
export const socials = [
  wa && { name: 'WhatsApp', value: '+' + wa, href: `https://wa.me/${wa}`, Icon: FaWhatsapp, g: GRADIENT },
  phone && { name: 'Call me', value: phone, href: `tel:${phone.replace(/\s/g, '')}`, Icon: FaPhone, g: GRADIENT },
  e.VITE_INSTAGRAM && { name: 'Instagram', value: '@' + e.VITE_INSTAGRAM.replace(/^@|https?:\/\/(www\.)?instagram\.com\//g, ''), href: handle('https://instagram.com/', e.VITE_INSTAGRAM), Icon: FaInstagram, g: GRADIENT },
  e.VITE_FACEBOOK && { name: 'Facebook', value: e.VITE_FACEBOOK.replace(/https?:\/\/(www\.)?facebook\.com\//, ''), href: handle('https://facebook.com/', e.VITE_FACEBOOK), Icon: FaFacebookF, g: GRADIENT },
  e.VITE_TWITTER && { name: 'Twitter / X', value: '@' + e.VITE_TWITTER.replace(/^@|https?:\/\/(www\.)?(x|twitter)\.com\//g, ''), href: handle('https://x.com/', e.VITE_TWITTER), Icon: FaXTwitter, g: GRADIENT },
  e.VITE_LINKEDIN && { name: 'LinkedIn', value: 'Connect with me', href: handle('https://linkedin.com/in/', e.VITE_LINKEDIN), Icon: FaLinkedinIn, g: GRADIENT },
  e.VITE_GITHUB && { name: 'GitHub', value: '@' + e.VITE_GITHUB.replace(/^@|https?:\/\/github\.com\//g, ''), href: handle('https://github.com/', e.VITE_GITHUB), Icon: FaGithub, g: GRADIENT },
  e.VITE_TIKTOK && { name: 'TikTok', value: '@' + e.VITE_TIKTOK.replace(/^@|https?:\/\/(www\.)?tiktok\.com\/@?/g, ''), href: handle('https://tiktok.com/@', e.VITE_TIKTOK), Icon: FaTiktok, g: GRADIENT },
  e.VITE_YOUTUBE && { name: 'YouTube', value: 'Watch my videos', href: handle('https://youtube.com/@', e.VITE_YOUTUBE), Icon: FaYoutube, g: GRADIENT },
  e.VITE_EMAIL && { name: 'Email', value: e.VITE_EMAIL, href: `mailto:${e.VITE_EMAIL}`, Icon: FaEnvelope, g: GRADIENT },
].filter(Boolean)

// ---------- extras ----------
Object.assign(cfg, {
  currency: e.VITE_CURRENCY || 'KES',
  prices: { starter: e.VITE_PRICE_STARTER || '', business: e.VITE_PRICE_BUSINESS || '', custom: e.VITE_PRICE_CUSTOM || "Let's talk" },
  certificates: list(e.VITE_CERTIFICATES, ';').map((x) => { const [title, issuer, year, image] = x.split('|').map((s) => s.trim()); return { title, issuer, year, image: image || IMG.certificate } }).filter((c) => c.title),
  clients: list(e.VITE_CLIENTS, ';').map((x) => { const [name, logo] = x.split('|').map((s) => s.trim()); return { name, logo } }).filter((c) => c.name),
  availability: { status: e.VITE_AVAILABILITY_STATUS === 'busy' ? 'busy' : 'open', text: e.VITE_AVAILABILITY_TEXT || '' },
  formEndpoint: e.VITE_FORM_ENDPOINT || '',
  bookingUrl: e.VITE_BOOKING_URL || '',
  cvUrl: e.VITE_CV_URL || '',
  plausibleDomain: e.VITE_PLAUSIBLE_DOMAIN || '',
  ogImage: e.VITE_OG_IMAGE || IMG.og,
  defaultLang: e.VITE_DEFAULT_LANG === 'sw' ? 'sw' : 'en',
  waMessage: e.VITE_WHATSAPP_MESSAGE || '',
})
