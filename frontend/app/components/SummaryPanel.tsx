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
      <div className="flex gap-2">
        <button onClick={()=>setLength('short')} className={`px-3 py-1 rounded ${length==='short'? 'bg-slate-900 text-white':'bg-slate-100'}`}>Short</button>
        <button onClick={()=>setLength('medium')} className={`px-3 py-1 rounded ${length==='medium'? 'bg-slate-900 text-white':'bg-slate-100'}`}>Medium</button>
        <button onClick={()=>setLength('long')} className={`px-3 py-1 rounded ${length==='long'? 'bg-slate-900 text-white':'bg-slate-100'}`}>Long</button>
        <button onClick={run} className="ml-auto px-3 py-1 bg-blue-600 text-white rounded">Generate</button>
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded min-h-[120px]">
        {loading && <div className="text-slate-500">Generating...</div>}
        {summary && <div>{summary}</div>}
      </div>
    </div>
  )
}
