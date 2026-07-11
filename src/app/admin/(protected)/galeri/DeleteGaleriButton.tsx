'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteGaleriButton({ id }: { id: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    if (!confirm('Yakin hapus foto ini?')) return

    const { error } = await supabase.from('galeri').delete().eq('id', id)

    if (error) {
      alert('Gagal hapus: ' + error.message)
      return
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md"
    >
      Hapus
    </button>
  )
}