export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        <p className="font-semibold text-white mb-1">Desa Siboro</p>
        <p>Kecamatan Sianjur Simula, Kabupaten Samosir</p>
        <p className="mt-3 text-gray-500">
          © {new Date().getFullYear()} Website Resmi Desa Siboro
        </p>
      </div>
    </footer>
  )
}