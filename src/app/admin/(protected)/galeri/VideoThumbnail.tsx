'use client'

import { useState } from 'react'

export default function VideoThumbnail({
  thumbUrl,
  videoFileUrl,
  alt,
}: {
  thumbUrl: string | null
  videoFileUrl: string | null
  alt: string
}) {
  const [failed, setFailed] = useState(false)

  if (thumbUrl && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={thumbUrl}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    )
  }

  if (videoFileUrl) {
    return <video src={videoFileUrl} muted preload="metadata" className="w-full h-full object-cover" />
  }

  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </div>
  )
}