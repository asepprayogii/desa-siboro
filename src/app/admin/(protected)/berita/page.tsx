import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteBeritaButton from './DeleteBeritaButton'

export default async function AdminBeritaPage() {
  const supabase = await createClient()

  const { data: berita } = await supabase
    .from('berita')
    .select('id, judul, kategori, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kelola Berita</h1>
        <Link href="/admin/berita/baru" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          + Tambah Berita
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Judul</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Status</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita?.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3 font-medium">{b.judul}</td>
                <td className="p-3">{b.kategori}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${b.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(b.created_at).toLocaleDateString('id-ID')}
                </td>
                <td className="p-3 space-x-3">
                  <Link href={`/admin/berita/${b.id}/edit`} className="text-blue-600">Edit</Link>
                  <DeleteBeritaButton id={b.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!berita || berita.length === 0) && (
          <p className="p-6 text-center text-gray-400">Belum ada berita.</p>
        )}
      </div>
    </main>
  )
}