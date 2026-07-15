import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export default async function Footer() {
  const supabase = await createClient()
  const { data: kontak } = await supabase.from('kontak_desa').select('*').eq('id', 1).single()

  const mapsLink = kontak?.latitude && kontak?.longitude
    ? `https://www.google.com/maps?q=${kontak.latitude},${kontak.longitude}`
    : null

  return (
    <footer className="bg-blue-950 text-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex-shrink-0 relative">
                <Image src="/logo-desa.png" alt="Logo Desa Siboro" fill className="object-contain p-1" />
              </div>
              <p className="font-bold text-white">Desa Siboro</p>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Website resmi penyedia informasi terkait kegiatan dan perkembangan desa.
            </p>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Kontak</p>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>{kontak?.alamat || 'Kecamatan Sianjur Simula, Kabupaten Samosir'}</li>
              {kontak?.telepon && <li>{kontak.telepon}</li>}
              {mapsLink && (
                <li>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                    Lihat di Google Maps →
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Tautan</p>
            <ul className="text-sm text-blue-200 space-y-2">
              <li><Link href="/" className="hover:text-white">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-white">Profil Desa</Link></li>
              <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
              <li><Link href="/galeri" className="hover:text-white">Galeri</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900 mt-10 pt-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} Desa Siboro. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  )
}