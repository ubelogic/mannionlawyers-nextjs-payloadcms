'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { HeaderGlobal } from '@/types'
import { isMedia } from '@/types'

export function SiteHeader({ header }: { header: HeaderGlobal }) {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const megaRef = useRef<HTMLLIElement>(null)
  const dropRef = useRef<HTMLLIElement>(null)
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const dropCloseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Close menus on outside click / Escape, matching the original main.js behaviour.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false)
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setDropOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const logo = isMedia(header.logo) ? header.logo : null

  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/">
          {logo?.url ? (
            <Image src={logo.url} alt={logo.alt} width={160} height={44} className="brand-logo" priority />
          ) : (
            'Mannion Lawyers'
          )}
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          {navOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="site-nav" className={`primary-nav${navOpen ? ' open' : ''}`} aria-label="Main">
          <ul>
            {header.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}

            <li
              className={`has-mega${megaOpen ? ' open' : ''}`}
              ref={megaRef}
              onMouseEnter={() => {
                if (window.matchMedia('(min-width: 801px) and (hover: hover)').matches) {
                  clearTimeout(megaCloseTimer.current)
                  setMegaOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia('(min-width: 801px) and (hover: hover)').matches) {
                  megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 160)
                }
              }}
            >
              <Link href="/services">Services</Link>
              <button
                className="mega-toggle"
                aria-expanded={megaOpen}
                aria-controls="mega-services"
                aria-label="Open services menu"
                onClick={() => setMegaOpen((v) => !v)}
              >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                  <path
                    d="M1 1.5 L6 6.5 L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="mega-panel" id="mega-services" aria-label="Practice areas">
                <div className="container mega-grid">
                  <div className="mega-links">
                    <Link className="mega-item" href="/parenting-disputes">
                      <strong>Parenting disputes</strong>
                      <span>Real, enforceable time with your kids</span>
                    </Link>
                    <Link className="mega-item" href="/separation-divorce">
                      <strong>Separation &amp; divorce</strong>
                      <span>Advice before early decisions cost you</span>
                    </Link>
                    <Link className="mega-item" href="/recovery-relocation-orders">
                      <strong>Recovery &amp; relocation</strong>
                      <span>Urgent action when a child is taken or moved</span>
                    </Link>
                    <Link className="mega-item" href="/child-support">
                      <strong>Child support</strong>
                      <span>Assessments and agreements that are fair</span>
                    </Link>
                    <Link className="mega-item" href="/property-settlement">
                      <strong>Property settlement</strong>
                      <span>Protecting what you&apos;ve built</span>
                    </Link>
                    <Link className="mega-item" href="/consent-orders-agreements">
                      <strong>Consent orders &amp; BFAs</strong>
                      <span>Make the agreement enforceable</span>
                    </Link>
                    <Link className="mega-all" href="/services">
                      View all services &rarr;
                    </Link>
                  </div>
                  <div className="mega-aside">
                    <p className="eyebrow">{header.megaMenuEyebrow}</p>
                    <p>{header.megaMenuText}</p>
                    <Link className="btn btn-primary" href={header.megaMenuCtaHref}>
                      {header.megaMenuCtaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li
              className={`has-dropdown${dropOpen ? ' open' : ''}`}
              ref={dropRef}
              onMouseEnter={() => {
                if (window.matchMedia('(min-width: 801px) and (hover: hover)').matches) {
                  clearTimeout(dropCloseTimer.current)
                  setDropOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia('(min-width: 801px) and (hover: hover)').matches) {
                  dropCloseTimer.current = setTimeout(() => setDropOpen(false), 160)
                }
              }}
            >
              <Link href="/resources">Resources</Link>
              <button
                className="dropdown-toggle"
                aria-expanded={dropOpen}
                aria-controls="dropdown-resources"
                aria-label="Open resources menu"
                onClick={() => setDropOpen((v) => !v)}
              >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                  <path
                    d="M1 1.5 L6 6.5 L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown" id="dropdown-resources">
                {header.resourcesLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {header.trailingLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta-wrap">
          <Link className="btn btn-primary nav-cta" href={header.navCtaHref}>
            {header.navCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}
