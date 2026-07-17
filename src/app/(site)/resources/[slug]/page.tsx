import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import { isTeamMember } from '@/types'
import type { SiteSettingsGlobal } from '@/types'
import { RevealInit } from '@/components/RevealInit'
import { ArticleSidebar } from '@/components/ArticleSidebar'
import { InlineCta } from '@/components/InlineCta'
import { slugify } from '@/lib/slugify'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

async function getResource(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'resources',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const resource = await getResource(slug)
  if (!resource) return {}
  return {
    title: resource.metaTitle || resource.title,
    description: resource.metaDescription || resource.excerpt,
  }
}

export default async function ResourceArticlePage({ params }: Args) {
  const { slug } = await params
  const resource = await getResource(slug)
  if (!resource) notFound()

  const payload = await getPayloadClient()
  const siteSettings = (await payload.findGlobal({ slug: 'site-settings' })) as unknown as SiteSettingsGlobal

  const author = isTeamMember(resource.articleAuthor) ? resource.articleAuthor : null
  const sections = resource.sections || []

  const sectionsWithIds = sections.map((section) => ({
    ...section,
    resolvedId: section.anchorId || slugify(section.heading),
  }))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: '/resources' },
      { '@type': 'ListItem', position: 3, name: resource.title, item: `/resources/${resource.slug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.metaDescription || resource.excerpt,
    ...(author && { author: { '@type': 'Person', name: author.name } }),
    publisher: { '@type': 'Organization', name: 'Mannion Lawyers' },
    ...(resource.datePublished && { datePublished: resource.datePublished }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main id="main">
        <RevealInit />

        {/* ===================== Hero ===================== */}
        <section className="page-hero page-hero--article">
          <div className="container">
            <p className="eyebrow">
              <Link href="/resources">Resources</Link>
              {resource.eyebrow ? ` \u203a ${resource.eyebrow}` : ''}
            </p>
            <h1>{resource.title}</h1>
            <p className="lede">{resource.heroLede || resource.excerpt}</p>
            {(author || resource.updatedLabel || resource.readTime) && (
              <p className="article-meta">
                {author && <>By {author.name}</>}
                {author && (resource.updatedLabel || resource.readTime) && ' \u00b7 '}
                {resource.updatedLabel}
                {resource.updatedLabel && resource.readTime && ' \u00b7 '}
                {resource.readTime}
              </p>
            )}
          </div>
        </section>

        <div className="container article-layout">
          <article className="article-body">
            {sectionsWithIds.length > 1 && (
              <div className="article-toc">
                <p className="eyebrow">In this guide</p>
                <ol>
                  {sectionsWithIds.map((section) => (
                    <li key={section.resolvedId}>
                      <a href={`#${section.resolvedId}`}>{section.heading}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {sectionsWithIds.map((section) => (
              <div key={section.resolvedId}>
                <h2 id={section.resolvedId}>{section.heading}</h2>
                <RichText data={section.body as never} disableContainer />
                {section.cta?.buttonLabel && <InlineCta cta={section.cta} />}
              </div>
            ))}

            {resource.finalCta?.buttonLabel && <InlineCta cta={resource.finalCta} variant="final" />}

            {resource.relatedItems && resource.relatedItems.length > 0 && (
              <div className="article-related">
                <h3>Related guides &amp; services</h3>
                <div className="related-grid">
                  {resource.relatedItems.map((item) => (
                    <Link className="related-item" href={item.href} key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <ArticleSidebar siteSettings={siteSettings} author={author} />
        </div>
      </main>
    </>
  )
}
