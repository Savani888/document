'use client'
import React, {useState} from 'react'
import { getTimeline } from '../../lib/api'

export default function TimelinePanel(){
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const json = await getTimeline()
      setEvents(json)
    }catch(e){
      setEvents([])
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={load} className="button-primary rounded-full px-3 py-1.5">Extract Timeline</button>
      </div>
      <div className="space-y-2">
        {loading && <div className="text-sm text-slate-500">Extracting...</div>}
        {events.map((ev,i)=> (
          <div key={i} className="rounded-2xl border border-slate-200/70 bg-white/80 p-2.5 shadow-sm dark:border-slate-800/70 dark:bg-slate-800/80">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{ev.date}</div>
            <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{ev.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
