/* ============================================================
   IMAGE PLACEHOLDERS (Unsplash) + THEME GRADIENTS
   Every place that needs a picture falls back to one of these links.
   Swap any of them for your own photo later (a full link, or /images/...).
   If a link ever fails, <ImageBox> shows a theme gradient instead.
   ============================================================ */
export const unsplash = (id, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

export const IMG = {
  // people (placeholders: replace with real photos)
  profile: unsplash('photo-1560250097-0b93528c311a', 800),
  avatars: [
    unsplash('photo-1507003211169-0a1dd7228f2d', 200),
    unsplash('photo-1494790108377-be9c29b29330', 200),
    unsplash('photo-1500648767791-00dcc994a43e', 200),
  ],
  // hero slides + right-hand advert
  hero: [
    unsplash('photo-1519389950473-47ba0277781c', 1600),
    unsplash('photo-1504639725590-34d0984388bd', 1600),
    unsplash('photo-1531297484001-80022131f5a1', 1600),
  ],
  advert: unsplash('photo-1498050108023-c5249f4df085', 900),
  philosophy: unsplash('photo-1522202176988-66273c2fd55f', 1600),
  certificate: unsplash('photo-1523240795612-9a054b0db644', 800),
  og: unsplash('photo-1498050108023-c5249f4df085', 1200),
  // blog
  blog: {
    website: unsplash('photo-1498050108023-c5249f4df085', 1200),
    offline: unsplash('photo-1551650975-87deedd944c3', 1200),
    cost: unsplash('photo-1460925895917-afdab827c52f', 1200),
    mpesa: unsplash('photo-1556742049-0cfed4f6a45d', 1200),
    local: unsplash('photo-1432888498266-38ffec3eaf0a', 1200),
    security: unsplash('photo-1550751827-4bd374c3f58b', 1200),
  },
}

/* Theme-aware gradients: always a1 -> ge (its neighbour), so they stay harmonious in every theme */
export const GRAD = {
  a: 'linear-gradient(135deg, rgb(var(--a1)), rgb(var(--ge)))',
  b: 'linear-gradient(135deg, rgb(var(--ge)), rgb(var(--a1)))',
  c: 'linear-gradient(160deg, rgb(var(--a1)), rgb(var(--bg2)))',
}
/* Hero slides: deep tones so white text always reads */
export const HERO_GRAD = [
  'linear-gradient(135deg, rgb(var(--h1)), rgb(var(--h2)))',
  'linear-gradient(135deg, rgb(var(--h2)), rgb(var(--h1)))',
  'linear-gradient(160deg, rgb(var(--h1)), rgb(var(--h2)) 70%, rgb(var(--a1)))',
]
