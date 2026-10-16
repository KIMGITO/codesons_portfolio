import { cfg } from '../config'
import { HERO_GRAD, IMG } from './images'
import { FaLaptopCode, FaMobileScreenButton, FaPaintbrush, FaChartLine, FaHandshake, FaRocket, FaLightbulb, FaFire } from 'react-icons/fa6'

/* ============================================================
   EDIT YOUR LISTS HERE (text content that is too long for .env)
   Images: use a link (https://...) or a file in /public/images
   ============================================================ */

export const slides = [
  { kicker: 'Welcome to Codensons', kicker_sw: 'Karibu Codensons', title: 'Websites & apps that make your brand unforgettable', title_sw: 'Tovuti na programu zinazofanya chapa yako isisahaulike', text: 'Modern design. Smooth animation. Real results.', text_sw: 'Muundo wa kisasa. Uhuishaji laini. Matokeo halisi.', gradient: HERO_GRAD[0], cta: ['View my work', '/work'] },
  { kicker: 'Web & Mobile', kicker_sw: 'Wavuti na Simu', title: 'From idea to launch, end to end', title_sw: 'Kutoka wazo hadi uzinduzi, kila hatua', text: 'React, Capacitor and Supabase, done properly.', text_sw: 'React, Capacitor na Supabase, zikifanywa kwa ustadi.', gradient: HERO_GRAD[1], cta: ['Our services', '/company'] },
  { kicker: "Let's work together", kicker_sw: 'Tufanye kazi pamoja', title: 'Your next project starts with one message', title_sw: 'Mradi wako unaofuata unaanza na ujumbe mmoja', text: 'Fast delivery. Fair pricing. Friendly support.', text_sw: 'Utoaji wa haraka. Bei nzuri. Huduma ya kirafiki.', gradient: HERO_GRAD[2], cta: ['Contact me', '/contact'] },
]

export const services = [
  { Icon: FaLaptopCode, title: 'Web Development', title_sw: 'Uundaji wa Tovuti', text: 'Fast, responsive websites and web apps built with React and modern tooling.', text_sw: 'Tovuti na programu za wavuti za haraka zinazofaa simu, zilizojengwa kwa React.' },
  { Icon: FaMobileScreenButton, title: 'Mobile Apps', title_sw: 'Programu za Simu', text: 'Offline-first Android & iOS apps from a single codebase with Capacitor.', text_sw: 'Programu za Android na iOS zinazofanya kazi bila intaneti, kwa kutumia Capacitor.' },
  { Icon: FaPaintbrush, title: 'UI / UX Design', title_sw: 'Usanifu wa UI / UX', text: 'Clean, memorable interfaces and brand-focused design that convert visitors.', text_sw: 'Muundo safi unaokumbukwa unaobadilisha wageni kuwa wateja.' },
  { Icon: FaChartLine, title: 'Business Systems', title_sw: 'Mifumo ya Biashara', text: 'Dashboards, payment tracking and automation to run your business smarter.', text_sw: 'Dashibodi, ufuatiliaji wa malipo na otomatiki kuendesha biashara yako kwa busara.' },
]

export const process = [
  { Icon: FaLightbulb, title: 'Discover', text: 'We learn your business, goals and customers.' },
  { Icon: FaPaintbrush, title: 'Design', text: 'Wireframes and beautiful interfaces you approve first.' },
  { Icon: FaLaptopCode, title: 'Build', text: 'Clean, tested code delivered in clear milestones.' },
  { Icon: FaRocket, title: 'Launch & Support', text: 'We go live together and keep improving.' },
]

