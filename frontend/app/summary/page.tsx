'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import SummaryPanel from '../components/SummaryPanel'

export default function SummaryPage() {
  return (
    <PageShell
      title="Summary"
      description="Create short, medium, or long recaps for the active document."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <SummaryPanel />
      </div>
    </PageShell>
  )
}
