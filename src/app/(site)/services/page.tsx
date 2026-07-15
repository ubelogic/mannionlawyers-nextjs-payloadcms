import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { isService } from '@/types'
import type { ServicesPageGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'services-page' })) as unknown as ServicesPageGlobal
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()

  const [page, servicesRes] = await Promise.all([
    payload.findGlobal({ slug: 'services-page', depth: 1 }) as unknown as Promise<ServicesPageGlobal>,
    payload.find({ collection: 'services', sort: 'order', limit: 50 }),
  ])

  const services = servicesRes.docs
  const urgentService = isService(page.urgentServiceSlug) ? page.urgentServiceSlug : null

  return (
    <main id="main">
      <RevealInit />

      {/* ===================== Hero ===================== */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>
            {page.headingPlain}
            <br />
            <em className="accent">{page.headingAccent}</em> {page.headingSuffix}
          </h1>
          <p className="lede">
            {page.ledeText}{' '}
            {urgentService && (
              <>
                skip straight to{' '}
                <Link href={`/${urgentService.slug}`}>recovery and relocation orders</Link> or{' '}
              </>
            )}
            <Link href="/contact">contact us now</Link>.
          </p>
        </div>
      </section>

      {/* ===================== Service blocks ===================== */}
      <div className="container">
        {services.map((service) => (
          <section
            className="service-block reveal"
            id={service.anchorId || service.slug}
            aria-labelledby={`h-${service.slug}`}
            key={service.id}
          >
            <div>
              {service.eyebrow && <p className="eyebrow">{service.eyebrow}</p>}
              <h2 id={`h-${service.slug}`}>{service.title}</h2>
            </div>
            <div className="prose">
              {service.answerFirst && <p className="answer-first">{service.answerFirst}</p>}
              {service.detail && <p>{service.detail}</p>}
              <p>
                {service.ctaLabel && (
                  <Link className="btn btn-primary" href="/contact">
                    {service.ctaLabel}
                  </Link>
                )}{' '}
                <Link className="btn btn-secondary" href={`/${service.slug}`}>
                  Read the full guide
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* ===================== Final CTA ===================== */}
      <section className="section cta-band">
        <div className="container">
          <h2>{page.ctaHeading}</h2>
          <p className="lede">{page.ctaLede}</p>
          <Link className="btn btn-primary" href={page.ctaButtonHref}>
            {page.ctaButtonLabel}
          </Link>
        </div>
      </section>
    </main>
  )
}