export const skills = ['React', 'Zustand', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Capacitor', 'Supabase', 'Node.js', 'REST APIs', 'Git', 'UI Design', 'Responsive Web']

export const techStack = [
  { name: 'React', iconName: 'SiReact', color: '#61DAFB' },
  { name: 'JavaScript', iconName: 'SiJavascript', color: '#F7DF1E' },
  { name: 'TypeScript', iconName: 'SiTypescript', color: '#3178C6' },
  { name: 'Flutter', iconName: 'SiFlutter', color: '#02569B' },
  { name: 'Dart', iconName: 'SiDart', color: '#0175C2' },
  { name: 'Tailwind CSS', iconName: 'SiTailwindcss', color: '#06B6D4' },
  { name: 'Node.js', iconName: 'SiNodedotjs', color: '#339933' },
  { name: 'Supabase', iconName: 'SiSupabase', color: '#3FCF8E' },
  { name: 'Git', iconName: 'SiGit', color: '#F05032' },
  { name: 'Figma', iconName: 'SiFigma', color: '#F24E1E' },
  { name: 'Firebase', iconName: 'SiFirebase', color: '#FFCA28' },
  { name: 'Capacitor', iconName: 'SiCapacitor', color: '#53B9FF' },
]

export const principles = [
  { Icon: FaHandshake, title: 'People first', text: 'Software exists to serve people. Every decision starts with the person who will use it.' },
  { Icon: FaLightbulb, title: 'Simplicity is power', text: 'The best solution is usually the simplest one that fully solves the problem.' },
  { Icon: FaRocket, title: 'Ship, learn, improve', text: 'Progress beats perfection. Release, listen, and keep getting better.' },
  { Icon: FaFire, title: 'Integrity & craft', text: 'Honest timelines, clean work and pride in the details nobody asks about.' },
]


/* ---------- Pricing packages (prices come from .env) ---------- */
export const packages = [
  {
    key: 'starter', name: 'Starter', name_sw: 'Msingi', price: cfg.prices.starter,
    desc: 'A sharp 1-5 page website to get your business online fast.', desc_sw: 'Tovuti ya kurasa 1-5 kuweka biashara yako mtandaoni haraka.',
    features: ['Up to 5 pages', 'Mobile-friendly design', 'WhatsApp & contact buttons', 'Basic SEO setup', '1 month free support'],
    features_sw: ['Hadi kurasa 5', 'Muundo unaofaa simu', 'Vitufe vya WhatsApp na mawasiliano', 'SEO ya msingi', 'Msaada bure mwezi 1'],
  },
  {
    key: 'business', name: 'Business', name_sw: 'Biashara', price: cfg.prices.business, popular: true,
    desc: 'A complete custom website or web app with animation and your brand.', desc_sw: 'Tovuti au programu kamili ya wavuti yenye uhuishaji na chapa yako.',
    features: ['Custom design & animation', 'Up to 12 pages or app screens', 'Admin / content management', 'SEO, analytics & speed tuning', '3 months free support'],
    features_sw: ['Muundo maalum na uhuishaji', 'Hadi kurasa 12 au skrini za programu', 'Usimamizi wa maudhui', 'SEO, takwimu na kasi', 'Msaada bure miezi 3'],
  },
  {
    key: 'custom', name: 'Custom / Mobile App', name_sw: 'Maalum / Programu ya Simu', price: cfg.prices.custom,
    desc: 'Mobile apps, business systems and anything bigger. Scoped together with you.', desc_sw: 'Programu za simu, mifumo ya biashara na miradi mikubwa. Tunapanga pamoja nawe.',
    features: ['Android & iOS apps', 'Offline-first & cloud sync', 'Payments & user accounts', 'Dashboards & reports', 'Priority support'],
    features_sw: ['Programu za Android na iOS', 'Hufanya kazi bila intaneti', 'Malipo na akaunti za watumiaji', 'Dashibodi na ripoti', 'Msaada wa kipaumbele'],
  },
]

export const faqs = [
  { q: 'How long does a project take?', q_sw: 'Mradi huchukua muda gani?', a: 'A simple website usually takes 1-2 weeks. Larger websites and apps take 4-12 weeks depending on features. I give you a clear timeline before we start.', a_sw: 'Tovuti rahisi huchukua wiki 1-2. Tovuti kubwa na programu huchukua wiki 4-12 kulingana na vipengele. Nakupa ratiba wazi kabla hatujaanza.' },
  { q: 'How does payment work?', q_sw: 'Malipo hufanywaje?', a: 'I usually ask for a deposit to begin, with the balance paid in milestones or on delivery. M-Pesa, bank transfer and other methods are accepted.', a_sw: 'Kwa kawaida naomba malipo ya awali kuanza, na salio hulipwa kwa hatua au wakati wa kukabidhi. M-Pesa, benki na njia nyingine zinakubaliwa.' },
  { q: 'Do you offer support after launch?', q_sw: 'Je, mnatoa msaada baada ya uzinduzi?', a: 'Yes. Every package includes free support for a period after launch, and I offer affordable monthly maintenance plans after that.', a_sw: 'Ndiyo. Kila mpango unajumuisha msaada wa bure kwa kipindi baada ya uzinduzi, na kuna mipango nafuu ya matengenezo ya kila mwezi baadaye.' },
  { q: 'Will my website work well on phones?', q_sw: 'Je, tovuti yangu itafanya kazi vizuri kwenye simu?', a: 'Absolutely. Every project is designed mobile-first and tested on real phones, because most of your customers will visit on mobile.', a_sw: 'Kabisa. Kila mradi umeundwa kwa simu kwanza na kujaribiwa kwenye simu halisi, kwa sababu wateja wengi hutembelea kwa simu.' },
  { q: 'Can you update or fix my existing website or app?', q_sw: 'Je, mnaweza kuboresha au kurekebisha tovuti au programu yangu iliyopo?', a: 'Yes. Send me the link or the code and I will review it and tell you honestly what to fix, improve or rebuild.', a_sw: 'Ndiyo. Nitumie kiungo au msimbo, nitaukagua na kukueleza kwa uaminifu cha kurekebisha, kuboresha au kujenga upya.' },
  { q: 'Who owns the website and the code?', q_sw: 'Nani anamiliki tovuti na msimbo?', a: 'You do. Once the project is paid for, the website, design and code are yours.', a_sw: 'Wewe. Mradi ukishalipiwa, tovuti, muundo na msimbo ni vyako.' },
]

/* Replace with REAL client quotes. Ask clients for 1-2 sentences + permission to publish. */
export const testimonials = [
  { name: 'Client name', role: 'Barbershop owner', text: 'Replace this with a real quote from a happy client. Mention the result: time saved, more customers, better organisation.', avatar: IMG.avatars[0] },
  { name: 'Client name', role: 'Business owner', text: 'Replace this with another real testimonial. Short and specific quotes build the most trust.', avatar: IMG.avatars[1] },
  { name: 'Colleague or partner', role: 'Their job title', text: 'You can also use a quote from a teammate or lecturer about how you work and communicate.', avatar: IMG.avatars[2] },
]
