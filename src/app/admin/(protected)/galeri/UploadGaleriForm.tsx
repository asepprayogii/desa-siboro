'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'
import FileDropInput from '@/components/FileDropInput'
import VideoInput from '@/components/VideoInput'

export default function UploadGaleriForm() {
  const [mode, setMode] = useState<'foto' | 'video'>('foto')

  const [file, setFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)

  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const [keterangan, setKeterangan] = useState('')
  const [loading, setLoading] = useState(false)

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
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      })
      setFile(compressed)
    } catch {
      alert('Gagal memproses gambar. Coba pilih file gambar lain.')
      setFile(null)
    }
    setCompressing(false)
  }

  function resetForm() {
    setFile(null)
    setYoutubeUrl('')
    setVideoFile(null)
    setKeterangan('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (mode === 'foto' && !file) {
      alert('Pilih gambar dulu')
      return
    }
    if (mode === 'video' && !youtubeUrl && !videoFile) {
      alert('Isi link YouTube atau pilih file video dulu')
      return
    }

    setLoading(true)

    if (mode === 'foto') {
      const fileName = `${Date.now()}-${file!.name}`
      const { error: uploadError } = await supabase.storage.from('desa-images').upload(fileName, file!)
      if (uploadError) {
        alert('Upload gagal: ' + uploadError.message)
        setLoading(false)
        return
      }
      const { data: urlData } = supabase.storage.from('desa-images').getPublicUrl(fileName)

      const { error } = await supabase.from('galeri').insert({
        gambar_url: urlData.publicUrl,
        keterangan: keterangan || null,
      })
      if (error) {
        alert('Gagal simpan: ' + error.message)
        setLoading(false)
        return
      }
    } else {
      let video_file_url: string | null = null

      if (videoFile) {
        const fileName = `${Date.now()}-${videoFile.name}`
        const { error: uploadError } = await supabase.storage.from('desa-videos').upload(fileName, videoFile)
        if (uploadError) {
          alert('Upload video gagal: ' + uploadError.message)
          setLoading(false)
          return
        }
        const { data: urlData } = supabase.storage.from('desa-videos').getPublicUrl(fileName)
        video_file_url = urlData.publicUrl
      }

      const { error } = await supabase.from('galeri').insert({
        video_url: youtubeUrl || null,
        video_file_url,
        keterangan: keterangan || null,
      })
      if (error) {
        alert('Gagal simpan: ' + error.message)
        setLoading(false)
        return
      }
    }

    resetForm()
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-semibold text-gray-900 text-sm">Tambah ke Galeri</h2>

      {/* Toggle Foto/Video */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => { setMode('foto'); resetForm() }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'foto' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Foto
        </button>
        <button
          type="button"
          onClick={() => { setMode('video'); resetForm() }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'video' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Video
        </button>
      </div>

      {mode === 'foto' ? (
        <div>
          <FileDropInput id="galeri-foto-input" accept="image/*" onFileSelect={handleFileSelect} helperText="PNG atau JPG" />
          {compressing && <p className="text-xs text-gray-500 mt-1.5">Mengompres gambar...</p>}
        </div>
      ) : (
        <VideoInput onYoutubeChange={setYoutubeUrl} onFileChange={setVideoFile} />
      )}

      <div>
        <input
          type="text"
          placeholder="Keterangan (opsional)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading || compressing}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        {loading ? 'Mengunggah...' : mode === 'foto' ? 'Upload Foto' : 'Tambah Video'}
      </button>
    </form>
  )
}