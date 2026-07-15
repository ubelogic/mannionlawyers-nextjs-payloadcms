import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import { isMedia, isService } from '@/types'
import type { SiteSettingsGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

async function getService(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.summary,
  }
}

export default async function ServiceDetailPage({ params }: Args) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const payload = await getPayloadClient()
  const siteSettings = (await payload.findGlobal({ slug: 'site-settings' })) as unknown as SiteSettingsGlobal

  const related = (service.relatedServices || []).filter(isService)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: '/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `/${service.slug}` },
    ],
  }

  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return (
    <main id="main">
      <RevealInit />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ===================== Hero ===================== */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href="/services" style={{ textDecoration: 'none', color: 'inherit' }}>
              Services
            </Link>{' '}
            / {service.title}
          </p>
          <h1>
            {service.pageHeadingLine2 || service.pageHeadingAccent ? (
              <>
                {service.title}:
                <br />
                {service.pageHeadingLine2}
                {service.pageHeadingAccent && <em className="accent">{service.pageHeadingAccent}</em>}
              </>
            ) : (
              `${service.title}.`
            )}
          </h1>
          {service.pageLede ? (
            <p className="lede">{service.pageLede}</p>
          ) : (
            <p className="lede">{service.summary}</p>
          )}
          <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '1.6rem' }}>
            {service.ctaLabel && (
              <Link className="btn btn-primary" href="/contact">
                {service.ctaLabel}
              </Link>
            )}
            <a className="btn btn-secondary" href={`tel:${siteSettings.mainPhoneHref}`}>
              Call {siteSettings.mainPhoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ===================== Body content ===================== */}
      {service.content && (
        <section className="section" style={{ paddingTop: '1rem' }}>
          <div className="container prose reveal">
            <RichText data={service.content as never} disableContainer />
          </div>
        </section>
      )}

      {/* ===================== FAQ ===================== */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section section-alt" aria-labelledby={`faq-${service.slug}`}>
          <div className="container">
            <div className="section-head reveal">
              <h2 id={`faq-${service.slug}`}>Questions fathers ask us about {service.title.toLowerCase()}</h2>
            </div>
            <div className="faq reveal" style={{ marginInline: 0 }}>
              {service.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== Related services ===================== */}
      {related.length > 0 && (
        <section className="section" aria-labelledby={`related-${service.slug}`}>
          <div className="container">
            <h2 id={`related-${service.slug}`} style={{ fontSize: 'var(--text-xl)' }}>
              Related services
            </h2>
            <div className="card-grid" style={{ marginTop: '1.5rem' }}>
              {related.map((r) => {
                const img = isMedia(r.image) ? r.image : null
                return (
                  <Link className="card reveal" href={`/${r.slug}`} key={r.id}>
                    {img?.url && (
                      <span className="card-img">
                        <Image src={img.url} alt={img.alt} width={500} height={667} />
                      </span>
                    )}
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                    <span className="card-link">Learn more</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================== Final CTA ===================== */}
      <section className="section cta-band">
        <div className="container">
          <h2>{service.finalCtaHeading || 'Ready to talk about your situation?'}</h2>
          <p className="lede">
            {service.finalCtaLede || 'A confidential consultation. No jargon, no judgement, no obligation.'}
          </p>
          <Link className="btn btn-primary" href="/contact">
            Book a Consultation
          </Link>
          {service.showUrgentCallout && (
            <p className="cta-sub">
              Urgent? <a href={`tel:${siteSettings.mainPhoneHref}`}>Call {siteSettings.mainPhoneDisplay}</a> —
              don&apos;t wait for a form response.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
