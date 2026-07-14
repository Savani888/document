'use client'
import React, {useState} from 'react'
import { } from '../../lib/api'

export default function FlashcardsPanel(){
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/flashcards')
      const json = await res.json()
      setCards(json)
    }catch(e){
      setCards([])
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={load} className="px-3 py-1 bg-blue-600 text-white rounded">Generate Flashcards</button>
      </div>
      <div className="space-y-2">
        {loading && <div>Generating...</div>}
        {cards.map((c,i)=> (
          <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded">
            <div className="font-semibold">{c.question}</div>
            <div className="text-slate-500 mt-1">{c.answer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
