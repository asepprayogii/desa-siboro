import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-blue-950 font-bold text-sm">
                DS
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
              <li>Kecamatan Sianjur Simula</li>
              <li>Kabupaten Samosir</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-3">Tautan</p>
            <ul className="text-sm text-blue-200 space-y-2">
              <li><Link href="/" className="hover:text-white">Beranda</Link></li>
              <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
              <li><Link href="/galeri" className="hover:text-white">Galeri</Link></li>
              <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
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