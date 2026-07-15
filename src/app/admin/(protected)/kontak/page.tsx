import { createClient } from '@/lib/supabase/server'
import FormKontak from './FormKontak'

export default async function AdminKontakPage() {
  const supabase = await createClient()

  const { data: kontak } = await supabase.from('kontak_desa').select('*').eq('id', 1).single()

  return (
    <main className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Kontak</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola informasi kontak yang tampil di Footer</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-lg">
        <FormKontak initialData={kontak || { alamat: '', telepon: '' }} />
      </div>
    </main>
  )
}