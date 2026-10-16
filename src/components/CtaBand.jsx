import { Link } from 'react-router-dom'
import { FaArrowRight, FaCalendarCheck } from 'react-icons/fa6'
import { cfg } from '../config'
import { useT } from '../i18n'
import Reveal from './Reveal'

export default function CtaBand({ title, text }) {
  const t = useT()
  return (
    <section className="wrap section !pt-0">
      <Reveal dir="zoom">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-a1 via-a2 to-a3 p-10 text-center text-white md:p-16">
          <div className="blob -left-10 -top-16 h-60 w-60 bg-white !opacity-25" />
          <h2 className="relative text-3xl font-bold md:text-5xl">{title || t('ctaTitle')}</h2>
          <p className="relative mt-3 text-white/85">{text || t('ctaText')}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing#quote" className="btn-ghost !border-white !text-white hover:!bg-white/20">{t('getQuote')} <FaArrowRight /></Link>
            {cfg.bookingUrl && <a href={cfg.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !border-white/60 !text-white hover:!bg-white/20"><FaCalendarCheck /> {t('bookCall')}</a>}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
