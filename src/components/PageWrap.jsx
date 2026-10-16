import { motion } from 'framer-motion'

/** Page transition wrapper. SEO tags are handled centrally in src/seo/ (see seo/SEO-GUIDE.md). */
export default function PageWrap({ children }) {
  return (
    <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.main>
  )
}
