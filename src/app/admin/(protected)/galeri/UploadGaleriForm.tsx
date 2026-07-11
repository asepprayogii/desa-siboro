"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

export default function UploadGaleriForm() {
  const [file, setFile] = useState<File | null>(null);
  const [keterangan, setKeterangan] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

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
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
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
    if (!file) {
      alert("Pilih gambar dulu");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("desa-images").upload(fileName, file);

    if (uploadError) {
      alert("Upload gagal: " + uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("desa-images").getPublicUrl(fileName);

    const { error } = await supabase.from("galeri").insert({
      gambar_url: urlData.publicUrl,
      keterangan: keterangan || null,
    });

    if (error) {
      alert("Gagal simpan: " + error.message);
      setLoading(false);
      return;
    }

    setFile(null);
    setKeterangan("");
    setLoading(false);
    router.refresh();

    // reset input file
    const fileInput = document.getElementById("galeri-file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-8 max-w-md">
      <h2 className="font-semibold mb-3">Tambah Foto</h2>

      <div className="mb-3">
        <input id="galeri-file-input" type="file" accept="image/*" onChange={handleFileSelect} className="w-full text-sm" />
        {compressing && <p className="text-xs text-gray-500 mt-1">Mengompres gambar...</p>}
      </div>

      <div className="mb-3">
        <input type="text" placeholder="Keterangan (opsional)" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>

      <button type="submit" disabled={loading || compressing || !file} className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">
        {loading ? "Mengunggah..." : "Upload Foto"}
      </button>
    </form>
  );
}
