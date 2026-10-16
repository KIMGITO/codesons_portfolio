import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Company from './pages/Company'
import Work from './pages/Work'
import Philosophy from './pages/Philosophy'
import { Stories, StoryPage } from './pages/Stories'
import Gallery from './pages/Gallery'
import Pricing from './pages/Pricing'
import CaseStudy from './pages/CaseStudy'
import { Blog, BlogPost } from './pages/Blog'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { Seo } from './seo'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const theme = useStore((s) => s.theme)
  const setMenu = useStore((s) => s.setMenu)

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    setMenu(false)
    if (location.hash) {
      const id = location.hash.slice(1)
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 700)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, setMenu])

  return (
    <>
      <Seo />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/company" element={<Company />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
