export default function Loading() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Memuat...</p>
      </div>
    </main>
  )
}