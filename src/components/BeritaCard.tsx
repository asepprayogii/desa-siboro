import Link from 'next/link'
import Image from 'next/image'

type BeritaCardProps = {
  judul: string
  slug: string
  gambar_url: string | null
  kategori: string | null
  created_at: string
}

export default function BeritaCard({ judul, slug, gambar_url, kategori, created_at }: BeritaCardProps) {
  const tanggal = new Date(created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link
      href={`/berita/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="relative h-44 bg-gray-100">
        {gambar_url ? (
          <Image
            src={gambar_url}
            alt={judul}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            📰
          </div>
        )}
        {kategori && (
          <span className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-xs font-semibold px-3 py-1 rounded-full">
            {kategori}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{tanggal}</p>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition">
          {judul}
        </h3>
      </div>
    </Link>
  )
}