import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import FormBerita from '../../FormBerita'

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: berita } = await supabase.from('berita').select('*').eq('id', id).single()

  if (!berita) notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
      <FormBerita mode="edit" beritaId={id} initialData={berita} />
    </main>
  )
}