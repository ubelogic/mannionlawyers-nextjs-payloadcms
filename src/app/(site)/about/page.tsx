import Link from 'next/link'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import { isTeamMember } from '@/types'
import type { AboutPageGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'
import { VideoFacade } from '@/components/VideoFacade'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const about = (await payload.findGlobal({ slug: 'about-page' })) as unknown as AboutPageGlobal
  return {
    title: about.metaTitle,
    description: about.metaDescription,
  }
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const about = (await payload.findGlobal({
    slug: 'about-page',
    depth: 2, // resolve the `principal` relationship + their photo
  })) as unknown as AboutPageGlobal

  const principal = isTeamMember(about.principal) ? about.principal : null

  const beforeSections = about.sections.filter((s) => s.placement === 'beforePrincipal')
  const afterSections = about.sections.filter((s) => s.placement === 'afterPrincipal')

  return (
    <main id="main">
      <RevealInit />

      {/* ===================== Hero ===================== */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1>
            {about.headingPlain}
            <br />
            We do <em className="accent">{about.headingAccent}</em>.
          </h1>
          <p className="lede">{about.lede}</p>
        </div>
      </section>

      {/* ===================== Sections before the principal bio ===================== */}
      {beforeSections.map((section) => (
        <section
          className={`section${section.background === 'alt' ? ' section-alt' : ''}`}
          key={section.heading}
        >
          <div className="container prose reveal">
            <h2>{section.heading}</h2>
            <RichText data={section.body as never} disableContainer />
          </div>
        </section>
      ))}

      {/* ===================== Principal bio ===================== */}
      {principal && (
        <>
          <section className="section section-alt">
            <div className="container prose reveal">
              <p className="eyebrow">{about.principalEyebrow}</p>
              <h2>{principal.name}</h2>
              <RichText data={principal.bio as never} disableContainer />
            </div>
          </section>

          {about.showPrincipalVideo && principal.videoEmbedUrl && (
            <section className="section video-section">
              <div className="container">
                <div
  className="reveal"
  style={{ position: "relative", paddingTop: "56.25%" }}
>
  <iframe
    src={principal.videoEmbedUrl}
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
    title="A message from Paul Mannion"
  />
</div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ===================== Sections after the principal bio ===================== */}
      {afterSections.map((section) => (
        <section
          className={`section${section.background === 'alt' ? ' section-alt' : ''}`}
          key={section.heading}
        >
          <div className="container prose reveal">
            <h2>{section.heading}</h2>
            <RichText data={section.body as never} disableContainer />
          </div>
        </section>
      ))}

      {/* ===================== Final CTA ===================== */}
      <section className="section cta-band">
        <div className="container">
          <h2>{about.ctaHeading}</h2>
          <p className="lede">{about.ctaLede}</p>
          <Link className="btn btn-primary" href={about.ctaButtonHref}>
            {about.ctaButtonLabel}
          </Link>
        </div>
      </section>
    </main>
  )
}
