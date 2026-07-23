export type VideoType = 'youtube' | 'drive' | null

export function getVideoType(url: string): VideoType {
  if (!url) return null
  if (/youtu\.be|youtube\.com/.test(url)) return 'youtube'
  if (/drive\.google\.com/.test(url)) return 'drive'
  return null
}

export function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)
  return match ? match[1] : null
}

export function getDriveId(url: string): string | null {
  // Format: /file/d/FILE_ID/view atau /file/d/FILE_ID/preview
  let match = url.match(/\/file\/d\/([\w-]+)/)
  if (match) return match[1]

  // Format: ?id=FILE_ID atau &id=FILE_ID
  match = url.match(/[?&]id=([\w-]+)/)
  if (match) return match[1]

  return null
}

export function getVideoEmbedUrl(url: string): string | null {
  const type = getVideoType(url)
  if (type === 'youtube') {
    const id = getYoutubeId(url)
    return id ? `https://www.youtube.com/embed/${id}` : null
  }
  if (type === 'drive') {
    const id = getDriveId(url)
    return id ? `https://drive.google.com/file/d/${id}/preview` : null
  }
  return null
}

export function getVideoThumbnail(url: string): string | null {
  const type = getVideoType(url)
  if (type === 'youtube') {
    const id = getYoutubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
  }
  if (type === 'drive') {
    const id = getDriveId(url)
    // Thumbnail publik Drive - tidak selalu tersedia, akan di-fallback via onError
    return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w500` : null
  }
  return null
}