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
      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
      aria-label="Hapus foto"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}