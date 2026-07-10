'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil Desa' },
  { href: '/struktur', label: 'Struktur' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-blue-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg">
            Desa Siboro
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${pathname === item.href ? 'font-semibold border-b-2 border-white' : 'text-blue-100'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Tombol Menu Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${pathname === item.href ? 'font-semibold' : 'text-blue-100'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}