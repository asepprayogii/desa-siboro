import { createClient } from "@/lib/supabase/server";
import { getVideoThumbnail } from "@/lib/video";
import Image from "next/image";
import UploadGaleriForm from "./UploadGaleriForm";
import DeleteGaleriButton from "./DeleteGaleriButton";
import VideoThumbnail from "./VideoThumbnail";

export default async function AdminGaleriPage() {
  const supabase = await createClient();

  const { data: galeri } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });

  return (
    <main className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola foto dan video dokumentasi kegiatan desa</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 max-w-md">
        <UploadGaleriForm />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tersimpan ({galeri?.length ?? 0})</h2>
      </div>

      {galeri && galeri.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((g) => {
            const isVideo = !!(g.video_url || g.video_file_url);

            return (
              <div key={g.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 bg-gray-100">
                {!isVideo && g.gambar_url && <Image src={g.gambar_url} alt={g.keterangan || "Galeri"} fill className="object-cover" />}

                {isVideo && <VideoThumbnail thumbUrl={g.video_url ? getVideoThumbnail(g.video_url) : null} videoFileUrl={g.video_file_url} alt={g.keterangan || "Video"} />}

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-700 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                <DeleteGaleriButton id={g.id} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 text-center py-16">
          <p className="text-gray-400">Belum ada foto atau video.</p>
        </div>
      )}
    </main>
  );
}
