"use client";

import { useState } from "react";
import FormProfil from "./FormProfil";

interface ProfilData {
  sejarah: string | null;
  visi: string | null;
  misi: string | null;
  deskripsi: string | null;
  sambutan_kades: string | null;
}

export default function ProfilViewEdit({ initialData }: { initialData: ProfilData }) {
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
        <FormProfil initialData={initialData} onSaved={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profil
        </button>
      </div>

      <div className="space-y-4">
        <InfoBlock label="Deskripsi Singkat (Beranda)" value={initialData.deskripsi} />
        <InfoBlock label="Sejarah" value={initialData.sejarah} />
        <InfoBlock label="Visi" value={initialData.visi} />
        <InfoBlock label="Misi" value={initialData.misi} />
        <InfoBlock label="Sambutan Kepala Desa" value={initialData.sambutan_kades} />
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
      {value ? <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{value}</p> : <p className="text-sm text-gray-300 italic">Belum diisi</p>}
    </div>
  );
}
