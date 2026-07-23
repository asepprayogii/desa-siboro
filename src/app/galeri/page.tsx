import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import GaleriGrid from "@/components/GaleriGrid";

export const metadata: Metadata = {
  title: "Galeri Desa Siboro",
  description: "Dokumentasi foto dan video kegiatan Desa Siboro.",
};

export default async function GaleriPage() {
  const supabase = await createClient();

  const { data: galeri } = await supabase
    .from("galeri")
    .select("id, gambar_url, keterangan, video_url, video_file_url")
    .order("created_at", { ascending: false });

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
          <GaleriGrid items={galeri} />
        ) : (
          <p className="text-gray-400 text-center py-20">Belum ada foto atau video.</p>
        )}
      </div>
    </main>
  );
}