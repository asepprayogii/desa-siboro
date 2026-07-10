import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Struktur Perangkat Desa Siboro",
  description: "Daftar Kepala Desa dan perangkat Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir.",
};

export default async function StrukturPage() {
  const supabase = await createClient();

  const { data: perangkat } = await supabase.from("perangkat_desa").select("*").order("urutan", { ascending: true });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Struktur Perangkat Desa</h1>

      {perangkat && perangkat.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {perangkat.map((p) => (
            <div key={p.id} className="text-center">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-100">
                {p.foto_url ? <Image src={p.foto_url} alt={p.nama} fill className="object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400 text-xs">Foto</div>}
              </div>
              <h3 className="font-semibold mt-3">{p.nama}</h3>
              <p className="text-sm text-gray-500">{p.jabatan}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Belum ada data perangkat desa.</p>
      )}
    </main>
  );
}
