import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">Halaman Tidak Ditemukan</p>
      <p className="text-gray-500 mb-6">
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
      >
        Kembali ke Beranda
      </Link>
    </main>
  )
}