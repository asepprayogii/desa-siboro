'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil Desa' },
  { href: '/struktur', label: 'Struktur' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white/95 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 relative">
              <Image src="/logo-desa.png" alt="Logo Desa Siboro" fill className="object-contain p-1" />
            </div>
            <div>
              <p className="font-bold text-blue-950 leading-tight">Desa Siboro</p>
              <p className="text-[11px] text-gray-500 leading-tight">Kec. Sianjur Simula, Kab. Samosir</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  pathname === item.href
                    ? 'bg-blue-800 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-blue-950"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Dropdown mobile - absolute, jadi overlay, bukan dorong konten */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 rounded-b-2xl px-4 py-4 flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-blue-800 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
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