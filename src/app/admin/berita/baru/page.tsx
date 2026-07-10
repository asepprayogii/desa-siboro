import FormBerita from '../FormBerita'

export default function TambahBeritaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Berita</h1>
      <FormBerita mode="tambah" />
    </main>
  )
}