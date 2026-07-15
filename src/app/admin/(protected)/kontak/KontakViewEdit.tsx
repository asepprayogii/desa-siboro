"use client";

import { useState } from "react";
import FormKontak from "./FormKontak";

interface KontakData {
  alamat: string | null;
  telepon: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export default function KontakViewEdit({ initialData }: { initialData: KontakData }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(false)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Batal, kembali ke tampilan
        </button>
        <FormKontak initialData={initialData} onSaved={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Kontak
        </button>
      </div>

      <div className="space-y-5">
        <div className="border-b border-gray-100 pb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Alamat</p>
          {initialData.alamat ? <p className="text-sm text-gray-700">{initialData.alamat}</p> : <p className="text-sm text-gray-300 italic">Belum diisi</p>}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Telepon</p>
          {initialData.telepon ? <p className="text-sm text-gray-700">{initialData.telepon}</p> : <p className="text-sm text-gray-300 italic">Belum diisi</p>}
        </div>
      </div>
    </div>
  );
}
