'use client'
import React, {useState} from 'react'
import { postSummary } from '../../lib/api'

export default function SummaryPanel(){
  const [length, setLength] = useState<'short'|'medium'|'long'>('short')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  async function run(){
    setLoading(true)
    try{
      const res = await postSummary(length, 8)
      setSummary(res.summary)
    }catch(e){
      setSummary('Error generating summary')
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['short','medium','long'] as const).map((option) => (
          <button key={option} onClick={()=>setLength(option)} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${length===option ? 'button-primary' : 'border border-slate-300/70 bg-white/80 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200'}`}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
        <button onClick={run} className="ml-auto button-primary rounded-full px-3 py-1.5">Generate</button>
      </div>
      <div className="min-h-[140px] rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm leading-7 text-slate-600 shadow-inner dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">
        {loading && <div className="text-slate-500">Generating...</div>}
        {summary && <div>{summary}</div>}
      </div>
    </div>
  )
}
