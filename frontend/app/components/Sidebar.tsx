'use client'
import React from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Sidebar(){
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">NotebookLM Lite</div>
      <nav className="space-y-2">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Upload</button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Chat</button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Summary</button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Flashcards</button>
      </nav>
      <div className="pt-4 text-xs text-slate-500">Modern • Minimal • Responsive</div>
      <div className="pt-4">
        {/* Dark mode toggle */}
        <DarkModeToggle />
      </div>
    </div>
  )
}
