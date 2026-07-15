'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import Upload from '../components/Upload'

export default function UploadPage() {
  return (
    <PageShell
      title="Upload Document"
      description="Add a PDF or image file. Scanned images and photos will have text extracted via OCR."
      backHref="/"
      backLabel="Overview"
    >
      <div className="card">
        <Upload />
      </div>
    </PageShell>
  )
}
