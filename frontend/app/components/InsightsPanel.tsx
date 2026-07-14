'use client'
import React, {useState} from 'react'
import { getInsights } from '../../lib/api'

export default function InsightsPanel(){
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const json = await getInsights()
      setInsights(json)
    }catch(e){
      setInsights(null)
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={load} className="button-primary rounded-full px-3 py-1.5">Analyze</button>
      </div>
      {loading && <div className="text-sm text-slate-500">Analyzing...</div>}
      {insights && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3 text-sm dark:border-slate-800/70 dark:bg-slate-900/70">
              <div className="text-slate-500 dark:text-slate-400">Words</div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{insights.word_count}</div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3 text-sm dark:border-slate-800/70 dark:bg-slate-900/70">
              <div className="text-slate-500 dark:text-slate-400">Read time</div>
              <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{insights.reading_time_min} min</div>
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Top words</div>
            <div className="grid grid-cols-2 gap-2">
              {insights.top_words.map((w:any,i:number)=> (
                <div key={i} className="rounded-2xl border border-slate-200/70 bg-white/80 p-2 text-sm text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-800/80 dark:text-slate-300">{w.word} ({w.count})</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
