'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import QuizPanel from '../components/QuizPanel'

export default function QuizPage() {
  return (
    <PageShell
      title="Quiz"
      description="Generate practice questions to test understanding."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <QuizPanel />
      </div>
    </PageShell>
  )
}
