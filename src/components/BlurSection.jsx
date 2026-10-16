import { motion } from 'framer-motion'

export default function BlurSection({ bgImage, bgOpacity = 0.7, className = '', id, children }) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-sm scale-105"
          />
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            style={{ opacity: bgOpacity }}
          />
        </>
      )}
      <div className="relative">{children}</div>
    </section>
  )
}
