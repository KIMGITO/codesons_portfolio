import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaLink,
  FaPlus,
  FaTrash,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUpRightFromSquare,
  FaRotateRight,
} from 'react-icons/fa6'
import { cfg } from '../config'
import { useStore } from '../store/useStore'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const defaultImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
]

function HeapImage({ src, index, onClick, containerRef, bringToFront }) {
  const [zIdx, setZIdx] = useState(index + 1)

  // Stable pseudo-random rotation and offset based on index
  const rotation = ((index * 7 + 3) % 25) - 12 // range: -12 to +12 deg
  const offsetX = ((index * 13 + 5) % 20) - 10 // range: -10 to +10 px
  const offsetY = ((index * 11 + 7) % 16) - 8 // range: -8 to +8 px

  const pointerPosRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  const handlePointerDown = (e) => {
    if (bringToFront) {
      setZIdx(bringToFront())
    }
    pointerPosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleDragStart = () => {
    isDraggingRef.current = true
    if (bringToFront) {
      setZIdx(bringToFront())
    }
  }

  const handleDragEnd = (_event, info) => {
    const moved = Math.hypot(info.offset.x, info.offset.y)
    if (moved > 6) {
      isDraggingRef.current = true
      setTimeout(() => {
        isDraggingRef.current = false
      }, 150)
    } else {
      isDraggingRef.current = false
    }
  }

  const handleClick = (e) => {
    if (isDraggingRef.current) return
    if (e.clientX && pointerPosRef.current.x) {
      const dist = Math.hypot(
        e.clientX - pointerPosRef.current.x,
        e.clientY - pointerPosRef.current.y
      )
      if (dist > 6) return
    }
    onClick()
  }

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing select-none touch-none -m-2 sm:-m-3 md:-m-4"
      style={{ zIndex: zIdx, position: 'relative' }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 500,
        boxShadow: '0 25px 50px rgba(0,0,0,0.45)',
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 0,
        zIndex: 600,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ rotate: rotation, x: offsetX, y: offsetY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onPointerDown={handlePointerDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="group relative overflow-hidden rounded-2xl border-4 sm:border-[6px] border-white/90 bg-white/10 p-1.5 sm:p-2 shadow-2xl backdrop-blur-md transition-colors duration-300 hover:border-white">
        <div className="overflow-hidden rounded-xl bg-black/20">
          <img
            src={src}
            alt={`Gallery photo ${index + 1}`}
            loading="lazy"
            draggable={false}
            className="h-44 w-52 sm:h-52 sm:w-60 md:h-56 md:w-72 object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] font-mono text-tx/60">
          <span>#{String(index + 1).padStart(2, '0')}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-a3 flex items-center gap-1 font-sans text-xs">
            view <FaArrowUpRightFromSquare className="text-[9px]" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { links, addLink, delLink, lightbox, setLightbox } = useStore()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [heapKey, setHeapKey] = useState(0)

  const containerRef = useRef(null)

  const imgs = cfg.galleryImages && cfg.galleryImages.length > 0 ? cfg.galleryImages : defaultImages

  const maxZRef = useRef(imgs.length + 10)
  const bringToFront = () => {
    maxZRef.current += 1
    return maxZRef.current
  }

  const handleReset = () => {
    maxZRef.current = imgs.length + 10
    setHeapKey((k) => k + 1)
  }

  const add = () => {
    let u = url.trim()
    if (!u) return
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u
    let host = u
    try {
      host = new URL(u).hostname
    } catch {
      /* ignore */
    }
    addLink({ title: title.trim() || host, url: u, host })
    setTitle('')
    setUrl('')
  }

  useEffect(() => {
    const k = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % imgs.length)
      if (e.key === 'ArrowLeft') setLightbox((lightbox - 1 + imgs.length) % imgs.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [lightbox, imgs.length, setLightbox])

  const allLinks = [...cfg.galleryLinks, ...links.map((l) => ({ ...l, local: true }))]

  return (
    <PageWrap>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            Photos, videos & <span className="gt">links</span>
          </>
        }
        text="Explore my photos, albums and other places my work lives online."
      />

      {/* Heap Image Stack Section */}
      <section className="wrap pb-16">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-a2 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-a2"></span>
            </span>
            <p className="text-sm font-medium text-tx/80">
              Interactive photo pile <span className="text-xs font-normal text-mu">— drag cards to scatter or rearrange</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-mu">{imgs.length} photos</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-tx/15 bg-tx/5 px-3 py-1 text-xs font-medium text-tx/80 transition hover:border-tx/30 hover:bg-tx/10 hover:text-tx active:scale-95"
              title="Reset layout positions"
            >
              <FaRotateRight className="text-[10px]" /> Reset layout
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative min-h-[640px] md:min-h-[720px] overflow-hidden rounded-3xl border border-tx/10 bg-tx/[0.02] p-6 sm:p-10 md:p-12 select-none backdrop-blur-md"
        >
          {/* Subtle ambient backdrops */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-a1/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-a2/10 blur-3xl" />

          <div
            key={heapKey}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center py-4"
          >
            {imgs.map((src, i) => (
              <HeapImage
                key={src + i}
                src={src}
                index={i}
                containerRef={containerRef}
                bringToFront={bringToFront}
                onClick={() => setLightbox(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Links & albums Section */}
      <section className="wrap pb-20">
        <Reveal>
          <h2 className="mb-6 text-3xl font-bold">
            Links & <span className="gt">albums</span>
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allLinks.length === 0 && (
            <p className="col-span-full text-mu">
              No links yet. Add some in <code>VITE_GALLERY_LINKS</code> in your .env file.
            </p>
          )}
          {allLinks.map((l, i) => (
            <Reveal key={l.url + i} delay={(i % 3) * 0.08}>
              <div className="glass glass-hover flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-a1 to-a2 text-white">
                  <FaLink />
                </div>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate font-semibold">
                    {l.title} <FaArrowUpRightFromSquare className="shrink-0 text-xs text-a3" />
                  </p>
                  <p className="truncate text-xs text-mu">{l.host}</p>
                </a>
                {l.local && (
                  <button
                    aria-label="Remove"
                    onClick={() => delLink(links.findIndex((x) => x.url === l.url))}
                    className="text-mu hover:text-a2"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="glass mx-auto max-w-3xl p-6">
            <p className="font-semibold">Quick add a link</p>
            <p className="mb-4 text-sm text-mu">
              Paste a Google Photos / Drive / YouTube link. It is saved in this browser only. For links every visitor sees, use <code>VITE_GALLERY_LINKS</code> in .env.
            </p>
            <div className="grid gap-3 md:grid-cols-5">
              <input
                className="field md:col-span-2"
                placeholder="Title (e.g. Event photos)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="field md:col-span-2"
                placeholder="https://photos.google.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && add()}
              />
              <button className="btn" onClick={add}>
                <FaPlus /> Add
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && imgs[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 z-10 text-3xl text-white/80 transition hover:text-white"
              style={{ top: 'max(1.25rem, env(safe-area-inset-top))' }}
              onClick={() => setLightbox(null)}
            >
              <FaXmark />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((lightbox - 1 + imgs.length) % imgs.length)
              }}
              className="absolute left-3 z-10 p-2 text-3xl text-white/80 transition hover:scale-110 hover:text-white"
            >
              <FaChevronLeft />
            </button>
            <div className="relative max-h-[85vh] max-w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightbox}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={imgs[lightbox]}
                alt=""
                className="max-h-[85vh] max-w-full rounded-2xl border border-white/20 shadow-2xl object-contain"
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-md">
                {lightbox + 1} / {imgs.length}
              </div>
            </div>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((lightbox + 1) % imgs.length)
              }}
              className="absolute right-3 z-10 p-2 text-3xl text-white/80 transition hover:scale-110 hover:text-white"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  )
}
