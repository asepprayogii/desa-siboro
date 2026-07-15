'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface FormProfilProps {
  initialData: {
    sejarah: string | null
    visi: string | null
    misi: string | null
    deskripsi: string | null
    sambutan_kades: string | null
  }
}

export default function FormProfil({ initialData }: FormProfilProps) {
  const [sejarah, setSejarah] = useState(initialData.sejarah || '')
  const [visi, setVisi] = useState(initialData.visi || '')
  const [misi, setMisi] = useState(initialData.misi || '')
  const [deskripsi, setDeskripsi] = useState(initialData.deskripsi || '')
  const [sambutanKades, setSambutanKades] = useState(initialData.sambutan_kades || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await supabase
      .from('profil_desa')
      .update({
        sejarah,
        visi,
        misi,
        deskripsi,
        sambutan_kades: sambutanKades,
      })
      .eq('id', 1)

    if (error) {
      alert('Gagal simpan: ' + error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setSuccess(true)
    router.refresh()

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi Singkat (tampil di Beranda)</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sejarah</label>
        <textarea
          value={sejarah}
          onChange={(e) => setSejarah(e.target.value)}
          rows={6}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Visi</label>
        <textarea
          value={visi}
          onChange={(e) => setVisi(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Misi</label>
        <textarea
          value={misi}
          onChange={(e) => setMisi(e.target.value)}
          rows={4}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Sambutan Kepala Desa <span className="text-gray-400">(tampil di Beranda, kosongkan jika belum ada)</span>
        </label>
        <textarea
          value={sambutanKades}
          onChange={(e) => setSambutanKades(e.target.value)}
          rows={5}
          placeholder="Tulis kata sambutan dari Kepala Desa di sini..."
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        {success && <span className="text-green-600 text-sm">Tersimpan!</span>}
      </div>
    </form>
  )
}