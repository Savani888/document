import React from 'react'
import Upload from './components/Upload'
import ChatPanel from './components/ChatPanel'
import SummaryPanel from './components/SummaryPanel'
import InsightsPanel from './components/InsightsPanel'
import FlashcardsPanel from './components/FlashcardsPanel'
import QuizPanel from './components/QuizPanel'
import TimelinePanel from './components/TimelinePanel'
import ExportPanel from './components/ExportPanel'

export default function Page(){
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <section className="bg-white dark:bg-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Upload</h2>
            <Upload />
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Chat</h2>
            <ChatPanel />
          </section>
        </div>

        <aside className="space-y-4">
          <section className="bg-white dark:bg-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <SummaryPanel />
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Insights</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Quick actions</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded" onClick={()=>{ const el = document.getElementById('insights'); if(el) el.scrollIntoView({behavior:'smooth'}) }}>Open Insights</button>
                  <button className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded" onClick={()=>{ const el = document.getElementById('flashcards'); if(el) el.scrollIntoView({behavior:'smooth'}) }}>Flashcards</button>
                </div>
              </div>
              <div id="insights"><InsightsPanel /></div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded" id="flashcards">
            <h2 className="text-lg font-semibold mb-2">Flashcards</h2>
            {/* @ts-ignore */}
            <div><FlashcardsPanel /></div>
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded" id="quiz">
            <h2 className="text-lg font-semibold mb-2">Quiz</h2>
            <QuizPanel />
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded" id="timeline">
            <h2 className="text-lg font-semibold mb-2">Timeline</h2>
            <TimelinePanel />
          </section>

          <section className="bg-white dark:bg-slate-800 p-4 rounded" id="export">
            <h2 className="text-lg font-semibold mb-2">Export</h2>
            <ExportPanel />
          </section>
        </aside>
      </div>
    </main>
  )
}
