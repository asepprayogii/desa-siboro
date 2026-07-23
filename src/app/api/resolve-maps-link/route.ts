import { NextRequest, NextResponse } from 'next/server'

function extractLatLong(input: string): { lat: number; lng: number } | null {
  // Format umum: @-6.123,106.456
  const atMatch = input.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }

  // Format: ?q=-6.123,106.456
  const qMatch = input.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }

  // Format embed: !3d-6.123!4d106.456
  const embedMatch = input.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
  if (embedMatch) return { lat: parseFloat(embedMatch[1]), lng: parseFloat(embedMatch[2]) }

  return null
}

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Link tidak valid.' }, { status: 400 })
  }

  try {
    const res = await fetch(url, { redirect: 'follow' })
    const finalUrl = res.url

    const coords = extractLatLong(finalUrl)

    if (!coords) {
      return NextResponse.json(
        { error: 'Koordinat tidak ditemukan dari link ini. Coba buka link di Google Maps, lalu copy link dari address bar-nya (bukan tombol Bagikan).' },
        { status: 422 }
      )
    }

    return NextResponse.json(coords)
  } catch {
    return NextResponse.json({ error: 'Gagal memproses link. Pastikan link Google Maps valid.' }, { status: 500 })
  }
}