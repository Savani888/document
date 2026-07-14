'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import TimelinePanel from '../components/TimelinePanel'

export default function TimelinePage() {
  return (
    <PageShell
      title="Timeline"
      description="Extract key milestones and events from the document."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <TimelinePanel />
      </div>
    </PageShell>
  )
}
