import { cfg } from '../config'
import { useT } from '../i18n'

export default function ClientsStrip() {
  const t = useT()
  if (!cfg.clients.length) return null
  const items = [...cfg.clients, ...cfg.clients, ...cfg.clients, ...cfg.clients]
  return (
    <section className="py-14">
      <p className="eyebrow mb-6 text-center text-mu">{t('clients')}</p>
      <div className="overflow-hidden">
        <div className="marquee !gap-12">
          {items.map((c, i) => c.logo
            ? <img key={i} src={c.logo} alt={c.name} loading="lazy" className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
            : <span key={i} className="whitespace-nowrap font-display text-2xl font-bold text-tx/40 transition hover:text-tx">{c.name}</span>)}
        </div>
      </div>
    </section>
  )
}
