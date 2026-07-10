import { createClient } from '@/lib/supabase/server'

export default async function KontakPage() {
  const supabase = await createClient()

  const { data: kontak } = await supabase
    .from('kontak_desa')
    .select('*')
    .single()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Kontak Kantor Desa</h1>

      <div className="space-y-3 mb-8">
        <p><strong>Alamat:</strong> {kontak?.alamat || 'Belum ada data.'}</p>
        <p><strong>Telepon:</strong> {kontak?.telepon || 'Belum ada data.'}</p>
      </div>

      {kontak?.latitude && kontak?.longitude && (
        <div className="w-full h-80 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${kontak.latitude},${kontak.longitude}&hl=id&z=15&output=embed`}
          />
        </div>
      )}
    </main>
  )
}