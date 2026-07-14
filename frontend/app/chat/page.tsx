'use client'

import React from 'react'
import PageShell from '../components/PageShell'
import ChatPanel from '../components/ChatPanel'

export default function ChatPage() {
  return (
    <PageShell
      title="Chat"
      description="Ask questions and review grounded responses from the uploaded document."
      backHref="/"
      backLabel="Overview"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/80">
        <ChatPanel />
      </div>
    </PageShell>
  )
}
