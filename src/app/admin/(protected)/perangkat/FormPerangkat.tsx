"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

interface FormPerangkatProps {
  onSuccess?: () => void;
  initialData?: {
    id: string;
    nama: string;
    jabatan: string;
    foto_url: string | null;
    urutan: number;
  };
}

export default function FormPerangkat({ onSuccess, initialData }: FormPerangkatProps) {
  const [nama, setNama] = useState(initialData?.nama || "");
  const [jabatan, setJabatan] = useState(initialData?.jabatan || "");
  const [urutan, setUrutan] = useState(initialData?.urutan ?? 1);
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();
  const isEdit = !!initialData;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("File yang dipilih bukan gambar. Silakan pilih file JPG, PNG, atau format gambar lainnya.");
      e.target.value = "";
      setFile(null);
      return;
    }

    setCompressing(true);
    try {
      const compressed = await imageCompression(selected, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      });
      setFile(compressed);
    } catch {
      alert("Gagal memproses gambar. Coba pilih file gambar lain.");
      e.target.value = "";
      setFile(null);
    }
    setCompressing(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let foto_url = initialData?.foto_url || null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("desa-images").upload(fileName, file);

      if (uploadError) {
        alert("Upload gagal: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("desa-images").getPublicUrl(fileName);
      foto_url = urlData.publicUrl;
    }

    const payload = { nama, jabatan, urutan, foto_url };

    if (isEdit) {
      const { error } = await supabase.from("perangkat_desa").update(payload).eq("id", initialData.id);
      if (error) {
        alert("Gagal update: " + error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("perangkat_desa").insert(payload);
      if (error) {
        alert("Gagal simpan: " + error.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setNama("");
    setJabatan("");
    setUrutan(1);
    setFile(null);

    if (onSuccess) onSuccess();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Nama</label>
        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jabatan</label>
        <input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} required placeholder="Contoh: Kepala Desa, Sekretaris Desa" className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Urutan Tampil <span className="text-gray-400">(0 = paling atas, biasanya Kepala Desa)</span>
        </label>
        <input type="number" value={urutan} onChange={(e) => setUrutan(Number(e.target.value))} className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Foto</label>
        <input type="file" accept="image/*" onChange={handleFileSelect} className="w-full text-sm" />
        {compressing && <p className="text-xs text-gray-500 mt-1">Mengompres gambar...</p>}
        {isEdit && initialData?.foto_url && !file && <p className="text-xs text-gray-500 mt-1">Foto saat ini sudah ada. Pilih file baru untuk mengganti.</p>}
      </div>

      <button type="submit" disabled={loading || compressing} className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">
        {loading ? "Menyimpan..." : isEdit ? "Update" : "Tambah Perangkat"}
      </button>
    </form>
  );
}
