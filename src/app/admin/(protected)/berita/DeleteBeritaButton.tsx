'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteBeritaButton({ id }: { id: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    if (!confirm('Yakin hapus berita ini?')) return

    const { error } = await supabase.from('berita').delete().eq('id', id)

    if (error) {
      alert('Gagal hapus: ' + error.message)
      return
    }

    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="text-red-600 font-medium hover:text-red-700">
      Hapus
    </button>
  )
}