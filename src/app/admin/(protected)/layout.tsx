import Link from 'next/link'

const adminMenu = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/berita', label: 'Kelola Berita' },
  { href: '/admin/galeri', label: 'Kelola Galeri' },
  { href: '/admin/perangkat', label: 'Kelola Perangkat' },
  { href: '/admin/profil', label: 'Edit Profil Desa' },
  { href: '/admin/kontak', label: 'Edit Kontak' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white p-4 hidden md:block">
        <p className="font-bold mb-6 px-2">Admin Desa Siboro</p>
        <nav className="flex flex-col gap-1">
          {adminMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 bg-gray-50">{children}</div>
    </div>
  )
}