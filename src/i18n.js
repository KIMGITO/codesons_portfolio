import { useStore } from './store/useStore'

/** UI text in English (en) and Kiswahili (sw). Add more keys as needed. */
export const dict = {
  en: {
    home: 'Home', about: 'About', company: 'Company', work: 'Work', pricing: 'Pricing', blog: 'Blog', philosophy: 'Philosophy', stories: 'Stories', gallery: 'Gallery', contact: 'Contact', more: 'More',
    startProject: 'Start a project', seeAll: 'See all work', aboutBtn: 'About', getQuote: 'Get a quote', bookCall: 'Book a free call', downloadCv: 'Download CV',
    whatsapp: 'Send on WhatsApp', email: 'Send by email', readMore: 'Read more', readStory: 'Read story', readPost: 'Read article', nextStory: 'Next story', allStories: 'All stories',
    visit: 'Visit project', liveDemo: 'Live demo', viewCase: 'View case study', allWork: 'All work', nextCase: 'Next project', allPosts: 'All articles', nextPost: 'Next article',
    ctaTitle: 'Ready to grow your business online?', ctaText: 'Let us build something your customers will love.',
    explore: 'Explore', findMe: 'Find me online', chatNow: 'Chat on WhatsApp',
    fName: 'Your name', fContact: 'Phone or email', fService: 'Service needed', fBudget: 'Budget', fDeadline: 'Timeline', fMessage: 'Tell me about your project...',
    selectOne: 'Select one', send: 'Send request', sending: 'Sending...', sent: 'Thank you! Your request was received. I will reply soon.', sendError: 'Could not send. Please use WhatsApp or email instead.',
    quoteTitle: 'Request a free quote', quoteSub: 'Tell me what you need. I reply fast, usually within a day.',
    asap: 'As soon as possible', m1: 'Within 1 month', m3: '2-3 months', flexible: 'Flexible', notSure: 'Not sure yet',
    problem: 'The problem', solution: 'The solution', result: 'The result', stack: 'Built with',
    pricingTitle: 'Simple, honest pricing', pricingSub: 'Clear starting prices. Final cost depends on your needs and I always quote before we begin.',
    from: 'from', popular: 'Most popular', choose: 'Choose this plan', faq: 'Frequently asked questions',
    testimonials: 'What clients say', clients: 'Trusted by', certs: 'Certificates & awards', blogTitle: 'Tips & articles',
    featured: 'Featured work', services: 'Services', whatWeDo: 'What we do',
  },
  sw: {
    home: 'Mwanzo', about: 'Kunihusu', company: 'Kampuni', work: 'Kazi', pricing: 'Bei', blog: 'Blogu', philosophy: 'Falsafa', stories: 'Hadithi', gallery: 'Picha', contact: 'Wasiliana', more: 'Zaidi',
    startProject: 'Anzisha mradi', seeAll: 'Tazama kazi zote', aboutBtn: 'Kuhusu', getQuote: 'Pata makadirio', bookCall: 'Weka miadi ya simu bila malipo', downloadCv: 'Pakua wasifu (CV)',
    whatsapp: 'Tuma kwa WhatsApp', email: 'Tuma kwa barua pepe', readMore: 'Soma zaidi', readStory: 'Soma hadithi', readPost: 'Soma makala', nextStory: 'Hadithi inayofuata', allStories: 'Hadithi zote',
    visit: 'Tembelea mradi', liveDemo: 'Tazama moja kwa moja', viewCase: 'Tazama uchunguzi wa mradi', allWork: 'Kazi zote', nextCase: 'Mradi unaofuata', allPosts: 'Makala zote', nextPost: 'Makala inayofuata',
    ctaTitle: 'Uko tayari kukuza biashara yako mtandaoni?', ctaText: 'Tujenge kitu ambacho wateja wako watapenda.',
    explore: 'Gundua', findMe: 'Nipate mtandaoni', chatNow: 'Ongea kwenye WhatsApp',
    fName: 'Jina lako', fContact: 'Simu au barua pepe', fService: 'Huduma unayohitaji', fBudget: 'Bajeti', fDeadline: 'Muda unaotaka', fMessage: 'Nieleze kuhusu mradi wako...',
    selectOne: 'Chagua moja', send: 'Tuma ombi', sending: 'Inatuma...', sent: 'Asante! Ombi lako limepokelewa. Nitakujibu hivi karibuni.', sendError: 'Imeshindwa kutuma. Tafadhali tumia WhatsApp au barua pepe.',
    quoteTitle: 'Omba makadirio ya bure', quoteSub: 'Niambie unachohitaji. Ninajibu haraka, kwa kawaida ndani ya siku moja.',
    asap: 'Haraka iwezekanavyo', m1: 'Ndani ya mwezi 1', m3: 'Miezi 2-3', flexible: 'Naweza kusubiri', notSure: 'Sijui bado',
    problem: 'Tatizo', solution: 'Suluhisho', result: 'Matokeo', stack: 'Imejengwa na',
    pricingTitle: 'Bei rahisi na wazi', pricingSub: 'Bei za kuanzia zipo wazi. Gharama ya mwisho inategemea mahitaji yako, na ninakupa makadirio kabla hatujaanza.',
    from: 'kuanzia', popular: 'Maarufu zaidi', choose: 'Chagua mpango huu', faq: 'Maswali yanayoulizwa mara kwa mara',
    testimonials: 'Wateja wanasemaje', clients: 'Wanaotuamini', certs: 'Vyeti na tuzo', blogTitle: 'Vidokezo na makala',
    featured: 'Kazi zilizoangaziwa', services: 'Huduma', whatWeDo: 'Tunachofanya',
  },
}

export const useT = () => {
  const lang = useStore((s) => s.lang)
  return (k) => dict[lang]?.[k] ?? dict.en[k] ?? k
}

/** loc(item, 'title') returns item.title_sw when Swahili is active and it exists */
export const useLoc = () => {
  const lang = useStore((s) => s.lang)
  return (o, k) => (lang === 'sw' && o?.[`${k}_sw`]) || o?.[k]
}
