'use client'
import React, {useState} from 'react'

export default function InsightsPanel(){
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/insights')
      const json = await res.json()
      setInsights(json)
    }catch(e){
      setInsights(null)
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={load} className="px-3 py-1 bg-blue-600 text-white rounded">Analyze</button>
      </div>
      {insights && (
        <div>
          <div>Words: {insights.word_count}</div>
          <div>Reading time (min): {insights.reading_time_min}</div>
          <div className="mt-2">Top words:</div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {insights.top_words.map((w:any,i:number)=> (
              <div key={i} className="p-2 bg-white dark:bg-slate-800 rounded text-sm">{w.word} ({w.count})</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
