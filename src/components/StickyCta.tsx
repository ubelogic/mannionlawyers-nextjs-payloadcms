'use client'

import { useEffect, useState } from 'react'

export function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero, .page-hero')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => setShow(!entries[0].isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`sticky-cta${show ? ' show' : ''}`}>
      <a className="btn btn-primary" href="/contact">
        Book a Consultation
      </a>
    </div>
  )
}
