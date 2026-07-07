import Link from 'next/link'
import type { FooterGlobal } from '@/types'

export function SiteFooter({ footer }: { footer: FooterGlobal }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">{footer.brandName}</p>
            <p>
              {footer.brandTagline.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <div>
            <h4>Firm</h4>
            <ul>
              {footer.firmLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {footer.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Offices</h4>
            <ul>
              {footer.officeLinks.map((office) => (
                <li key={office.label}>
                  {office.label}{' '}
                  <a href={`tel:${office.phoneHref}`}>{office.phoneDisplay}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>{footer.copyrightText}</p>
          <p>
            <Link href="/privacy">Privacy policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
