import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Profil Desa Siboro - Sejarah, Visi & Misi',
  description: 'Profil lengkap Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir: sejarah, visi, misi, dan deskripsi desa.',
}

export default async function ProfilPage() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .single()

  const misiList = profil?.misi
    ? profil.misi
        .split(/\n+/)
        .map((line) => line.replace(/^\d+[\.\)\-]\s*/, "").trim())
        .filter((line) => line.length > 0)
    : []

  return (
    <main>
      {/* SEJARAH DESA */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Sejarah
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Perjalanan Desa Siboro</h2>
            <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/hero-desa.jpg" alt="Sejarah Desa Siboro" fill className="object-cover" />
            </div>
            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {profil?.sejarah || 'Belum ada data sejarah.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Arah Pembangunan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Visi & Misi Desa</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Komitmen kami dalam membangun masa depan yang berkelanjutan
            </p>
            <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* VISI */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-center mb-3">Visi Desa</h3>
              <div className="w-12 h-1 bg-blue-500 mx-auto mb-5 rounded-full" />
              <p className="text-gray-600 italic leading-relaxed text-center">
                &ldquo;{profil?.visi || 'Belum ada data visi.'}&rdquo;
              </p>
            </div>

            {/* MISI */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-center mb-3">Misi Desa</h3>
              <div className="w-12 h-1 bg-amber-500 mx-auto mb-5 rounded-full" />
              {misiList.length > 0 ? (
                <ol className="space-y-3">
                  {misiList.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {profil?.misi || 'Belum ada data misi.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DESKRIPSI UMUM */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Informasi Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Deskripsi Umum</h2>
            <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center text-lg">
                {profil?.deskripsi || 'Belum ada data deskripsi.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}