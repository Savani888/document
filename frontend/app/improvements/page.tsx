'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import ImprovementsPanel from '../components/ImprovementsPanel'

export default function ImprovementsPage() {
  return (
    <PageShell
      title="Improvement Suggestions"
      description="AI-powered writing and content suggestions for your uploaded document."
      backHref="/"
      backLabel="Overview"
    >
      <div className="card">
        <ImprovementsPanel />
      </div>
    </PageShell>
  )
}
