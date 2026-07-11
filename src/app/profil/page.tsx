import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Desa Siboro - Sejarah, Visi & Misi',
  description: 'Profil lengkap Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir: sejarah, visi, misi, dan deskripsi desa.',
}

export default async function ProfilPage() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .single()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Profil Desa Siboro</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sejarah</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {profil?.sejarah || 'Belum ada data.'}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Visi</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {profil?.visi || 'Belum ada data.'}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Misi</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {profil?.misi || 'Belum ada data.'}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Deskripsi Umum</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {profil?.deskripsi || 'Belum ada data.'}
        </p>
      </section>
    </main>
  )
}