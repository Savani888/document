'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import ExportPanel from '../components/ExportPanel'

export default function ExportPage() {
  return (
    <PageShell
      title="Export"
      description="Export the generated summary or study content in your preferred format."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <ExportPanel />
      </div>
    </PageShell>
  )
}
