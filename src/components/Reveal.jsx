import { motion } from 'framer-motion'

const dirs = { up: { y: 50 }, down: { y: -50 }, left: { x: -60 }, right: { x: 60 }, zoom: { scale: 0.85 } }

export default function Reveal({ children, dir = 'up', delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirs[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
