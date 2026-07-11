'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface FormKontakProps {
  initialData: {
    alamat: string | null
    telepon: string | null
    latitude: number | null
    longitude: number | null
  }
}

export default function FormKontak({ initialData }: FormKontakProps) {
  const [alamat, setAlamat] = useState(initialData.alamat || '')
  const [telepon, setTelepon] = useState(initialData.telepon || '')
  const [latitude, setLatitude] = useState(initialData.latitude?.toString() || '')
  const [longitude, setLongitude] = useState(initialData.longitude?.toString() || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await supabase
      .from('kontak_desa')
      .update({
        alamat,
        telepon,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Alamat</label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          rows={2}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Telepon</label>
        <input
          type="text"
          value={telepon}
          onChange={(e) => setTelepon(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="2.6xxxxx"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="98.7xxxxx"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 -mt-3">
        Cara dapat koordinat: buka Google Maps, cari lokasi kantor desa, klik kanan lokasinya, koordinat muncul di menu.
      </p>

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