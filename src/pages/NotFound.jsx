import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap'

export default function NotFound() {
  return (
    <PageWrap>
      <section className="wrap flex min-h-screen flex-col items-center justify-center text-center">
        <p className="gt font-display text-9xl font-bold">404</p>
        <p className="mt-4 text-xl text-mu">This page took a wrong turn.</p>
        <Link to="/" className="btn mt-8">Back to home</Link>
      </section>
    </PageWrap>
  )
}
