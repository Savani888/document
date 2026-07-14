'use client'
import React, { useState } from 'react'
import { postUpload } from '../../lib/api'

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!file) {
      setStatus('Please select a file first.')
      return
    }

    setLoading(true)
    setStatus('Uploading...')
    try {
      const res = await postUpload(file)
      setStatus(`Uploaded ${res.filename} (${res.pages} pages)`)
    } catch (err: any) {
      setStatus(err.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <label className="upload-area cursor-pointer flex flex-col items-center justify-center px-6 py-8 text-center">
        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Choose a PDF or image</div>
        <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">Supports .pdf, .png, .jpg, .jpeg</div>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="sr-only"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="button-primary rounded-full px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
        <div className="text-sm text-slate-600 dark:text-slate-300">{file ? file.name : 'No file selected yet'}</div>
      </div>
      {status ? <p className="rounded-2xl border border-slate-200/70 bg-slate-50/70 px-3 py-2 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">{status}</p> : null}
    </div>
  )
}
