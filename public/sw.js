// Simple service worker: fast repeat visits + basic offline support
const V = 'codensons-v1'
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())
))
self.addEventListener('fetch', (e) => {
  const r = e.request
  const u = new URL(r.url)
  if (r.method !== 'GET' || u.origin !== location.origin) return
  if (u.pathname.startsWith('/assets/')) { // hashed files never change: cache first
    e.respondWith(caches.match(r).then((h) => h || fetch(r).then((res) => { const c = res.clone(); caches.open(V).then((ca) => ca.put(r, c)); return res })))
    return
  }
  // pages & other files: network first, fall back to cache when offline
  e.respondWith(fetch(r).then((res) => { const c = res.clone(); caches.open(V).then((ca) => ca.put(r.mode === 'navigate' ? '/' : r, c)); return res }).catch(() => caches.match(r.mode === 'navigate' ? '/' : r)))
})
