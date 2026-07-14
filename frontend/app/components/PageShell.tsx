import Link from 'next/link'
import React from 'react'

type PageShellProps = {
  title: string
  description: string
  children: React.ReactNode
  backHref?: string
  backLabel?: string
}

export default function PageShell({
  title,
  description,
  children,
  backHref = '/',
  backLabel = 'Overview',
}: PageShellProps) {
  return (
    <main className="min-h-screen py-2 sm:py-4">
      <div className="glass-card overflow-hidden p-5 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/70 pb-6 dark:border-slate-800/70 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Link href={backHref} className="inline-flex items-center rounded-full border border-[#d4d4d4] bg-[#fafafa] px-3 py-1 text-sm font-medium text-[#404040] transition hover:border-[#b3b3b3] hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              ← {backLabel}
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] dark:text-slate-100">{title}</h1>
            <p className="mt-2 text-base leading-7 text-[#404040] dark:text-slate-300">{description}</p>
          </div>
          <div className="panel-surface p-4 text-sm text-slate-600 dark:text-slate-300">
            Navigate the workspace with the sidebar to move between documents, chat, summaries, and study tools.
          </div>
        </div>
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </main>
  )
}
