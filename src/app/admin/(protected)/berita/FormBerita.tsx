'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'
import VideoInput from '@/components/VideoInput'

interface FormBeritaProps {
  mode: 'tambah' | 'edit'
  beritaId?: string
  initialData?: {
    judul: string
    isi: string
    kategori: string
    gambar_url: string | null
    video_url: string | null
    published: boolean
  }
}

export default function FormBerita({ mode, beritaId, initialData }: FormBeritaProps) {
  const [judul, setJudul] = useState(initialData?.judul || '')
  const [isi, setIsi] = useState(initialData?.isi || '')
  const [kategori, setKategori] = useState(initialData?.kategori || 'umum')
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [gambarFile, setGambarFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.video_url || '')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [compressing, setCompressing] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function handleGambarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setCompressing(true)
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      })
      setGambarFile(compressed)
    } catch {
      alert('Gagal kompres gambar')
    }
    setCompressing(false)
  }

  function slugify(text: string) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    let gambar_url = initialData?.gambar_url || null
    let video_file_url = null

    if (gambarFile) {
      const fileName = `${Date.now()}-${gambarFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('desa-images')
        .upload(fileName, gambarFile)

      if (uploadError) {
        alert('Upload gambar gagal: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('desa-images').getPublicUrl(fileName)
      gambar_url = urlData.publicUrl
    }

    if (videoFile) {
      const fileName = `${Date.now()}-${videoFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('desa-videos')
        .upload(fileName, videoFile)

      if (uploadError) {
        alert('Upload video gagal: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('desa-videos').getPublicUrl(fileName)
      video_file_url = urlData.publicUrl
    }

    const payload = {
      judul,
      slug: slugify(judul),
      isi,
      kategori,
      published,
      gambar_url,
      video_url: youtubeUrl || null,
      video_file_url,
    }

    if (mode === 'tambah') {
      const { error } = await supabase.from('berita').insert(payload)
      if (error) {
        alert('Gagal simpan: ' + error.message)
        setLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from('berita').update(payload).eq('id', beritaId)
      if (error) {
        alert('Gagal update: ' + error.message)
        setLoading(false)
        return
      }
    }

    router.push('/admin/berita')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Judul</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="umum">Umum</option>
          <option value="kegiatan">Kegiatan</option>
          <option value="pengumuman">Pengumuman</option>
          <option value="pembangunan">Pembangunan</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Isi Berita</label>
        <textarea
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          required
          rows={8}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gambar</label>
        <input type="file" accept="image/*" onChange={handleGambarSelect} className="w-full text-sm" />
        {compressing && <p className="text-xs text-gray-500 mt-1">Mengompres gambar...</p>}
        {initialData?.gambar_url && !gambarFile && (
          <p className="text-xs text-gray-500 mt-1">Gambar saat ini sudah ada. Pilih file baru untuk mengganti.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Video (opsional)</label>
        <VideoInput
          defaultYoutubeUrl={initialData?.video_url || ''}
          onYoutubeChange={setYoutubeUrl}
          onFileChange={setVideoFile}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <label htmlFor="published" className="text-sm">Publikasikan sekarang</label>
      </div>

      <button
        type="submit"
        disabled={loading || compressing}
        className="bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
      >
        {loading ? 'Menyimpan...' : mode === 'tambah' ? 'Simpan Berita' : 'Update Berita'}
      </button>
    </form>
  )
}