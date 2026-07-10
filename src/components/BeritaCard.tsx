import Image from 'next/image'
import Link from 'next/link'

interface BeritaCardProps {
  judul: string
  slug: string
  gambar_url: string | null
  kategori: string
  created_at: string
}

export default function BeritaCard({ judul, slug, gambar_url, kategori, created_at }: BeritaCardProps) {
  const tanggal = new Date(created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <Link href={`/berita/${slug}`} className="block rounded-lg overflow-hidden border hover:shadow-md transition">
      <div className="relative w-full h-48 bg-gray-100">
        {gambar_url ? (
          <Image src={gambar_url} alt={judul} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">Tanpa Gambar</div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600 uppercase">{kategori}</span>
        <h3 className="font-semibold mt-1 line-clamp-2">{judul}</h3>
        <p className="text-xs text-gray-500 mt-2">{tanggal}</p>
      </div>
    </Link>
  )
}