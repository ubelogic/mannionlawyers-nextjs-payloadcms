'use client'

import { useState } from 'react'

export function VideoFacade({ src, caption }: { src: string; caption?: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="video-facade" data-video-src={src}>
      {loaded ? (
        <iframe
          src={src}
          title="A message from Mannion Lawyers"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
      ) : (
        <button
          className="video-play"
          aria-label="Play video"
          onClick={() => setLoaded(true)}
        >
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L20.5 13L1 24.5V1.5Z" fill="currentColor" />
          </svg>
        </button>
      )}
      {!loaded && caption && <p className="video-caption">{caption}</p>}
    </div>
  )
}
