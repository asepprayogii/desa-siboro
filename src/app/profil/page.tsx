import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profil Desa Siboro - Sejarah, Visi & Misi",
  description: "Profil lengkap Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir: sejarah, visi, misi, dan deskripsi desa.",
};

export default async function ProfilPage() {
  const supabase = await createClient();

  const { data: profil } = await supabase.from("profil_desa").select("*").single();

  const misiList: string[] = profil?.misi
    ? profil.misi
        .split(/\n+/)
        .map((line: string) => line.replace(/^\d+[\.\)\-]\s*/, "").trim())
        .filter((line: string) => line.length > 0)
    : [];

  return (
    <main>
      {/* SEJARAH DESA */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Sejarah
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Perjalanan Desa Siboro</h2>
            <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image src="/hero-desa.jpg" alt="Sejarah Desa Siboro" fill className="object-cover" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {profil?.sejarah || "Belum ada data sejarah."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA WILAYAH & LOKASI */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Data Wilayah
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Lokasi & Wilayah Desa</h2>
            <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <dl className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <dt className="text-gray-500 text-sm">Desa</dt>
                  <dd className="font-semibold text-gray-900 text-sm">Siboro</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <dt className="text-gray-500 text-sm">Kecamatan</dt>
                  <dd className="font-semibold text-gray-900 text-sm">Sianjur Simula</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <dt className="text-gray-500 text-sm">Kabupaten</dt>
                  <dd className="font-semibold text-gray-900 text-sm">Samosir</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <dt className="text-gray-500 text-sm">Provinsi</dt>
                  <dd className="font-semibold text-gray-900 text-sm">Sumatera Utara</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 text-sm">Luas Wilayah</dt>
                  <dd className="font-semibold text-gray-900 text-sm">7,25 km²</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 min-h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31884.964533187904!2d98.62806483970488!3d2.6284978803542494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031cf77fdefa431%3A0x6b8e82e1df402d55!2sSiboro%2C%20Kec.%20Sianjur%20Mula%20Mula%2C%20Kabupaten%20Samosir%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1784096395501!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Arah Pembangunan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Visi & Misi Desa</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Komitmen kami dalam membangun masa depan yang berkelanjutan
            </p>
            <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* VISI */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-center text-gray-900 mb-2">Visi Desa</h3>
              <div className="w-10 h-0.5 bg-gray-200 mx-auto mb-5" />
              <p className="text-gray-600 italic leading-relaxed text-center">
                &ldquo;{profil?.visi || "Belum ada data visi."}&rdquo;
              </p>
            </div>

            {/* MISI */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-center text-gray-900 mb-2">Misi Desa</h3>
              <div className="w-10 h-0.5 bg-gray-200 mx-auto mb-5" />
              {misiList.length > 0 ? (
                <ol className="space-y-3">
                  {misiList.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-700 text-white rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {profil?.misi || "Belum ada data misi."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DESKRIPSI UMUM */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Informasi Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Deskripsi Umum</h2>
            <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-center text-lg">
                {profil?.deskripsi || "Belum ada data deskripsi."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}