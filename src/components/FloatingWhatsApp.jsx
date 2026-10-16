import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { cfg } from '../config'
import { useT } from '../i18n'

/** Always-visible WhatsApp button (hidden if VITE_WHATSAPP is empty) */
export default function FloatingWhatsApp() {
  const t = useT()
  if (!cfg.whatsapp) return null
  const href = `https://wa.me/${cfg.whatsapp}${cfg.waMessage ? `?text=${encodeURIComponent(cfg.waMessage)}` : ''}`
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={t('chatNow')}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring' }} whileHover={{ scale: 1.1 }}
      className="group fixed right-4 z-40 flex items-center gap-3 rounded-full bg-[#25D366] p-4 text-3xl text-white shadow-2xl shadow-black/30"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <FaWhatsapp className="relative" />
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[200px] md:block">{t('chatNow')}</span>
    </motion.a>
  )
}
