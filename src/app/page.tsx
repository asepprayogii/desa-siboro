import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();

  const [{ data: beritaTerbaru }, { data: profil }, { count: totalPerangkat }, { count: totalGaleri }, { data: perangkat }, { data: galeriPreview }] = await Promise.all([
    supabase.from("berita").select("judul, slug, gambar_url, isi, kategori, created_at").eq("published", true).order("created_at", { ascending: false }).limit(3),
    supabase.from("profil_desa").select("*").single(),
    supabase.from("perangkat_desa").select("*", { count: "exact", head: true }),
    supabase.from("galeri").select("id", { count: "exact", head: true }),
    supabase.from("perangkat_desa").select("*").order("urutan", { ascending: true }),
    supabase.from("galeri").select("id, gambar_url, keterangan").not("gambar_url", "is", null).order("created_at", { ascending: false }).limit(4),
  ]);

  const totalBerita = beritaTerbaru?.length ?? 0;
  const kepalaDesa = perangkat?.[0];

  const misiList: string[] = profil?.misi
    ? profil.misi
        .split(/\n+/)
        .map((line: string) => line.replace(/^\d+[\.\)\-]\s*/, "").trim())
        .filter((line: string) => line.length > 0)
    : [];

  const formatTanggal = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const truncate = (text: string, max: number) => {
    if (!text) return "";
    const clean = text
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return clean.length > max ? clean.substring(0, max) + "..." : clean;
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center text-center overflow-hidden">
        <Image src="/hero-desa.jpg" alt="Desa Siboro" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 px-4 max-w-3xl">
          <span className="inline-block bg-amber-400 text-blue-950 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">Website Resmi Desa Siboro</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Selamat Datang di
            <br />
            <span className="text-amber-400">Desa Siboro</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/profil" className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-semibold px-6 py-3 rounded-full transition">
              Tentang Desa →
            </Link>
            <Link href="/berita" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-full border border-white/30 transition">
              Lihat Berita
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING STAT CARDS */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-12 md:-mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
            value={totalBerita}
            label="Total Berita"
          />
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            value={totalPerangkat ?? 0}
            label="Perangkat Desa"
          />
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
              </svg>
            }
            value="1.022"
            label="Jumlah Penduduk"
          />
          <StatCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            value={totalGaleri ?? 0}
            label="Dokumentasi"
          />
        </div>
      </section>

      {/* SECTION PUTIH - Tentang Desa */}
      <section className="bg-white pt-28 md:pt-32 pb-20">
        {profil?.deskripsi && (
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Mengenal Desa Siboro</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Perjalanan panjang sejarah dan budaya yang membentuk identitas Desa Siboro</p>
              <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image src="/hero-desa.jpg" alt="Desa Siboro" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Sejarah & Warisan Budaya</h3>
                <div className="w-12 h-1 bg-rose-500 rounded-full mb-5" />
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.deskripsi}</p>
                <Link href="/profil" className="inline-block mt-6 text-rose-600 font-semibold hover:text-rose-700 transition">
                  Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SAMBUTAN KEPALA DESA */}
      {profil?.sambutan_kades && kepalaDesa && (
        <section className="bg-rose-50 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Kata Sambutan</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Sambutan Kepala Desa</h2>
              <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0 ring-4 ring-rose-50">
                  {kepalaDesa.foto_url ? (
                    <Image src={kepalaDesa.foto_url} alt={kepalaDesa.nama} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center">
                      <svg className="w-10 h-10 text-rose-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 italic leading-relaxed whitespace-pre-line mb-4">&ldquo;{profil.sambutan_kades}&rdquo;</p>
                  <p className="font-bold text-gray-900">{kepalaDesa.nama}</p>
                  <p className="text-sm text-rose-600">{kepalaDesa.jabatan}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VISI MISI */}
      {(profil?.visi || profil?.misi) && (
        <section className="bg-gray-100 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Arah Pembangunan Desa</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Arah Pembangunan Desa</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Komitmen kami dalam membangun masa depan yang berkelanjutan</p>
              <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {profil?.visi && (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-center mb-3">Visi Desa</h3>
                  <div className="w-12 h-1 bg-rose-500 mx-auto mb-5 rounded-full" />
                  <p className="text-gray-600 italic leading-relaxed text-center">&ldquo;{profil.visi}&rdquo;</p>
                </div>
              )}

              {profil?.misi && (
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-center mb-3">Misi Desa</h3>
                  <div className="w-12 h-1 bg-rose-500 mx-auto mb-5 rounded-full" />
                  {misiList.length > 0 ? (
                    <ol className="space-y-3">
                      {misiList.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <span className="text-gray-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.misi}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PETA LOKASI - statis, tepat sebelum Berita */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Lokasi</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Peta Lokasi Desa Siboro</h2>
            <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31884.964533187904!2d98.62806483970488!3d2.6284978803542494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031cf77fdefa431%3A0x6b8e82e1df402d55!2sSiboro%2C%20Kec.%20Sianjur%20Mula%20Mula%2C%20Kabupaten%20Samosir%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1784096395501!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* BERITA TERBARU */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Berita Terkini</span>
              <h2 className="text-3xl md:text-4xl font-bold">Berita dan Informasi Desa Terbaru</h2>
              <div className="w-12 h-1 bg-rose-500 mt-4 rounded-full" />
            </div>
            <Link href="/berita" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition self-start md:self-auto">
              Lihat Semua Berita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {beritaTerbaru && beritaTerbaru.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beritaTerbaru.map((b) => (
                <BeritaCardHome key={b.slug} {...b} formatTanggal={formatTanggal} truncate={truncate} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">Belum ada berita yang dipublikasikan.</p>
          )}
        </div>
      </section>

      {/* GALERI PREVIEW */}
      {galeriPreview && galeriPreview.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Dokumentasi</span>
                <h2 className="text-3xl md:text-4xl font-bold">Galeri Desa</h2>
                <div className="w-12 h-1 bg-rose-500 mt-4 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galeriPreview.map((g) => (
                <div key={g.id} className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image src={g.gambar_url} alt={g.keterangan || "Galeri Desa Siboro"} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/galeri" className="inline-flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700 transition">
                Lihat Seluruh Galeri
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Mari Bersama Membangun Desa</h2>
          <p className="text-blue-100 mb-8">Bergabunglah bersama kami memajukan Desa Siboro. Suara dan partisipasi Anda berarti bagi masa depan desa.</p>
          <Link href="/berita" className="inline-block bg-amber-400 hover:bg-amber-300 text-blue-950 font-semibold px-8 py-3 rounded-full transition">
            Lihat Berita Terbaru →
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-3">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs md:text-sm text-gray-500">{label}</p>
    </div>
  );
}

function BeritaCardHome({
  judul,
  slug,
  gambar_url,
  isi,
  kategori,
  created_at,
  formatTanggal,
  truncate,
}: {
  judul: string;
  slug: string;
  gambar_url: string | null;
  isi: string | null;
  kategori: string | null;
  created_at: string | null;
  formatTanggal: (date: string) => string;
  truncate: (text: string, max: number) => string;
}) {
  return (
    <Link href={`/berita/${slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-52 overflow-hidden">
        {gambar_url ? (
          <Image src={gambar_url} alt={judul} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">{kategori || "Umum"}</div>
      </div>

      <div className="p-5">
        {created_at && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatTanggal(created_at)}</span>
          </div>
        )}

        <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">{judul}</h3>

        {isi && <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{truncate(isi, 100)}</p>}

        <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
          Baca Selengkapnya
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
