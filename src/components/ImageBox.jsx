import { useState } from 'react'

const FALLBACK = 'linear-gradient(135deg, rgb(var(--a1)), rgb(var(--a2)))'

/** Shows an image if `src` loads, otherwise a gradient. Children render on top. */
export default function ImageBox({ src, alt = '', gradient, className = '', imgClass = '', children }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradient || FALLBACK }}>
      {src && ok && <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setOk(false)} className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} />}
      {children}
    </div>
  )
}
