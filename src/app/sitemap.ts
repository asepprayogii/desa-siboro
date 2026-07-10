import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://desa-siboro.vercel.app'
  const supabase = await createClient()

  const { data: berita } = await supabase
    .from('berita')
    .select('slug, created_at')
    .eq('published', true)

  const beritaUrls = (berita || []).map((b) => ({
    url: `${baseUrl}/berita/${b.slug}`,
    lastModified: new Date(b.created_at),
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/profil`, lastModified: new Date() },
    { url: `${baseUrl}/struktur`, lastModified: new Date() },
    { url: `${baseUrl}/berita`, lastModified: new Date() },
    { url: `${baseUrl}/galeri`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
    ...beritaUrls,
  ]
}