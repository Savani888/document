'use client'
import React, {useState} from 'react'
import { postExport } from '../../lib/api'

export default function ExportPanel(){
  const [format, setFormat] = useState<'md'|'txt'>('md')
  const [out, setOut] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function run(){
    setLoading(true)
    try{
      const json = await postExport(format)
      setOut(json.content)
    }catch(e){ setOut('Error') }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <select value={format} onChange={e=>setFormat(e.target.value as any)} className="input-base rounded-full px-3 py-1.5 text-sm">
          <option value="md">Markdown</option>
          <option value="txt">Text</option>
        </select>
        <button onClick={run} className="button-primary rounded-full px-3 py-1.5">Export</button>
      </div>
      {loading && <div className="text-sm text-slate-500">Exporting...</div>}
      {out && <pre className="max-h-64 overflow-auto rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3 text-sm text-slate-600 shadow-inner dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">{out}</pre>}
    </div>
  )
}
