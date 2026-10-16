import { cases } from '../data/cases'
import { useT } from '../i18n'
import PageWrap from '../components/PageWrap'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import CtaBand from '../components/CtaBand'

export default function Work() {
  const t = useT()
  return (
    <PageWrap>
      <PageHeader eyebrow={t('work')} title={<>Selected <span className="gt">work</span></>} text="Real products, with the problem, the solution and the result." />
      <section className="wrap pb-20">
        <div className="space-y-6">
          {cases.length > 0 && (
            <Reveal>
              <ProjectCard project={cases[0]} variant="overlay" />
            </Reveal>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {cases.slice(1).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.12}>
                <ProjectCard project={p} variant="standard" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Want something like this?" />
    </PageWrap>
  )
}
