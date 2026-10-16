import { motion } from 'framer-motion'
import ImageBox from './ImageBox'

/** Big animated banner at the top of inner pages. Optionally uses a background image. */
export default function PageHeader({ eyebrow, title, text, image, children }) {
  return (
    <header className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <ImageBox src={image} gradient="linear-gradient(135deg, rgb(var(--bg2)), rgb(var(--bg)))" className="absolute inset-0">
        {image && <div className="absolute inset-0 bg-bg/70" />}
      </ImageBox>
      <div className="blob -left-20 top-10 h-72 w-72 bg-a1" />
      <div className="blob -right-10 bottom-0 h-80 w-80 bg-a2" style={{ animationDelay: '2s' }} />
      <div className="wrap relative text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow gt">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-4xl font-bold md:text-6xl">{title}</motion.h1>
        {text && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mx-auto mt-5 max-w-2xl text-lg text-mu">{text}</motion.p>}
        {children}
      </div>
    </header>
  )
}
