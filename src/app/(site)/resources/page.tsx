import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import type { ResourcesPageGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = (await payload.findGlobal({ slug: 'resources-page' })) as unknown as ResourcesPageGlobal
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}

export default async function ResourcesPage() {
  const payload = await getPayloadClient()

  const [page, resourcesRes] = await Promise.all([
    payload.findGlobal({ slug: 'resources-page' }) as unknown as Promise<ResourcesPageGlobal>,
    payload.find({ collection: 'resources', sort: 'order', limit: 50 }),
  ])

  const resources = resourcesRes.docs

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
            <em className="accent">{page.headingAccent}</em>
          </h1>
          <p className="lede">{page.ledeText}</p>
        </div>
      </section>

      {/* ===================== Resource cards ===================== */}
      <section className="section">
        <div className="container">
          <div className="resource-grid">
            {resources.map((resource) => (
              <Link className="resource-card reveal" href={`/resources/${resource.slug}`} key={resource.id}>
                {resource.eyebrow && <p className="eyebrow">{resource.eyebrow}</p>}
                <h2>{resource.title}</h2>
                <p>{resource.excerpt}</p>
                <span className="card-link">Read the guide &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
