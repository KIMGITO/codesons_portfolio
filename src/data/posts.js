import { IMG, GRAD } from './images'

/* ============================================================
   BLOG  (shown on /blog and /blog/:slug)
   Short, genuinely useful articles bring customers from Google.

   body is a list of blocks. Allowed blocks:
     'plain string'                 -> paragraph
     { h: 'Heading' }               -> section heading
     { ul: ['a', 'b'] }             -> bullet list
     { ol: ['a', 'b'] }             -> numbered list
     { callout: 'Tip text' }        -> highlighted note
   takeaways = the "In short" box at the top.
   Examples used here are real products and rules (M-Pesa, Daraja,
   Google Business Profile, Kenya Data Protection Act 2019 ...).
   Double-check anything time-sensitive before you publish.
   ============================================================ */
export const posts = [
  {
    slug: 'why-your-business-needs-a-website',
    title: 'Why every Kenyan business needs a website (even with Instagram and WhatsApp)',
    category: 'Business', date: '2026-08-12', image: IMG.blog.website, gradient: GRAD.a,
    excerpt: 'Social media is rented space. Here is what your own website does for trust, search and sales.',
    takeaways: [
      'Customers search Google and Maps before they call or visit.',
      'You own a website. You only rent a social media page.',
      'A good starter site needs four things: services, photos, proof and a WhatsApp button.',
    ],
    body: [
      'Most customers check you out online before they ever speak to you. They search Google, glance at your photos, read a few reviews and decide in seconds whether you look trustworthy. If all they find is a half-updated social media page, many will quietly move on to the competitor who looks more established.',
      { h: 'A website works while you sleep' },
      'Your website is a shop that never closes. It lists your services, prices, location and opening hours, and it lets a customer reach you on WhatsApp with one tap, even at midnight. A WhatsApp click-to-chat link (the wa.me kind) takes a few minutes to add and often turns a visitor into a real conversation.',
      { h: 'You own it. You only rent social media.' },
      'Instagram, Facebook and TikTok change their algorithms often, and an account can be restricted or hacked overnight. Marketplaces such as Jumia and Kilimall bring buyers, but they also set the rules and take a commission on sales. A website on your own domain, like yourbusiness.co.ke, is the one place no platform can change on you.',
      { h: 'Be found when people search' },
      'People type things like "barber in Rongai" or "wedding photographer Nakuru" into Google. A website, together with a free Google Business Profile, is how you appear for those searches and on Google Maps. Social posts rarely show up there.',
      { h: 'What a good starter website needs' },
      { ol: [
        'A clear home page that says what you do and where, in one sentence.',
        'Your services, with prices or a "from" price where you can.',
        'Real photos of your work, your shop or your team.',
        'Proof: reviews, client names, or a short story of a job done well.',
        'One obvious action: Call, WhatsApp or Get a quote.',
      ] },
      { callout: 'You do not need a huge site to start. Five good pages beat twenty weak ones, and you can grow it as the business grows.' },
    ],
  },
  {
    slug: 'accept-mpesa-payments-on-your-website',
    title: 'How to accept M-Pesa payments on your website',
    category: 'Payments', date: '2026-08-26', image: IMG.blog.mpesa, gradient: GRAD.b,
    excerpt: 'Till, Paybill, STK Push and the Daraja API explained in plain language, plus the mistakes to avoid.',
    takeaways: [
      'You need a Lipa na M-Pesa Till or Paybill before you can take payments online.',
      'STK Push sends a payment prompt straight to the customer\'s phone.',
      'Never mark an order as paid until Safaricom\'s confirmation reaches your server.',
    ],
    body: [
      'In Kenya, customers expect to pay with M-Pesa. If your website only shows a bank account number, you will lose sales to anyone who lets people pay from their phone in seconds. The good news is that Safaricom gives developers an official way to do it.',
      { h: 'Step 1: get a Till or Paybill' },
      'Online payments are tied to a Lipa na M-Pesa shortcode. A Buy Goods Till is common for shops and services that sell directly to customers. A Paybill suits businesses that collect payments against an account number, such as school fees, rent or subscriptions. Safaricom registers both for your business.',
      { h: 'Step 2: use the Daraja API' },
      'Daraja is Safaricom\'s developer platform (developer.safaricom.co.ke). You create an app there, test in the sandbox, and then request to go live with your own shortcode. The feature most websites use is Lipa na M-Pesa Online, better known as STK Push.',
      { h: 'How STK Push works' },
      { ol: [
        'The customer enters their phone number on your checkout page.',
        'Your server asks Daraja to start the payment.',
        'A prompt appears on the customer\'s phone asking for their M-Pesa PIN.',
        'Safaricom sends the result to your callback URL.',
        'Only then does your system mark the order as paid and send the receipt.',
      ] },
      { callout: 'Never trust the browser to say "paid". Always wait for the callback from Safaricom on your server. This is the most common and most expensive mistake in homemade payment pages.' },
      { h: 'Other options' },
      'If you also want card payments, aggregators such as Pesapal and Flutterwave support M-Pesa and cards in one checkout, and they handle much of the integration for a fee. Which route is cheaper depends on your volume, so compare before you decide.',
      'Whichever you choose, keep the checkout simple: show the amount, ask only for a phone number, and send an SMS or email receipt immediately.',
    ],
  },
  {
    slug: 'why-offline-first-apps-matter',
    title: 'Why offline-first apps matter when the internet drops',
    category: 'Mobile apps', date: '2026-09-04', image: IMG.blog.offline, gradient: GRAD.c,
    excerpt: 'Internet drops. Your business should not. How offline-first apps keep working anyway.',
    takeaways: [
      'Offline-first means the app saves on the phone first and syncs later.',
      'Staff keep working and nothing is lost when the connection fails.',
      'It must be designed in from day one. It is very hard to add later.',
    ],
    body: [
      'Many business apps stop working the moment the connection disappears. For a salon, shop or delivery rider, that means missed records, wrong totals and lost money.',
      { h: 'You already use offline-first apps' },
      'WhatsApp is a good example. Send a message with no signal and it waits on your phone, then goes out as soon as you reconnect. Spotify lets you download playlists to play on a matatu with no data. Google Docs can be switched on for offline editing and syncs your changes later. The idea is the same: the phone is the first place data lives, not the last.',
      { h: 'How it works' },
      { ul: [
        'Every action is saved to a database on the phone straight away.',
        'The screen updates instantly, because it never waits for the network.',
        'A background sync sends the saved changes to the cloud when the connection returns.',
        'If two devices changed the same record, clear rules decide which change wins.',
      ] },
      { h: 'Who needs it most' },
      'Any team working in basements, rural areas, markets, farms or on the road. Also any business where a failed save is costly, such as point of sale, bookings, stock counts and payouts.',
      'This is why I built Barbershop Manager as an offline-first app. Barbers record every service as it happens, even when the Wi-Fi is down, and the earnings and payouts are worked out automatically once it syncs.',
      { callout: 'If your staff work with unreliable internet, ask for offline-first from the very first meeting. Retrofitting it into an app that was built online-only usually means starting again.' },
    ],
  },
  {
    slug: 'how-much-does-a-website-cost',
    title: 'How much does a website cost? What really affects the price',
    category: 'Pricing', date: '2026-09-15', image: IMG.blog.cost, gradient: GRAD.a,
    excerpt: 'The main things that decide the price of a website, so you can plan a budget and compare quotes fairly.',
    takeaways: [
      'Price depends on pages, custom design and features, not on "a website" in general.',
      'Budget for yearly running costs, not only the build.',
      'Compare what is included in each quote, not just the total.',
    ],
    body: [
      'There is no single price, because websites are very different from each other. A one-page site for a plumber and a booking platform with payments are not the same job.',
      { h: 'What pushes the price up or down' },
      { ul: [
        'Number of pages and how much content you need written.',
        'How custom the design is, and whether it includes animation.',
        'Features: online payments, user accounts, an admin panel, bookings, multiple languages.',
        'Integrations such as M-Pesa, email marketing or a CRM.',
        'Deadline. Urgent work costs more.',
      ] },
      { h: 'Typical tiers' },
      'A simple business website is the most affordable. A custom design with animation costs more. A web app with logins, dashboards and payments costs the most, because it takes careful building and testing. A mobile app is usually quoted separately.',
      { h: 'Running costs people forget' },
      { ul: [
        'Domain name, renewed every year (a .com or a .co.ke).',
        'Hosting. Small static sites can run on platforms such as Netlify, Vercel or Cloudflare Pages, which offer free tiers, but busy sites and apps need paid plans.',
        'Business email on your own domain, for example through Google Workspace.',
        'Optional monthly maintenance: updates, backups and small changes.',
      ] },
      { h: 'How to compare quotes fairly' },
      'Put the quotes side by side and check what each one includes: design, mobile version, SEO setup, content, training, support after launch, and, importantly, who owns the code and the design. The cheapest quote is rarely the best value if it leaves out half of what you need.',
      { callout: 'A good developer will explain every cost, including yearly ones, before you pay a deposit.' },
    ],
  },
  {
    slug: 'google-business-profile-for-local-customers',
    title: 'Get found on Google Maps: a simple guide to Google Business Profile',
    category: 'Marketing', date: '2026-09-29', image: IMG.blog.local, gradient: GRAD.b,
    excerpt: 'A free listing that puts your shop, salon or office on Google Search and Maps. Here is how to set it up well.',
    takeaways: [
      'Google Business Profile is free and shows you on Search and Maps.',
      'Complete, accurate details and fresh photos matter more than tricks.',
      'Reply to every review, good or bad.',
    ],
    body: [
      'When someone searches "pharmacy near me" or "car wash Thika Road", Google shows a map with a few businesses at the top. Those listings come from Google Business Profile, and creating one costs nothing.',
      { h: 'Set it up in four steps' },
      { ol: [
        'Search for your business on Google or Maps and claim it, or create it at business.google.com.',
        'Choose the most accurate main category (for example "Barber shop", not just "Beauty").',
        'Verify your business. Google will tell you which methods are available for your listing.',
        'Fill in everything: address, phone, hours, website and services.',
      ] },
      { h: 'What makes a listing perform' },
      { ul: [
        'Consistent name, address and phone number everywhere online.',
        'Real photos of the outside, the inside, your team and your work. Add new ones often.',
        'Correct opening hours, including public holidays.',
        'Reviews. Politely ask happy customers to leave one, and reply to every review in a calm, professional tone.',
      ] },
      { h: 'Connect it to your website' },
      'Link your listing to your website, and make sure the website loads quickly on a phone. Google measures page experience with Core Web Vitals, such as how fast the main content appears. You can check your own site for free with PageSpeed Insights, and track how people find you with Google Search Console.',
      { callout: 'Never buy fake reviews. They break Google\'s rules and can get your listing removed.' },
    ],
  },
  {
    slug: 'protect-customer-data-kenya-data-protection-act',
    title: 'Protecting customer data: what the Kenya Data Protection Act means for your website',
    category: 'Security', date: '2026-10-10', image: IMG.blog.security, gradient: GRAD.c,
    excerpt: 'If your website or app collects names, phone numbers or emails, these basics keep your customers and your business safe.',
    takeaways: [
      'The Data Protection Act, 2019 covers any business that handles personal data.',
      'Collect only what you need, explain why, and keep it secure.',
      'Use HTTPS and never store passwords in plain text.',
    ],
    body: [
      'A contact form, a booking page or a checkout all collect personal data. In Kenya, the Data Protection Act, 2019 sets the rules for how that data should be handled, and the Office of the Data Protection Commissioner (ODPC) enforces them.',
      { h: 'The basics, in plain language' },
      { ul: [
        'Collect only the data you really need. If you do not need a date of birth, do not ask for one.',
        'Tell people why you collect their data and how you will use it, usually in a privacy policy.',
        'Get clear consent where it is required, for example before sending marketing messages.',
        'Keep the data accurate, and delete it when you no longer need it.',
        'Many businesses that handle personal data must register with the ODPC as a data controller or processor. Check whether this applies to you.',
      ] },
      { h: 'Technical habits that matter' },
      { ul: [
        'Use HTTPS on every page. Hosting platforms usually provide free certificates.',
        'Hash passwords. A website should never be able to email you someone\'s password.',
        'Keep software and plugins updated, and use strong, unique admin passwords with two-factor sign-in.',
        'Back up regularly and test that you can restore.',
        'Limit who on your team can see customer data.',
      ] },
      { h: 'If something goes wrong' },
      'Have a simple plan: find out what happened, secure the system, and tell the people and the authorities concerned as the law requires. Acting quickly protects your customers and your reputation.',
      { callout: 'This is a general guide, not legal advice. For your specific business, speak to a lawyer or consult the ODPC at odpc.go.ke.' },
    ],
  },
]

/* word count -> "3 min read" */
const words = (p) => p.body.reduce((n, b) => n + (typeof b === 'string' ? b : b.h || b.callout || (b.ul || b.ol || []).join(' ')).split(/\s+/).length, 0)
posts.forEach((p) => { p.read = `${Math.max(2, Math.round(words(p) / 200))} min read` })
