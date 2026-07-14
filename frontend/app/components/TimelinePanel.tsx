'use client'
import React, {useState} from 'react'

export default function TimelinePanel(){
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/timeline')
      const json = await res.json()
      setEvents(json)
    }catch(e){
      setEvents([])
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={load} className="px-3 py-1 bg-blue-600 text-white rounded">Extract Timeline</button>
      </div>
      <div className="space-y-2">
        {events.map((ev,i)=> (
          <div key={i} className="p-2 bg-white dark:bg-slate-800 rounded">
            <div className="text-sm text-slate-500">{ev.date}</div>
            <div>{ev.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
