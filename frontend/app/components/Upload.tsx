'use client'
import React, { useState, useRef, useCallback } from 'react'
import { postUpload } from '../../lib/api'
import { FileText, Image, UploadCloud, CheckCircle2, XCircle, Loader2, X } from 'lucide-react'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface UploadResult {
  filename: string
  pages: number
  word_count: number
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<UploadResult | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp']

  const pickFile = (f: File | null) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type)) {
      setMessage('Unsupported file type. Please upload a PDF, PNG, JPG, or WEBP.')
      setStatus('error')
      return
    }
    setFile(f)
    setStatus('idle')
    setMessage('')
    setResult(null)
  }

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    pickFile(f || null)
  }, [])

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.')
      setStatus('error')
      return
    }
    setStatus('uploading')
    setMessage('Uploading and extracting text…')
    try {
      const res: UploadResult = await postUpload(file)
      setResult(res)
      setStatus('success')
      setMessage(`Successfully processed "${res.filename}"`)
    } catch (err: any) {
      let msg = err.message || 'Upload failed.'
      try {
        const parsed = JSON.parse(msg)
        msg = parsed.detail || msg
      } catch {}
      setMessage(msg)
      setStatus('error')
    }
  }

  const reset = () => {
    setFile(null)
    setStatus('idle')
    setMessage('')
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const isPDF = file?.type === 'application/pdf'
  const isImage = file && file.type.startsWith('image/')

  return (
    <div className="space-y-5">
      {/* Drop Zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`drop-zone group select-none cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-[#111111] bg-[#f0f0f0] scale-[1.01]' : ''
        } ${file ? 'py-8' : 'py-14'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="sr-only"
          onChange={(e) => pickFile(e.target.files?.[0] || null)}
        />

        {!file ? (
          <>
            <UploadCloud
              size={40}
              className="mb-4 text-[#a3a3a3] transition-colors group-hover:text-[#111111]"
            />
            <p className="text-base font-semibold text-[#171717]">
              Drag & drop a file here, or click to browse
            </p>
            <p className="mt-1.5 text-sm text-[#737373]">
              Supports PDF, PNG, JPG, WEBP — scanned images use OCR automatically
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs font-medium text-[#555555]">
                <FileText size={12} /> PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-white px-3 py-1 text-xs font-medium text-[#555555]">
                <Image size={12} /> Images (OCR)
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 shadow-sm">
              {isPDF ? (
                <FileText size={22} className="flex-shrink-0 text-[#555555]" />
              ) : (
                <Image size={22} className="flex-shrink-0 text-[#555555]" />
              )}
              <div className="text-left">
                <p className="text-sm font-semibold text-[#171717] leading-tight">{file.name}</p>
                <p className="text-xs text-[#737373]">
                  {(file.size / 1024).toFixed(1)} KB ·{' '}
                  {isPDF ? 'PDF — direct text extraction' : 'Image — OCR will extract text'}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); reset() }}
                className="ml-2 rounded-full p-1 text-[#a3a3a3] hover:bg-[#f5f5f5] hover:text-[#555555] transition"
                title="Remove file"
              >
                <X size={15} />
              </button>
            </div>
            <p className="text-xs text-[#737373]">Click the zone to replace this file</p>
          </div>
        )}
      </div>

      {/* Action */}
      {file && status !== 'success' && (
        <button
          id="upload-btn"
          onClick={handleUpload}
          disabled={status === 'uploading'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <UploadCloud size={16} />
              Upload & Extract Text
            </>
          )}
        </button>
      )}

      {/* Status */}
      {message && (
        <div className={status === 'error' ? 'status-err' : status === 'success' ? 'status-ok' : 'rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#555555]'}>
          <div className="flex items-start gap-2">
            {status === 'success' && <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#166534]" />}
            {status === 'error' && <XCircle size={16} className="mt-0.5 flex-shrink-0 text-[#991b1b]" />}
            {status === 'uploading' && <Loader2 size={16} className="mt-0.5 flex-shrink-0 animate-spin text-[#555555]" />}
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Result card */}
      {result && status === 'success' && (
        <div className="rounded-2xl border border-[#d1fae5] bg-[#f0fdf4] p-5 space-y-3">
          <p className="text-sm font-semibold text-[#166534]">Document indexed successfully</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'File', value: result.filename },
              { label: 'Pages', value: result.pages },
              { label: 'Words', value: result.word_count?.toLocaleString() ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-[#bbf7d0] bg-white px-3 py-2">
                <p className="text-xs text-[#4ade80] font-medium">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-[#166534] truncate">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#4b7a5e]">
            You can now generate a <strong>Summary</strong>, ask questions in <strong>Chat</strong>, or get <strong>Improvement Suggestions</strong>.
          </p>
          <button onClick={reset} className="btn-outline text-xs px-3 py-1.5">
            Upload another document
          </button>
        </div>
      )}
    </div>
  )
}
