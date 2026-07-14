import React from 'react'
import './styles/globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: 'Document Intelligence',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-transparent text-slate-900 dark:text-slate-100">
        <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(30,41,59,0.35),transparent_35%)]">
          <aside className="hidden w-80 border-r border-slate-200/70 bg-white/60 px-5 py-6 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/40 lg:block">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
          <aside className="hidden w-80 border-l border-slate-200/70 bg-white/50 px-5 py-6 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/35 xl:block">
            <div className="glass-card p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Workspace pulse</div>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="panel-surface p-3">
                  <div className="text-slate-500 dark:text-slate-400">Documents analyzed</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">0</div>
                </div>
                <div className="panel-surface p-3">
                  <div className="text-slate-500 dark:text-slate-400">Highlights extracted</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">Live</div>
                </div>
                <div className="panel-surface p-3">
                  <div className="text-slate-500 dark:text-slate-400">Recommended next step</div>
                  <div className="mt-1 font-medium text-slate-900 dark:text-slate-100">Upload a document to begin</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </body>
    </html>
  )
}
