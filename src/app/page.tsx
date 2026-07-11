import { createClient } from "@/lib/supabase/server";
import BeritaCard from "@/components/BeritaCard";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();

  const [{ data: beritaTerbaru }, { data: profil }, { count: totalPerangkat }] = await Promise.all([
    supabase.from("berita").select("judul, slug, gambar_url, kategori, created_at").eq("published", true).order("created_at", { ascending: false }).limit(3),
    supabase.from("profil_desa").select("*").single(),
    supabase.from("perangkat_desa").select("*", { count: "exact", head: true }),
  ]);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <Image src="/hero-desa.jpg" alt="Desa Siboro" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 px-4 max-w-3xl">
          <span className="inline-block bg-amber-400 text-blue-950 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">Website Resmi Desa Siboro</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Selamat Datang di
            <br />
            <span className="text-amber-400">Desa Siboro</span>
          </h1>
          <p className="text-blue-50 text-base md:text-lg mb-8 max-w-xl mx-auto">Desa yang asri di tepian Danau Toba, menjunjung kearifan lokal menuju masa depan yang berkelanjutan.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/profil" className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-semibold px-6 py-3 rounded-full transition">
              Tentang Desa →
            </Link>
            <Link href="/kontak" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-full border border-white/30 transition">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* STAT CARDS — mengambang di atas hero */}
      <section className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6">
          <StatCard icon="🏘️" value={totalPerangkat ?? 0} label="Perangkat Desa" />
          <StatCard icon="📰" value={beritaTerbaru?.length ?? 0} label="Berita Terbaru" />
          <StatCard icon="📍" value="1" label="Desa" />
          <StatCard icon="🏔️" value="Samosir" label="Kabupaten" />
        </div>
      </section>

      {/* TENTANG DESA */}
      {profil?.deskripsi && (
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Tentang Kami</span>
            <h2 className="text-3xl font-bold mt-2">Mengenal Desa Siboro</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image src="/hero-desa.jpg" alt="Desa Siboro" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Sejarah & Kearifan Lokal</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.deskripsi}</p>
              <Link href="/profil" className="inline-block mt-4 text-blue-700 font-semibold">
                Selengkapnya →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* VISI MISI */}
      {(profil?.visi || profil?.misi) && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Arah Pembangunan</span>
              <h2 className="text-3xl font-bold mt-2">Visi & Misi Desa</h2>
              <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {profil?.visi && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
                  <h3 className="font-bold text-lg mb-3">Visi Desa</h3>
                  <p className="text-gray-600 italic leading-relaxed">&ldquo;{profil.visi}&rdquo;</p>
                </div>
              )}
              {profil?.misi && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">📋</div>
                  <h3 className="font-bold text-lg mb-3">Misi Desa</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.misi}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BERITA TERBARU */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Berita Terkini</span>
            <h2 className="text-3xl font-bold mt-2">Kabar Terbaru Desa Siboro</h2>
          </div>
          <Link href="/berita" className="hidden sm:inline-block bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition">
            Lihat Semua Berita →
          </Link>
        </div>

        {beritaTerbaru && beritaTerbaru.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaTerbaru.map((b) => (
              <BeritaCard key={b.slug} {...b} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-10">Belum ada berita yang dipublikasikan.</p>
        )}
      </section>

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Mari Bersama Membangun Desa</h2>
          <p className="text-blue-100 mb-8">Bergabunglah bersama kami memajukan Desa Siboro. Suara dan partisipasi Anda berarti bagi masa depan desa.</p>
          <Link href="/kontak" className="inline-block bg-amber-400 hover:bg-amber-300 text-blue-950 font-semibold px-8 py-3 rounded-full transition">
            Hubungi Kami →
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string | number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-2xl font-bold text-blue-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
