import { createClient } from '@/lib/supabase/server'
import PerangkatManager from './PerangkatManager'
import StrukturModeCard from './StrukturModeCard'

export default async function AdminPerangkatPage() {
  const supabase = await createClient()

  const [{ data: perangkat }, { data: struktur }] = await Promise.all([
    supabase.from('perangkat_desa').select('*').order('urutan', { ascending: true }),
    supabase.from('struktur_desa').select('*').eq('id', 1).single(),
  ])

  return (
    <main className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Perangkat Desa</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola tampilan halaman Struktur di website publik</p>
      </div>

      <div className="mb-10">
        <StrukturModeCard
          initialMode={(struktur?.mode as 'manual' | 'gambar') || 'manual'}
          initialGambarUrl={struktur?.gambar_url || null}
        />
      </div>

      <PerangkatManager initialList={perangkat || []} />
    </main>
  )
}