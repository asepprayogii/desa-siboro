'use client'

import { usePathname } from 'next/navigation'

export default function ConditionalLayout({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
    </>
  )
}