import Link from 'next/link'
import { SidebarConsultationForm } from './SidebarConsultationForm'
import type { SiteSettingsGlobal, TeamMember } from '@/types'

export function ArticleSidebar({
  siteSettings,
  author,
}: {
  siteSettings: SiteSettingsGlobal
  author?: TeamMember | null
}) {
  return (
    <aside className="article-sidebar">
      <div className="sidebar-card sidebar-cta-card">
        <h2>Book a Consultation</h2>
        <p>Tell us what&apos;s happening. We&apos;ll tell you honestly where you stand.</p>
        <SidebarConsultationForm formAction={siteSettings.consultationFormAction} />
      </div>
      <div className="sidebar-card">
        <p className="eyebrow">Urgent?</p>
        <p>Child taken or withheld? Call rather than wait.</p>
        <a
          className="btn btn-secondary"
          href={`tel:${siteSettings.mainPhoneHref}`}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {siteSettings.mainPhoneDisplay}
        </a>
        <p className="field-hint" style={{ marginTop: '0.6rem' }}>
          Weekdays 8.30am–5.30pm
        </p>
      </div>
      {author && (
        <div className="sidebar-card sidebar-about">
          <p className="eyebrow">Who you&apos;ll work with</p>
          <p>
            <strong>{author.name}</strong>
            {author.shortBio ? ` ${author.shortBio}` : ` — ${author.role}.`}
          </p>
          <Link href="/about">About the firm &rarr;</Link>
        </div>
      )}
    </aside>
  )
}
