import { createClient } from '@/lib/supabase/server'
import FormKontak from './FormKontak'

export default async function AdminKontakPage() {
  const supabase = await createClient()

  const { data: kontak } = await supabase
    .from('kontak_desa')
    .select('*')
    .eq('id', 1)
    .single()

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Kontak</h1>
      <FormKontak initialData={kontak || { alamat: '', telepon: '', latitude: null, longitude: null }} />
    </main>
  )
}