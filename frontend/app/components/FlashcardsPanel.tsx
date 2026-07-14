'use client'
import React, {useState} from 'react'
import { getFlashcards } from '../../lib/api'

export default function FlashcardsPanel(){
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const json = await getFlashcards()
      setCards(json)
    }catch(e){
      setCards([])
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={load} className="button-primary rounded-full px-3 py-1.5">Generate Flashcards</button>
      </div>
      <div className="space-y-2">
        {loading && <div className="text-sm text-slate-500">Generating...</div>}
        {cards.map((c,i)=> (
          <div key={i} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-800/70 dark:bg-slate-800/80">
            <div className="font-semibold text-slate-900 dark:text-slate-100">{c.question}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.answer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
