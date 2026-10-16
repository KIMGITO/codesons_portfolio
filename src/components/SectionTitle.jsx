import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title, sub, center = true }) {
  return (
    <Reveal className={`mb-12 ${center ? 'text-center' : ''}`}>
      <p className="eyebrow gt">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className={`mt-4 max-w-2xl text-mu ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </Reveal>
  )
}
