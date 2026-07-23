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
  onSaved?: () => void
}

export default function FormKontak({ initialData, onSaved }: FormKontakProps) {
  const [alamat, setAlamat] = useState(initialData.alamat || '')
  const [telepon, setTelepon] = useState(initialData.telepon || '')
  const [mapsLink, setMapsLink] = useState('')
  const [latitude, setLatitude] = useState(initialData.latitude)
  const [longitude, setLongitude] = useState(initialData.longitude)
  const [resolving, setResolving] = useState(false)
  const [resolveError, setResolveError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function handleResolveLink() {
    if (!mapsLink.trim()) {
      setResolveError('Paste link Google Maps dulu.')
      return
    }

    setResolving(true)
    setResolveError('')

    try {
      const res = await fetch('/api/resolve-maps-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: mapsLink.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setResolveError(data.error || 'Gagal memproses link.')
        setResolving(false)
        return
      }

      setLatitude(data.lat)
      setLongitude(data.lng)
      setResolveError('')
    } catch {
      setResolveError('Gagal memproses link. Coba lagi.')
    }

    setResolving(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await supabase
      .from('kontak_desa')
      .update({ alamat, telepon, latitude, longitude })
      .eq('id', 1)

    if (error) {
      alert('Gagal simpan: ' + error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setSuccess(true)
    router.refresh()

    if (onSaved) {
      setTimeout(() => onSaved(), 600)
    } else {
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Telepon</label>
        <input
          type="text"
          value={telepon}
          onChange={(e) => setTelepon(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi di Peta</label>
        <p className="text-xs text-gray-500 mb-3">
          Buka Google Maps, cari lokasi kantor desa, copy link-nya (dari address bar atau tombol Bagikan), lalu paste di bawah ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={mapsLink}
            onChange={(e) => setMapsLink(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
            className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleResolveLink}
            disabled={resolving}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {resolving ? 'Memproses...' : 'Ambil Lokasi'}
          </button>
        </div>

        {resolveError && <p className="text-red-600 text-xs mt-2">{resolveError}</p>}

        {latitude && longitude && (
          <div className="mt-3 bg-white rounded-lg p-3 border border-green-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-xs text-green-700">Lokasi berhasil diambil ({latitude.toFixed(5)}, {longitude.toFixed(5)})</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        {success && <span className="text-green-600 text-sm">Tersimpan!</span>}
      </div>
    </form>
  )
}