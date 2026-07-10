import { createClient } from '@/lib/supabase/server'
import BeritaCard from '@/components/BeritaCard'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const { data: beritaTerbaru } = await supabase
    .from('berita')
    .select('judul, slug, gambar_url, kategori, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('deskripsi')
    .single()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Selamat Datang di Desa Siboro</h1>
        <p className="mt-3 text-blue-100">Kecamatan Sianjur Simula, Kabupaten Samosir</p>
      </section>

      {/* Deskripsi Singkat */}
      {profil?.deskripsi && (
        <section className="max-w-3xl mx-auto px-4 py-10 text-center">
          <p className="text-gray-700">{profil.deskripsi}</p>
        </section>
      )}

      {/* Berita Terbaru */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Berita Terbaru</h2>
          <Link href="/berita" className="text-blue-600 text-sm font-medium">
            Lihat Semua →
          </Link>
        </div>

        {beritaTerbaru && beritaTerbaru.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaTerbaru.map((b) => (
              <BeritaCard key={b.slug} {...b} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Belum ada berita yang dipublikasikan.</p>
        )}
      </section>
    </main>
  )
}