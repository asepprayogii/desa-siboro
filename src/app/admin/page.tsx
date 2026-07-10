import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  async function handleLogout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  const { count: totalBerita } = await supabase
    .from('berita')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <form action={handleLogout}>
          <button className="text-sm text-red-600">Logout</button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Berita</p>
          <p className="text-2xl font-bold">{totalBerita ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/berita" className="border rounded-lg p-4 hover:shadow-md">
          <p className="font-semibold">Kelola Berita</p>
        </Link>
        <Link href="/admin/galeri" className="border rounded-lg p-4 hover:shadow-md">
          <p className="font-semibold">Kelola Galeri</p>
        </Link>
        <Link href="/admin/perangkat" className="border rounded-lg p-4 hover:shadow-md">
          <p className="font-semibold">Kelola Perangkat Desa</p>
        </Link>
        <Link href="/admin/profil" className="border rounded-lg p-4 hover:shadow-md">
          <p className="font-semibold">Edit Profil Desa</p>
        </Link>
      </div>
    </main>
  )
}