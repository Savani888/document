'use client'
import React, {useState} from 'react'

export default function ExportPanel(){
  const [format, setFormat] = useState<'md'|'txt'>('md')
  const [out, setOut] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function run(){
    setLoading(true)
    try{
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/export', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ format })
      })
      const json = await res.json()
      setOut(json.content)
    }catch(e){ setOut('Error') }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <select value={format} onChange={e=>setFormat(e.target.value as any)} className="px-2 py-1 border rounded">
          <option value="md">Markdown</option>
          <option value="txt">Text</option>
        </select>
        <button onClick={run} className="px-3 py-1 bg-blue-600 text-white rounded">Export</button>
      </div>
      {loading && <div>Exporting...</div>}
      {out && <pre className="p-3 bg-white dark:bg-slate-800 rounded max-h-64 overflow-auto">{out}</pre>}
    </div>
  )
}
