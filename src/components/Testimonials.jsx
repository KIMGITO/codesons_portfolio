import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa6'
import { testimonials } from '../data/content'
import { useT } from '../i18n'
import SectionTitle from './SectionTitle'
import ImageBox from './ImageBox'

export default function Testimonials() {
  const t = useT()
  const [i, setI] = useState(0)
  const n = testimonials.length
  useEffect(() => {
    if (n < 2) return
    const id = setInterval(() => setI((v) => (v + 1) % n), 6500)
    return () => clearInterval(id)
  }, [i, n])
  if (!n) return null
  const x = testimonials[i]
  return (
    <section className="wrap section">
      <SectionTitle eyebrow="Testimonials" title={<span className="gt">{t('testimonials')}</span>} />
      <div className="glass relative mx-auto min-h-[300px] max-w-3xl overflow-hidden p-8 text-center md:p-12">
        <FaQuoteLeft className="absolute left-6 top-6 text-4xl text-a2/40" />
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }}>
            <p className="font-serif text-xl italic leading-relaxed md:text-2xl">{x.text}</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <ImageBox src={x.avatar} className="h-12 w-12 rounded-full">
                {!x.avatar && <span className="absolute inset-0 flex items-center justify-center font-bold text-on">{x.name[0]}</span>}
              </ImageBox>
              <div className="text-left"><p className="font-bold">{x.name}</p><p className="text-sm text-mu">{x.role}</p></div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, k) => <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className="h-2 rounded-full bg-gradient-to-r from-a1 to-ge transition-all" style={{ width: k === i ? 30 : 8, opacity: k === i ? 1 : 0.35 }} />)}
        </div>
      </div>
    </section>
  )
}
