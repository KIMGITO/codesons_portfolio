import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import { faqs } from '../data/content'
import { useT, useLoc } from '../i18n'
import SectionTitle from './SectionTitle'

export default function FAQ() {
  const t = useT()
  const loc = useLoc()
  const [open, setOpen] = useState(0)
  return (
    <section className="wrap section !pt-0">
      <SectionTitle eyebrow="FAQ" title={<span className="gt">{t('faq')}</span>} />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded={open === i}>
              {loc(f, 'q')}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-a2"><FaPlus /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-mu">{loc(f, 'a')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
