'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import FlashcardsPanel from '../components/FlashcardsPanel'

export default function FlashcardsPage() {
  return (
    <PageShell
      title="Flashcards"
      description="Generate study cards that turn the document into bite-size review prompts."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <FlashcardsPanel />
      </div>
    </PageShell>
  )
}
