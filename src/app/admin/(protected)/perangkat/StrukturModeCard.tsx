'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'
import FileDropInput from '@/components/FileDropInput'

interface StrukturModeCardProps {
  initialMode: 'manual' | 'gambar'
  initialGambarUrl: string | null
}

export default function StrukturModeCard({ initialMode, initialGambarUrl }: StrukturModeCardProps) {
  const [mode, setMode] = useState<'manual' | 'gambar'>(initialMode)
  const [file, setFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function handleFileSelect(selected: File | null) {
    if (!selected) {
      setFile(null)
      return
    }
    setCompressing(true)
    try {
      const compressed = await imageCompression(selected, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })
      setFile(compressed)
    } catch {
      alert('Gagal memproses gambar. Coba pilih file gambar lain.')
      setFile(null)
    }
    setCompressing(false)
  }

  async function handleSave() {
    setLoading(true)
    setSuccess(false)

    let gambar_url = initialGambarUrl

    if (mode === 'gambar' && file) {
      const fileName = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('desa-images').upload(fileName, file)
      if (uploadError) {
        alert('Upload gagal: ' + uploadError.message)
        setLoading(false)
        return
      }
      const { data: urlData } = supabase.storage.from('desa-images').getPublicUrl(fileName)
      gambar_url = urlData.publicUrl
    }

    if (mode === 'gambar' && !gambar_url) {
      alert('Silakan upload gambar struktur terlebih dahulu.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('struktur_desa')
      .update({ mode, gambar_url })
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
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <h2 className="font-semibold text-gray-900 mb-1">Tampilan Halaman Struktur</h2>
      <p className="text-sm text-gray-500 mb-5">
        Pilih cara menampilkan struktur perangkat desa di website publik.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`text-left border rounded-xl p-4 transition-colors ${
            mode === 'manual' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="font-medium text-sm text-gray-900 mb-1">Input Satu per Satu</p>
          <p className="text-xs text-gray-500">Tulis nama, jabatan, dan foto tiap perangkat secara manual (tampilan seperti sekarang).</p>
        </button>

        <button
          type="button"
          onClick={() => setMode('gambar')}
          className={`text-left border rounded-xl p-4 transition-colors ${
            mode === 'gambar' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="font-medium text-sm text-gray-900 mb-1">Upload Gambar Struktur</p>
          <p className="text-xs text-gray-500">Unggah 1 gambar bagan struktur organisasi yang sudah jadi, langsung ditampilkan utuh.</p>
        </button>
      </div>

      {mode === 'gambar' && (
        <div className="mb-5">
          <FileDropInput
            id="struktur-gambar"
            accept="image/*"
            onFileSelect={handleFileSelect}
            previewUrl={initialGambarUrl}
            helperText="Gambar bagan struktur organisasi, PNG atau JPG"
          />
          {compressing && <p className="text-xs text-gray-500 mt-1.5">Mengompres gambar...</p>}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={loading || compressing}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
        {success && <span className="text-green-600 text-sm">Tersimpan!</span>}
      </div>
    </div>
  )
}