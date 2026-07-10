import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galeri Desa Siboro",
  description: "Dokumentasi foto kegiatan dan aktivitas Desa Siboro.",
};

export default async function GaleriPage() {
  const supabase = await createClient();

  const { data: galeri } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Galeri Desa</h1>

      {galeri && galeri.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((g) => (
            <div key={g.id} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={g.gambar_url} alt={g.keterangan || "Galeri"} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Belum ada foto galeri.</p>
      )}
    </main>
  );
}
