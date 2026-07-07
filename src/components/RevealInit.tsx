'use client'

import { useEffect } from 'react'

/**
 * Replicates the scroll-reveal behaviour from the original main.js:
 * elements with class "reveal" fade/slide in once they enter the viewport.
 * Respects prefers-reduced-motion. Mount this once per page.
 */
export function RevealInit() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = document.querySelectorAll('.reveal')

    if (!prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              io.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 },
      )
      items.forEach((el) => io.observe(el))
      return () => io.disconnect()
    }

    items.forEach((el) => el.classList.add('in'))
  }, [])

  return null
}
