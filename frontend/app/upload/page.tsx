'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import Upload from '../components/Upload'

export default function UploadPage() {
  return (
    <PageShell
      title="Upload document"
      description="Add a PDF or image to start the analysis workflow."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <Upload />
      </div>
    </PageShell>
  )
}
