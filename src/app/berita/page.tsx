import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Berita Desa Siboro - Kabar Terkini",
  description: "Kumpulan berita dan informasi terbaru seputar kegiatan Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir.",
};

export default async function BeritaPage() {
  const supabase = await createClient();

  const { data: berita } = await supabase
    .from("berita")
    .select("judul, slug, gambar_url, isi, kategori, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const formatTanggal = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const truncate = (text: string, max: number) => {
    if (!text) return "";
    const clean = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    return clean.length > max ? clean.substring(0, max) + "..." : clean;
  };

  const beritaPertama = berita?.[0];
  const beritaLainnya = berita?.slice(1) || [];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* SIDEBAR - sticky, ikut berhenti di akhir konten (tidak menutupi footer) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-blue-700 text-white">
        <div className="sticky top-20 p-8">
          {/* Icon */}
          <div className="w-14 h-14 bg-amber-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>

          {/* Judul & Deskripsi */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Berita Desa</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Informasi dan berita terbaru dari Desa Siboro untuk masyarakat
            </p>
          </div>

          {/* Stats */}
          <div className="pt-6 border-t border-blue-600 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{berita?.length || 0}</p>
                <p className="text-xs text-blue-200">Total Berita</p>
              </div>
            </div>
          </div>

          {/* Link Kembali */}
          <div className="pt-6 border-t border-blue-600">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Kabar Terkini
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">Berita dan Informasi Desa Terbaru</h1>
            <div className="w-12 h-1 bg-rose-500 mt-4 rounded-full" />
          </div>

          {berita && berita.length > 0 ? (
            <>
              {/* BERITA UTAMA (Featured) */}
              {beritaPertama && (
                <div className="mb-10">
                  <Link href={`/berita/${beritaPertama.slug}`} className="group block">
                    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                      {beritaPertama.gambar_url ? (
                        <Image
                          src={beritaPertama.gambar_url}
                          alt={beritaPertama.judul}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-amber-100" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      <div className="absolute top-4 left-4 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {beritaPertama.kategori || "Umum"}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-2 text-blue-200 text-xs mb-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{beritaPertama.created_at && formatTanggal(beritaPertama.created_at)}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-tight">
                          {beritaPertama.judul}
                        </h2>
                        {beritaPertama.isi && (
                          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4">
                            {truncate(beritaPertama.isi, 150)}
                          </p>
                        )}
                        <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-3 transition-all">
                          Baca Selengkapnya
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* BERITA LAINNYA (Grid) */}
              {beritaLainnya.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {beritaLainnya.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/berita/${b.slug}`}
                      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="relative h-48 overflow-hidden">
                        {b.gambar_url ? (
                          <Image
                            src={b.gambar_url}
                            alt={b.judul}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {b.kategori || "Umum"}
                        </div>
                      </div>

                      <div className="p-5">
                        {b.created_at && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatTanggal(b.created_at)}</span>
                          </div>
                        )}

                        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                          {b.judul}
                        </h3>

                        {b.isi && (
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                            {truncate(b.isi, 80)}
                          </p>
                        )}

                        <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                          Baca Selengkapnya
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Belum ada berita yang dipublikasikan.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}