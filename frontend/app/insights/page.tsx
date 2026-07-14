'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import InsightsPanel from '../components/InsightsPanel'

export default function InsightsPage() {
  return (
    <PageShell
      title="Insights"
      description="Inspect document signals such as word count and reading time."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <InsightsPanel />
      </div>
    </PageShell>
  )
}
