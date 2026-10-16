import { Link } from 'react-router-dom'
import { cfg, socials } from '../config'
import { useT } from '../i18n'
import AvailabilityBadge from './AvailabilityBadge'

export default function Footer() {
  const t = useT()
  const links = [['/about', 'about'], ['/company', 'company'], ['/work', 'work'], ['/pricing', 'pricing'], ['/blog', 'blog'], ['/philosophy', 'philosophy'], ['/stories', 'stories'], ['/gallery', 'gallery'], ['/contact', 'contact']]
  return (
    <footer className="border-t border-tx/10 bg-bg2/50">
      <div className="wrap grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold gt">{cfg.brand}</p>
          <p className="mt-3 text-sm text-mu">{cfg.tagline}</p>
          <AvailabilityBadge className="mt-4 !border-tx/20 !bg-tx/5 !text-tx" />
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">{t('explore')}</p>
          <div className="grid grid-cols-2 gap-2 text-mu">
            {links.map(([to, k]) => <Link key={to} to={to} className="hover:text-tx">{t(k)}</Link>)}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t('findMe')}</p>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ name, href, Icon, g }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" title={name} aria-label={name} className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:-translate-y-1" style={{ background: g }}><Icon /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-tx/10 py-5 text-center text-xs text-mu flex flex-wrap items-center justify-center gap-3">
        <span>© {new Date().getFullYear()} {cfg.brand} · Designed & built by {cfg.name}</span>
        <span>·</span>
        <Link to="/terms" className="text-sm text-mu hover:text-a2 transition">Terms & Conditions</Link>
      </div>
    </footer>
  )
}
