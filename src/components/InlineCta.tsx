import Link from 'next/link'
import type { ResourceCta } from '@/types'

export function InlineCta({ cta, variant = 'default' }: { cta: ResourceCta; variant?: 'default' | 'final' }) {
  if (!cta.buttonLabel || !cta.buttonHref) return null

  if (variant === 'final') {
    return (
      <div className="article-cta article-cta--final">
        {cta.heading && <h3>{cta.heading}</h3>}
        {cta.text && <p>{cta.text}</p>}
        <Link className="btn btn-primary" href={cta.buttonHref}>
          {cta.buttonLabel}
        </Link>
      </div>
    )
  }

  return (
    <div className="article-cta">
      <div>
        {cta.heading && <strong>{cta.heading}</strong>}
        {cta.text && <p>{cta.text}</p>}
      </div>
      <Link className="btn btn-primary" href={cta.buttonHref}>
        {cta.buttonLabel}
      </Link>
    </div>
  )
}
