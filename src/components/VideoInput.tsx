'use client'

import { useState } from 'react'

const MAX_RECOMMENDED_MB = 10
const MAX_ALLOWED_MB = 30

interface VideoInputProps {
  defaultYoutubeUrl?: string
  onYoutubeChange: (url: string) => void
  onFileChange: (file: File | null) => void
}

export default function VideoInput({ defaultYoutubeUrl = '', onYoutubeChange, onFileChange }: VideoInputProps) {
  const [mode, setMode] = useState<'youtube' | 'upload'>('youtube')
  const [fileSizeMB, setFileSizeMB] = useState<number | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setFileSizeMB(null)
      setFileError(null)
      onFileChange(null)
      return
    }

    const sizeMB = file.size / (1024 * 1024)
    setFileSizeMB(sizeMB)

    if (sizeMB > MAX_ALLOWED_MB) {
      setFileError(`File terlalu besar (${sizeMB.toFixed(1)}MB). Maksimal ${MAX_ALLOWED_MB}MB — silakan pakai link YouTube.`)
      onFileChange(null)
      e.target.value = ''
      return
    }

    setFileError(null)
    onFileChange(file)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('youtube')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'youtube' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Link YouTube
        </button>
        <button type="button" onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Upload File
        </button>
      </div>

      {mode === 'youtube' && (
        <div>
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            defaultValue={defaultYoutubeUrl}
            onChange={(e) => onYoutubeChange(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Video di-set "Unlisted" di YouTube tetap bisa di-embed.</p>
        </div>
      )}

      {mode === 'upload' && (
        <div>
          <input type="file" accept="video/*" onChange={handleFileSelect} className="w-full text-sm" />

          {fileSizeMB !== null && !fileError && (
            <p className="text-xs text-gray-500 mt-1">Ukuran file: {fileSizeMB.toFixed(1)}MB</p>
          )}

          {fileError && (
            <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-700">{fileError}</p>
            </div>
          )}

          {fileSizeMB !== null && fileSizeMB > MAX_RECOMMENDED_MB && !fileError && (
            <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ File ini {fileSizeMB.toFixed(1)}MB, lebih besar dari yang disarankan ({MAX_RECOMMENDED_MB}MB).
                Sebaiknya upload ke YouTube dulu (bisa "Unlisted") lalu pakai link-nya di sini.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}