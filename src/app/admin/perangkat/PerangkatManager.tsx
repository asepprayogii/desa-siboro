'use client'

import { useState } from 'react'
import Image from 'next/image'
import FormPerangkat from './FormPerangkat'
import DeletePerangkatButton from './DeletePerangkatButton'

interface Perangkat {
  id: string
  nama: string
  jabatan: string
  foto_url: string | null
  urutan: number
}

export default function PerangkatManager({ initialList }: { initialList: Perangkat[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<Perangkat | null>(null)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Daftar Perangkat ({initialList.length})</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null) }}
          className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          {showForm ? 'Tutup Form' : '+ Tambah Perangkat'}
        </button>
      </div>

      {(showForm || editData) && (
        <div className="mb-6">
          <FormPerangkat
            initialData={editData ?? undefined}
            onSuccess={() => { setShowForm(false); setEditData(null) }}
          />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialList.map((p) => (
          <div key={p.id} className="border rounded-lg p-3 text-center">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-100 mb-2">
              {p.foto_url ? (
                <Image src={p.foto_url} alt={p.nama} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">Foto</div>
              )}
            </div>
            <p className="font-medium text-sm">{p.nama}</p>
            <p className="text-xs text-gray-500 mb-2">{p.jabatan}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setEditData(p); setShowForm(false) }}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <DeletePerangkatButton id={p.id} />
            </div>
          </div>
        ))}
      </div>

      {initialList.length === 0 && <p className="text-gray-400">Belum ada data perangkat desa.</p>}
    </div>
  )
}