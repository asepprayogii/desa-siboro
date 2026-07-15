'use client'

import { useState } from 'react'
import FileDropInput from './FileDropInput'

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

  function handleFileSelect(file: File | null) {
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
      return
    }

    setFileError(null)
    onFileChange(file)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('youtube')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'youtube' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
          Link YouTube
        </button>
        <button type="button" onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'upload' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
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
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1.5">Video "Unlisted" di YouTube tetap bisa di-embed.</p>
        </div>
      )}

      {mode === 'upload' && (
        <div>
          <FileDropInput
            id="video-berita"
            accept="video/*"
            kind="video"
            onFileSelect={handleFileSelect}
            helperText={`Maks ${MAX_ALLOWED_MB}MB`}
          />

          {fileSizeMB !== null && !fileError && (
            <p className="text-xs text-gray-500 mt-1.5">Ukuran file: {fileSizeMB.toFixed(1)}MB</p>
          )}

          {fileError && (
            <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-3">
              <p className="text-sm text-red-700">{fileError}</p>
            </div>
          )}

          {fileSizeMB !== null && fileSizeMB > MAX_RECOMMENDED_MB && !fileError && (
            <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                File ini {fileSizeMB.toFixed(1)}MB, lebih besar dari rekomendasi ({MAX_RECOMMENDED_MB}MB). Sebaiknya upload ke YouTube dulu supaya website tetap ringan.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}