import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FaBars, FaXmark, FaMoon, FaSun, FaFire, FaChevronDown } from 'react-icons/fa6'
import { cfg } from '../config'
import { useStore } from '../store/useStore'
import { useT } from '../i18n'
import LangToggle from './LangToggle'

const main = [['/', 'home'], ['/about', 'about'], ['/company', 'company'], ['/work', 'work'], ['/pricing', 'pricing'], ['/blog', 'blog'], ['/contact', 'contact']]
const more = [['/philosophy', 'philosophy'], ['/stories', 'stories'], ['/gallery', 'gallery']]
const themeIcon = { midnight: <FaMoon />, light: <FaSun />, sunset: <FaFire /> }

export default function Navbar() {
  const { theme, cycleTheme, menuOpen, setMenu } = useStore()
  const t = useT()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30)
    f(); window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => setMoreOpen(false), [pathname])

  const cls = ({ isActive }) => `text-sm transition hover:text-tx ${isActive ? 'font-semibold text-tx' : 'text-mu'}`
  const moreActive = more.some(([to]) => pathname.startsWith(to))

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-a1 via-a2 to-a3" />
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? 'border-b border-tx/10 bg-bg/80 backdrop-blur-xl' : ''}`} style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="wrap flex items-center justify-between py-3.5">
          <Link to="/" onClick={() => setMenu(false)} className="font-display text-xl font-bold"><span className="gt">{cfg.brand.slice(0, 5)}</span>{cfg.brand.slice(5)}</Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {main.map(([to, k]) => <NavLink key={to} to={to} end={to === '/'} className={cls}>{t(k)}</NavLink>)}
            <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
              <button onClick={() => setMoreOpen(!moreOpen)} onMouseEnter={() => setMoreOpen(true)} className={`flex items-center gap-1 text-sm ${moreActive ? 'font-semibold text-tx' : 'text-mu'} hover:text-tx`}>{t('more')} <FaChevronDown className="text-[10px]" /></button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full w-44 pt-3">
                    <div className="glass !rounded-2xl bg-bg2/95 p-2">
                      {more.map(([to, k]) => <NavLink key={to} to={to} className={({ isActive }) => `block rounded-xl px-4 py-2.5 text-sm hover:bg-tx/10 ${isActive ? 'font-semibold' : 'text-mu'}`}>{t(k)}</NavLink>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle />
            <button aria-label="Change theme" title={`Theme: ${theme}`} onClick={cycleTheme} className="glass flex h-10 w-10 items-center justify-center !rounded-full hover:scale-110">{themeIcon[theme]}</button>
            <button aria-label="Menu" onClick={() => setMenu(!menuOpen)} className="glass flex h-10 w-10 items-center justify-center !rounded-full lg:hidden">{menuOpen ? <FaXmark /> : <FaBars />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
              <div className="wrap flex max-h-[75vh] flex-col gap-1 overflow-y-auto pb-5">
                {[...main, ...more].map(([to, k], i) => (
                  <motion.div key={to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <NavLink to={to} end={to === '/'} onClick={() => setMenu(false)} className={({ isActive }) => `block rounded-xl px-3 py-3 text-lg ${isActive ? 'bg-tx/10 font-semibold' : 'text-mu'}`}>{t(k)}</NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
