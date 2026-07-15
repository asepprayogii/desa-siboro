import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import UploadGaleriForm from './UploadGaleriForm'
import DeleteGaleriButton from './DeleteGaleriButton'

export default async function AdminGaleriPage() {
  const supabase = await createClient()

  const { data: galeri } = await supabase.from('galeri').select('*').order('created_at', { ascending: false })

  return (
    <main className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola foto dokumentasi kegiatan desa</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 max-w-md">
        <UploadGaleriForm />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Foto Tersimpan ({galeri?.length ?? 0})
        </h2>
      </div>

      {galeri && galeri.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((g) => (
            <div key={g.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100">
              <Image src={g.gambar_url} alt={g.keterangan || 'Galeri'} fill className="object-cover" />
              <DeleteGaleriButton id={g.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 text-center py-16">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-400">Belum ada foto.</p>
        </div>
      )}
    </main>
  )
}