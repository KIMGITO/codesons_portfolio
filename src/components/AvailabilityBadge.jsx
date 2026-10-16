import { cfg } from '../config'

export default function AvailabilityBadge({ className = '' }) {
  const { status, text } = cfg.availability
  if (!text) return null
  const open = status === 'open'
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-1.5 text-xs font-medium text-white backdrop-blur ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${open ? 'bg-a3' : 'bg-a2'}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? 'bg-a3' : 'bg-a2'}`} />
      </span>
      {text}
    </span>
  )
}
