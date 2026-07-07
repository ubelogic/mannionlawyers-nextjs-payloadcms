import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { isMedia } from '@/types'
import type { HomePageGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'
import { VideoFacade } from '@/components/VideoFacade'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const home = (await payload.findGlobal({ slug: 'home-page' })) as unknown as HomePageGlobal
  return {
    title: home.metaTitle,
    description: home.metaDescription,
  }
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [home, servicesRes, testimonialsRes, faqsRes, officesRes] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }) as unknown as Promise<HomePageGlobal>,
    payload.find({
      collection: 'services',
      where: { showOnHomepage: { equals: true } },
      sort: 'order',
      limit: 12,
    }),
    payload.find({ collection: 'testimonials', sort: 'order', limit: 12 }),
    payload.find({
      collection: 'faqs',
      where: { showOnHomepage: { equals: true } },
      sort: 'order',
      limit: 20,
    }),
    payload.find({ collection: 'offices', sort: 'order', limit: 12 }),
  ])

  const services = servicesRes.docs
  const testimonials = testimonialsRes.docs
  const faqs = faqsRes.docs
  const offices = officesRes.docs

  const heroImage = isMedia(home.heroImage) ? home.heroImage : null
  const aboutImage = isMedia(home.aboutImage) ? home.aboutImage : null

  return (
    <main id="main">
      <RevealInit />

      {/* ===================== Hero ===================== */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-bg">
          {heroImage?.url && (
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover', objectPosition: '70% center' }}
            />
          )}
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              {home.heroHeadingLine1}
              <br />
              <span className="amp">{home.heroHeadingLine2}</span>
            </h1>
            <p className="lede">{home.heroLede}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={home.heroPrimaryCtaHref}>
                {home.heroPrimaryCtaLabel}
              </Link>
              <a className="btn btn-secondary btn-on-image" href={`tel:${home.heroPhoneHref}`}>
                {home.heroPhoneLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="trust-bar">
          <div className="container">
            {home.trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                <strong>
                  {item.stat}{' '}
                  {item.isStarRating && (
                    <span className="stars" aria-hidden="true">
                      ★★★★★
                    </span>
                  )}
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Video ===================== */}
      {home.videoEmbedUrl && (
        <section className="section video-section" aria-labelledby="video-heading">
          <div className="container">
            <div className="section-head center reveal">
              <p className="eyebrow">{home.videoEyebrow}</p>
              <h2 id="video-heading">{home.videoHeading}</h2>
            </div>
            <div
  className="reveal"
  style={{ position: "relative", paddingTop: "56.25%" }}
>
  <iframe
    src={home.videoEmbedUrl}
    loading="lazy"
    style={{
      border: 0,
      position: "absolute",
      top: 0,
      height: "100%",
      width: "100%",
    }}
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
    allowFullScreen
    title="A message from Mannion Lawyers"
  />
</div>
          </div>
        </section>
      )}

      {/* ===================== Services ===================== */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">{home.servicesEyebrow}</p>
            <h2 id="services-heading">{home.servicesHeading}</h2>
            <p className="lede">{home.servicesLede}</p>
          </div>
          <div className="card-grid">
            {services.map((service) => {
              const img = isMedia(service.image) ? service.image : null
              return (
                <Link className="card has-img reveal" href={`/${service.slug}`} key={service.id}>
                  <span className="card-img">
                    {img?.url && (
                      <Image src={img.url} alt={img.alt} width={500} height={667} />
                    )}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span className="card-link">Learn more</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== Process ===================== */}
      <section className="section section-alt" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">{home.processEyebrow}</p>
            <h2 id="process-heading">{home.processHeading}</h2>
            <p className="lede">{home.processLede}</p>
          </div>
          <div className="process reveal">
            <div className="process-thread" aria-hidden="true">
              <svg viewBox="0 0 600 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path className="thread-path" d="M0 12 C 100 0, 200 24, 300 12 S 500 0, 600 12" />
              </svg>
            </div>
            {home.steps.map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-num" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== About teaser ===================== */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container split">
          <div className="split-media reveal">
            {aboutImage?.url && (
              <Image src={aboutImage.url} alt={aboutImage.alt} width={1000} height={500} />
            )}
          </div>
          <div className="section-head reveal" style={{ marginBottom: 0 }}>
            <p className="eyebrow">{home.aboutEyebrow}</p>
            <h2 id="about-heading">{home.aboutHeading}</h2>
            <p className="lede">{home.aboutLede}</p>
            <p>
              <Link className="btn btn-secondary" href={home.aboutCtaHref}>
                {home.aboutCtaLabel}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== Testimonials ===================== */}
      {testimonials.length > 0 && (
        <section className="section section-alt" aria-labelledby="reviews-heading">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">{home.testimonialsEyebrow}</p>
              <h2 id="reviews-heading">{home.testimonialsHeading}</h2>
              <p className="lede">{home.testimonialsLede}</p>
            </div>
            <div className="quote-grid">
              {testimonials.map((t) => (
                <blockquote className="quote reveal" key={t.id}>
                  <h3>&quot;{t.quoteHeading}&quot;</h3>
                  <p>{t.quoteBody}</p>
                  <footer>{t.authorName}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== FAQ ===================== */}
      {faqs.length > 0 && (
        <section className="section" aria-labelledby="faq-heading">
          <div className="container">
            <div className="section-head center reveal">
              <p className="eyebrow">{home.faqEyebrow}</p>
              <h2 id="faq-heading">{home.faqHeading}</h2>
            </div>
            <div className="faq reveal">
              {faqs.map((faq) => (
                <details key={faq.id}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== Locations ===================== */}
      {offices.length > 0 && (
        <section className="section section-alt" aria-labelledby="locations-heading">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">{home.locationsEyebrow}</p>
              <h2 id="locations-heading">{home.locationsHeading}</h2>
              <p className="lede">{home.locationsLede}</p>
            </div>
            <div className="location-grid">
              {offices.map((office) => (
                <address className="location reveal" key={office.id}>
                  <h3>{office.name}</h3>
                  <p>
                    {office.addressLine1}
                    <br />
                    {office.suburbStatePostcode}
                  </p>
                </address>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== Final CTA ===================== */}
      <section className="section cta-band" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">{home.ctaHeading}</h2>
          <p className="lede">{home.ctaLede}</p>
          <Link className="btn btn-primary" href={home.ctaButtonHref}>
            {home.ctaButtonLabel}
          </Link>
          <p className="cta-sub">
            Prefer to talk? <a href={`tel:${home.ctaPhoneHref}`}>{home.ctaPhoneLabel}</a> —{' '}
            {home.ctaSubHours}
          </p>
        </div>
      </section>
    </main>
  )
}
