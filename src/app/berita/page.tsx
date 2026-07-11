import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BeritaCard from '@/components/BeritaCard'

export const metadata: Metadata = {
  title: 'Berita Desa Siboro - Kabar Terkini',
  description: 'Kumpulan berita dan informasi terbaru seputar kegiatan Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir.',
}

export default async function BeritaPage() {
  const supabase = await createClient()

  const { data: berita } = await supabase
    .from('berita')
    .select('judul, slug, gambar_url, kategori, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Semua Berita</h1>

      {berita && berita.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {berita.map((b) => (
            <BeritaCard key={b.slug} {...b} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Belum ada berita.</p>
      )}
    </main>
  )
}