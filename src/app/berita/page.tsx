import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Berita Desa Siboro - Kabar Terkini",
  description: "Kumpulan berita dan informasi terbaru seputar kegiatan Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir.",
};

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default async function DetailBerita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: berita } = await supabase.from("berita").select("*").eq("slug", slug).eq("published", true).single();

  if (!berita) notFound();

  const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const youtubeEmbed = berita.video_url ? getYoutubeEmbedUrl(berita.video_url) : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-xs font-medium text-blue-600 uppercase">{berita.kategori}</span>
      <h1 className="text-3xl font-bold mt-2">{berita.judul}</h1>
      <p className="text-sm text-gray-500 mt-2">{tanggal}</p>

      {berita.gambar_url && (
        <div className="relative w-full h-80 mt-6 rounded-lg overflow-hidden">
          <Image src={berita.gambar_url} alt={berita.judul} fill className="object-cover" />
        </div>
      )}

      <div className="prose mt-6 whitespace-pre-line">{berita.isi}</div>

      {/* Video: prioritas YouTube dulu, baru file upload */}
      {youtubeEmbed && (
        <div className="mt-6 aspect-video">
          <iframe src={youtubeEmbed} className="w-full h-full rounded-lg" allowFullScreen />
        </div>
      )}

      {!youtubeEmbed && berita.video_file_url && (
        <div className="mt-6">
          <video controls className="w-full rounded-lg">
            <source src={berita.video_file_url} />
            Browser kamu tidak mendukung tag video.
          </video>
        </div>
      )}
    </main>
  );
}
