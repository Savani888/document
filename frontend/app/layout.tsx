import React from 'react'
import './styles/globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: 'Document Intelligence',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="min-h-screen flex">
          <aside className="w-72 border-r border-slate-200 dark:border-slate-800 p-4">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 p-4 hidden md:block">
            <div className="text-sm text-slate-500">Document Stats & Key Topics</div>
          </aside>
        </div>
      </body>
    </html>
  )
}
