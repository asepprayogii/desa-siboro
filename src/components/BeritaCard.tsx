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
    <div className="flex flex-col md:flex-row min-h-[70vh]">
      {/* Sidebar */}
      <aside className="md:w-72 bg-blue-800 text-white px-6 py-12 flex-shrink-0">
        <div className="sticky top-24">
          <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl mb-4">
            📰
          </div>
          <h1 className="text-2xl font-bold mb-2">Berita Desa</h1>
          <p className="text-blue-200 text-sm leading-relaxed">
            Informasi dan berita terbaru dari Desa Siboro
          </p>
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 max-w-6xl px-4 py-12">
        {berita && berita.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.map((b) => (
              <BeritaCard key={b.slug} {...b} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">Belum ada berita.</p>
        )}
      </main>
    </div>
  )
}