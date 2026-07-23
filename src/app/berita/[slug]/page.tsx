import { createClient } from "@/lib/supabase/server";
import { getVideoEmbedUrl } from "@/lib/video";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: berita } = await supabase.from("berita").select("judul, isi").eq("slug", slug).single();

  if (!berita) return { title: "Berita Tidak Ditemukan" };

  return {
    title: `${berita.judul} - Desa Siboro`,
    description: berita.isi.slice(0, 155),
  };
}

export default async function DetailBerita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: berita } = await supabase.from("berita").select("*").eq("slug", slug).eq("published", true).single();

  if (!berita) notFound();

  const { data: beritaTerbaru } = await supabase.from("berita").select("judul, slug, gambar_url, created_at").eq("published", true).neq("slug", slug).order("created_at", { ascending: false }).limit(5);

  const videoEmbed = berita.video_url ? getVideoEmbedUrl(berita.video_url) : null;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* SIDEBAR KIRI - Judul & Kembali */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-blue-800 text-white">
        <div className="sticky top-20 p-8">
          <Link href="/berita" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Berita
          </Link>

          <span className="inline-block bg-amber-400 text-blue-950 text-xs font-semibold px-3 py-1 rounded-full mb-3">{berita.kategori || "Umum"}</span>

          <h1 className="text-xl font-bold leading-snug mb-4">{berita.judul}</h1>

          <div className="flex items-center gap-2 text-blue-200 text-xs pt-4 border-t border-blue-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Dipublikasikan {formatTanggal(berita.created_at)}</span>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
          {/* Header khusus mobile (karena sidebar kiri disembunyikan di layar kecil) */}
          <div className="lg:hidden mb-6">
            <Link href="/berita" className="inline-flex items-center gap-2 text-blue-700 text-sm mb-4">
              ← Kembali ke Daftar Berita
            </Link>
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">{berita.kategori || "Umum"}</span>
            <h1 className="text-2xl font-bold leading-snug">{berita.judul}</h1>
            <p className="text-sm text-gray-500 mt-2">Dipublikasikan {formatTanggal(berita.created_at)}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Isi Berita */}
            <div className="lg:col-span-2">
              {berita.gambar_url && (
                <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-6">
                  <Image src={berita.gambar_url} alt={berita.judul} fill className="object-cover" />
                </div>
              )}

              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">{berita.isi}</div>

              {videoEmbed && (
                <div className="mt-8 aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe src={videoEmbed} className="w-full h-full" allowFullScreen />
                </div>
              )}

              {!videoEmbed && berita.video_file_url && (
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
                  <video controls className="w-full">
                    <source src={berita.video_file_url} />
                    Browser kamu tidak mendukung tag video.
                  </video>
                </div>
              )}
            </div>

            {/* SIDEBAR KANAN - Berita Terbaru */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-gray-900">Berita Terbaru</h2>
                </div>

                {beritaTerbaru && beritaTerbaru.length > 0 ? (
                  <div className="space-y-4">
                    {beritaTerbaru.map((b) => (
                      <Link key={b.slug} href={`/berita/${b.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {b.gambar_url ? <Image src={b.gambar_url} alt={b.judul} fill className="object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-blue-100 to-amber-100" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">{b.judul}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTanggal(b.created_at)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Belum ada berita lain.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
