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
    <main className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Berita</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola berita dan informasi desa</p>
        </div>
        <Link
          href="/admin/berita/baru"
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {berita && berita.length > 0 ? (
          <>
            {/* Table - Desktop */}
            <table className="w-full text-sm hidden md:table">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Judul</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Tanggal</th>
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {berita.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{b.judul}</td>
                    <td className="p-4 text-gray-500 capitalize">{b.kategori}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {b.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(b.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/berita/${b.id}/edit`} className="text-blue-700 font-medium hover:text-blue-800">
                          Edit
                        </Link>
                        <DeleteBeritaButton id={b.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {berita.map((b) => (
                <div key={b.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-medium text-gray-900">{b.judul}</p>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                      b.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {b.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 capitalize">
                    {b.kategori} · {new Date(b.created_at).toLocaleDateString('id-ID')}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <Link href={`/admin/berita/${b.id}/edit`} className="text-blue-700 font-medium">Edit</Link>
                    <DeleteBeritaButton id={b.id} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-gray-400">Belum ada berita.</p>
          </div>
        )}
      </div>
    </main>
  )
}