import { createClient } from '@/lib/supabase/server'
import FormProfil from './FormProfil'

export default async function AdminProfilPage() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .eq('id', 1)
    .single()

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profil Desa</h1>
      <FormProfil
        initialData={
          profil || {
            sejarah: '',
            visi: '',
            misi: '',
            deskripsi: '',
            sambutan_kades: '',
          }
        }
      />
    </main>
  )
}