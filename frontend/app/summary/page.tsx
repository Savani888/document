'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import SummaryPanel from '../components/SummaryPanel'

export default function SummaryPage() {
  return (
    <PageShell
      title="Summary"
      description="Generate a short, medium, or long AI-powered recap of your uploaded document."
      backHref="/"
      backLabel="Overview"
    >
      <div className="card">
        <SummaryPanel />
      </div>
    </PageShell>
  )
}
