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
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Daftar Perangkat ({initialList.length})
        </h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditData(null) }}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tutup Form
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Perangkat
            </>
          )}
        </button>
      </div>

      {(showForm || editData) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 max-w-md">
          <FormPerangkat
            initialData={editData ?? undefined}
            onSuccess={() => { setShowForm(false); setEditData(null) }}
          />
        </div>
      )}

      {initialList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {initialList.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
              <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-100 mb-3">
                {p.foto_url ? (
                  <Image src={p.foto_url} alt={p.nama} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="font-medium text-sm text-gray-900">{p.nama}</p>
              <p className="text-xs text-gray-500 mb-3">{p.jabatan}</p>
              <div className="flex justify-center gap-3 text-xs">
                <button
                  onClick={() => { setEditData(p); setShowForm(false) }}
                  className="text-blue-700 font-medium hover:text-blue-800"
                >
                  Edit
                </button>
                <DeletePerangkatButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 text-center py-16">
          <p className="text-gray-400">Belum ada data perangkat desa.</p>
        </div>
      )}
    </div>
  )
}