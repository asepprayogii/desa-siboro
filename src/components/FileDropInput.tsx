'use client'

import { useRef, useState } from 'react'

interface FileDropInputProps {
  id: string
  accept: string
  kind?: 'image' | 'video'
  onFileSelect: (file: File | null) => void
  previewUrl?: string | null
  helperText?: string
}

export default function FileDropInput({ id, accept, kind = 'image', onFileSelect, previewUrl, helperText }: FileDropInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    if (file) {
      setLocalPreview(kind === 'image' ? URL.createObjectURL(file) : null)
      setFileName(file.name)
    } else {
      setLocalPreview(null)
      setFileName(null)
    }
    onFileSelect(file)
  }

  function handleClear() {
    setLocalPreview(null)
    setFileName(null)
    onFileSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const displayImage = kind === 'image' ? localPreview || previewUrl : null

  return (
    <div>
      <input ref={inputRef} id={id} type="file" accept={accept} onChange={handleChange} className="hidden" />

      {!displayImage && !fileName && (
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/40 rounded-xl px-6 py-8 cursor-pointer transition-colors text-center"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Klik untuk pilih file</p>
          {helperText && <p className="text-xs text-gray-400">{helperText}</p>}
        </label>
      )}

      {displayImage && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
          <label
            htmlFor={id}
            className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer text-white text-sm font-medium"
          >
            Ganti Gambar
          </label>
        </div>
      )}

      {fileName && kind === 'video' && !displayImage && (
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-700 truncate flex-1">{fileName}</p>
        </div>
      )}

      {(displayImage || fileName) && (
        <button type="button" onClick={handleClear} className="mt-2 text-xs text-red-600 font-medium">
          Hapus file
        </button>
      )}
    </div>
  )
}