import { createClient } from '@/lib/supabase/server'
import PerangkatManager from './PerangkatManager'

export default async function AdminPerangkatPage() {
  const supabase = await createClient()

  const { data: perangkat } = await supabase
    .from('perangkat_desa')
    .select('*')
    .order('urutan', { ascending: true })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Kelola Perangkat Desa</h1>
      <PerangkatManager initialList={perangkat || []} />
    </main>
  )
}