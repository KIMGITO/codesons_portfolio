import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaLaptop, FaGlobe } from 'react-icons/fa6'
import { cfg } from '../config'
import { slides } from '../data/content'
import ImageBox from './ImageBox'
import AvailabilityBadge from './AvailabilityBadge'
import { useT, useLoc } from '../i18n'

const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }

function formatTitle(title) {
  if (!title) return ''
  if (title.includes(',')) {
    const [before, after] = title.split(',')
    return (
      <>
        {before}, <span className="gt">{after.trim()}</span>
      </>
    )
  }
  const words = title.split(' ')
  if (words.length <= 2) return <span className="gt">{title}</span>
  const first = words.slice(0, -2).join(' ')
  const last = words.slice(-2).join(' ')
  return (
    <>
      {first} <span className="gt">{last}</span>
    </>
  )
}

/** Animate the right-side advert image in: slide from the right + rotate. */
function useAdvertAnimation(i) {
  const controls = useAnimation()
  const framed = useRef(false)

  const run = useCallback(() => {
    if (framed.current) return
    framed.current = true
    controls.start({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    })
  }, [controls])

  useEffect(() => {
    run()
  }, [i, run])

  return controls
}

export default function Hero() {
  const t = useT()
  const loc = useLoc()
  const [i, setI] = useState(0)
  const n = slides.length

  const advertControls = useAdvertAnimation(i)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000)
    return () => clearInterval(t)
  }, [i, n])

  const s = slides[i]
  const slideBg = cfg.heroImages.length ? cfg.heroImages[i % cfg.heroImages.length] : ''
  const advertSrc = cfg.heroAdvertImg || ''
  const advertAlt = 'Codensons — website and mobile app development'

  return (
    <section className="relative h-screen min-h-[600px] flex-col overflow-hidden text-white">
      {/* Left full-bleed slide background */}
      <AnimatePresence>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.18 }}
          transition={{ duration: 1.6 }}
        >
          <ImageBox src={slideBg} gradient={s.gradient} className="absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Darken left for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />

      {/* Right-side advert that slides in from the right while rotating */}
      {advertSrc && (
        <motion.div
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          initial={{ opacity: 0, x: 60, rotate: 6 }}
          animate={advertControls}
          exit={{ opacity: 0, x: 60, rotate: 6 }}
        >
          <div className="flex h-full flex-row items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-[62%] max-w-sm">
                <ImageBox src={advertSrc} alt={advertAlt} gradient="linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.05))" className="rounded-xl shadow-2xl" />
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FaLaptop className="text-lg" />
                <FaGlobe className="text-lg" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content block: slide title on the left, advert on the right (desktop) / above (mobile) */}
      <div className="wrap relative z-10 flex flex-col items-stretch justify-center px-5 md:px-8" style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + 4rem)` }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            <motion.div variants={item} className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <motion.p variants={item} className="eyebrow text-a2">{loc(s, 'kicker')}</motion.p>
                <motion.h1 variants={item} className="mt-1 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-7xl">
                  {formatTitle(loc(s, 'title'))}
                </motion.h1>
                <motion.p variants={item} className="mt-3 max-w-xl text-base text-white/80 md:text-lg">{loc(s, 'text')}</motion.p>
                <motion.p variants={item} className="mt-2 max-w-2xl text-sm text-white/60">
                  We craft pixel-perfect digital experiences that blend cutting-edge technology with thoughtful design — helping brands stand out, convert visitors, and scale with confidence.
                </motion.p>
              </div>

              {advertSrc && (
                <div className="flex shrink-0 items-center justify-center md:justify-end">
                  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <motion.div
                      initial={{ opacity: 0, x: 60, rotate: 6 }}
                      animate={advertControls}
                      exit={{ opacity: 0, x: 60, rotate: 6 }}
                      className="flex justify-center"
                    >
                      <ImageBox src={advertSrc} alt={advertAlt} gradient="linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.05))" className="w-full rounded-2xl shadow-2xl" />
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Link to="/pricing#quote" className="btn">{t('getQuote')} <FaArrowRight /></Link>
              <Link to="/work" className="btn-ghost !border-white/40 !text-white hover:!bg-white/15">{t('work')}</Link>
            </motion.div>
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
              {['React', 'Flutter', 'Node.js', 'Supabase'].map((tech) => (
                <span key={tech} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">{tech}</span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/25"><FaChevronLeft /></button>
      <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white/25"><FaChevronRight /></button>
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
        {slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: k === i ? 38 : 10, opacity: k === i ? 1 : 0.5 }} />)}
      </div>
    </section>
  )
}
