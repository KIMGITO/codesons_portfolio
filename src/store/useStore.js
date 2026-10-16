import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cfg } from '../config'

export const THEMES = ['midnight', 'light', 'sunset']

export const useStore = create(
  persist(
    (set, get) => ({
      theme: cfg.defaultTheme,
      setTheme: (theme) => set({ theme }),
      cycleTheme: () => set({ theme: THEMES[(THEMES.indexOf(get().theme) + 1) % THEMES.length] }),

      lang: cfg.defaultLang,
      setLang: (lang) => set({ lang }),

      menuOpen: false,
      setMenu: (menuOpen) => set({ menuOpen }),

      lightbox: null, // index of image open in gallery lightbox
      setLightbox: (lightbox) => set({ lightbox }),

      // links added from the Gallery page (stored in this browser only)
      links: [],
      addLink: (l) => set({ links: [...get().links, l] }),
      delLink: (i) => set({ links: get().links.filter((_, x) => x !== i) }),
    }),
    { name: 'codensons-store', partialize: (s) => ({ theme: s.theme, lang: s.lang, links: s.links }) },
  ),
)
