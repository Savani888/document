import React from 'react'
import './styles/globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: 'DocSummarizer – AI Document Analysis',
  description:
    'Upload a PDF or scanned image, get an AI-powered summary, key highlights and improvement suggestions instantly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-shell">
          {/* Sidebar — hidden on mobile, fixed on desktop */}
          <aside className="sidebar-panel">
            <Sidebar />
          </aside>

          {/* Main content */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
