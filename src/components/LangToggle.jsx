import { useStore } from '../store/useStore'

export default function LangToggle() {
  const { lang, setLang } = useStore()
  return (
    <div className="glass flex h-10 items-center !rounded-full p-1 text-xs font-bold" role="group" aria-label="Language">
      {['en', 'sw'].map((l) => (
        <button key={l} onClick={() => setLang(l)} className={`rounded-full px-2.5 py-1.5 uppercase transition ${lang === l ? 'bg-gradient-to-r from-a1 to-ge text-on' : 'text-mu hover:text-tx'}`}>{l}</button>
      ))}
    </div>
  )
}
