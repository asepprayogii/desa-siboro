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
    <main className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Dokumentasi
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Galeri Desa Siboro</h1>
          <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
        </div>

        {galeri && galeri.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galeri.map((g) => (
              <div key={g.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={g.gambar_url}
                  alt={g.keterangan || "Galeri Desa Siboro"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {g.keterangan && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium leading-snug">{g.keterangan}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">Belum ada foto galeri.</p>
        )}
      </div>
    </main>
  );
}