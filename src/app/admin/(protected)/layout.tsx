"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const adminMenu = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/berita",
    label: "Kelola Berita",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: "/admin/galeri",
    label: "Kelola Galeri",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/perangkat",
    label: "Perangkat Desa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
      </svg>
    ),
  },
  {
    href: "/admin/profil",
    label: "Profil Desa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/admin/kontak",
    label: "Kontak",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SIDEBAR - Desktop */}
      <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-blue-950 text-white overflow-hidden">
        <div className="p-6 border-b border-blue-900">
          <p className="font-bold text-lg">Admin Desa Siboro</p>
          <p className="text-xs text-blue-300 mt-0.5">Panel Pengelolaan Website</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-amber-400 text-blue-950" : "text-blue-100 hover:bg-blue-900"}`}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-900">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-blue-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lihat Website
          </Link>
        </div>
      </aside>

      {/* HEADER MOBILE */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-blue-950 text-white flex items-center justify-between px-4 h-14">
        <p className="font-bold text-sm">Admin Desa Siboro</p>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* SIDEBAR MOBILE - overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 top-14">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <nav className="relative w-64 h-full bg-blue-950 text-white p-4 space-y-1 overflow-y-auto">
            {adminMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-amber-400 text-blue-950" : "text-blue-100 hover:bg-blue-900"}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
            <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-blue-900 transition-colors mt-4 pt-4 border-t border-blue-900">
              Lihat Website
            </Link>
          </nav>
        </div>
      )}

      {/* KONTEN */}
      <div className="min-w-0 pt-14 lg:pt-0 lg:ml-64">{children}</div>
    </div>
  );
}
