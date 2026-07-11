import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import UploadGaleriForm from './UploadGaleriForm'
import DeleteGaleriButton from './DeleteGaleriButton'

export default async function AdminGaleriPage() {
  const supabase = await createClient()

  const { data: galeri } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Kelola Galeri</h1>

      <UploadGaleriForm />

      <h2 className="font-semibold mb-3">Foto Tersimpan ({galeri?.length ?? 0})</h2>

      {galeri && galeri.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((g) => (
            <div key={g.id} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image src={g.gambar_url} alt={g.keterangan || 'Galeri'} fill className="object-cover" />
              <DeleteGaleriButton id={g.id} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Belum ada foto.</p>
      )}
    </main>
  )
}