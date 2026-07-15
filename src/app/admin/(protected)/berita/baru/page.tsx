import Link from 'next/link'
import FormBerita from '../FormBerita'

export default function TambahBeritaPage() {
  return (
    <main className="p-6 lg:p-10">
      <Link href="/admin/berita" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Daftar Berita
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tambah Berita</h1>
      <FormBerita mode="tambah" />
    </main>
  )
}