'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getVideoType, getVideoEmbedUrl, getVideoThumbnail } from '@/lib/video'

interface GaleriItem {
  id: string
  gambar_url: string | null
  keterangan: string | null
  video_url?: string | null
  video_file_url?: string | null
}

function ThumbnailWithFallback({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={() => setFailed(true)} />
}

export default function GaleriGrid({ items }: { items: GaleriItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(() => setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)), [items.length])
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % items.length)), [items.length])

  useEffect(() => {
    if (activeIndex === null) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [activeIndex, close, prev, next])

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX)
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX === null) return
    const diff = e.changedTouches[0].clientX - touchStartX
    if (diff > 50) prev()
    else if (diff < -50) next()
    setTouchStartX(null)
  }

  const active = activeIndex !== null ? items[activeIndex] : null
  const activeIsVideo = active ? !!(active.video_url || active.video_file_url) : false
  const activeEmbed = active?.video_url ? getVideoEmbedUrl(active.video_url) : null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((g, idx) => {
          const isVideo = !!(g.video_url || g.video_file_url)
          const thumb = g.video_url ? getVideoThumbnail(g.video_url) : null

          return (
            <button
              key={g.id}
              onClick={() => setActiveIndex(idx)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              {!isVideo && g.gambar_url && (
                <Image
                  src={g.gambar_url}
                  alt={g.keterangan || 'Galeri Desa Siboro'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {isVideo && thumb && <ThumbnailWithFallback src={thumb} alt={g.keterangan || 'Video Desa Siboro'} />}

              {isVideo && !thumb && g.video_file_url && (
                <video src={g.video_file_url} muted preload="metadata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              )}

              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-blue-700 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {g.keterangan && !isVideo && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium leading-snug text-left">{g.keterangan}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-2 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" aria-label="Sebelumnya">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-2 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" aria-label="Selanjutnya">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="relative w-full h-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            {!activeIsVideo && active.gambar_url && (
              <Image src={active.gambar_url} alt={active.keterangan || 'Galeri Desa Siboro'} fill className="object-contain" />
            )}

            {activeIsVideo && activeEmbed && (
              <iframe src={activeEmbed} className="w-full h-full rounded-lg" allow="autoplay; encrypted-media" allowFullScreen />
            )}

            {activeIsVideo && !activeEmbed && active.video_file_url && (
              <video src={active.video_file_url} controls autoPlay className="w-full h-full object-contain rounded-lg" />
            )}
          </div>

          {active.keterangan && (
            <p className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-4 py-2 rounded-full max-w-lg text-center">
              {active.keterangan}
            </p>
          )}
        </div>
      )}
    </>
  )
}