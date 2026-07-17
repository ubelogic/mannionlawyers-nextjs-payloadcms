import Link from 'next/link'

export const metadata = {
  title: 'Thank You | Mannion Lawyers',
  description: "We've received your consultation request.",
}

export default function ThankYouPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Request received</p>
          <h1>We got it.</h1>
          <p className="lede">
            We&apos;ll call you back within one business day. If your matter is urgent, please call us directly
            rather than wait.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '1.6rem' }}>
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
            <a className="btn btn-secondary" href="tel:+61247049977">
              Call (02) 4704 9977
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
