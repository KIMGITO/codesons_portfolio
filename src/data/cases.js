/* ============================================================
   CASE STUDIES / PROJECTS  (shown on /work and /work/:slug)
   Edit each one: be honest and specific. Add real numbers if you have them.
   image / screenshots: link or /images/projects/file.jpg (see docs/ASSETS.md)   demoUrl / repoUrl: optional links
   ============================================================ */
export const cases = [
  {
    slug: 'barbershop-manager', title: 'Barbershop Manager', category: 'Mobile & Web App',
    summary: "Offline-first app that tracks service providers' earnings and payouts.",
    problem: "Tracking every barber's services, earnings and payouts by hand is slow and easy to get wrong, especially when the internet is unreliable.",
    solution: 'I built an offline-first app that records every service on the spot, works without internet, and syncs to the cloud when a connection returns. Payouts are calculated automatically.',
    result: '[Add your real result here, e.g. payouts that took hours now take minutes, and how many people use it.]',
    tags: ['React', 'Zustand', 'Capacitor', 'Supabase'], image: 'https://images.unsplash.com/photo-1585747860019-8013dbdd60a6?w=800&q=80', screenshots: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'], gradient: 'linear-gradient(135deg,#6366f1,#ec4899)', demoUrl: '', repoUrl: '',
  },
  {
    slug: 'fluencytalks', title: 'FluencyTalks', category: 'Web App',
    summary: 'Language-practice web app with accounts and a social-style responsive UI.',
    problem: 'Language learners need a friendly place to practise speaking and connect with others, on any device.',
    solution: 'I designed a public website with account management and a responsive, social-style interface that feels familiar from the first visit.',
    result: '[Add your real result here, e.g. number of users, feedback, or what it unlocked.]',
    tags: ['React', 'Auth', 'Responsive'], image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', screenshots: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80'], gradient: 'linear-gradient(135deg,#06b6d4,#6366f1)', demoUrl: '', repoUrl: '',
  },
  {
    slug: 'your-next-project', title: 'Your next project', category: 'Add yours',
    summary: 'Add your project here: title, summary, problem, solution, result, tags, screenshots and a live link.',
    problem: 'Describe the problem your client or users had.',
    solution: 'Describe what you built and the key decisions you made.',
    result: 'Describe the outcome, with numbers if possible.',
    tags: ['Add me'], image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80', screenshots: [], gradient: 'linear-gradient(135deg,#f97316,#e11d48)', demoUrl: '', repoUrl: '',
  },
]
