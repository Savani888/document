'use client'
import React, {useState, useEffect} from 'react'
import { postChat } from '../../lib/api'

export default function ChatPanel(){
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{role:string, text:string, sources?: number[], showSource?: boolean, sourceText?: string}>>([])

  useEffect(()=>{
    // load history
    try{
      const raw = localStorage.getItem('doc_chat_history')
      if(raw){ setMessages(JSON.parse(raw)) }
    }catch(e){}
  }, [])

  useEffect(()=>{
    try{ localStorage.setItem('doc_chat_history', JSON.stringify(messages)) }catch(e){}
  }, [messages])

  async function send(){
    if(!query.trim()) return
    setLoading(true)
    setMessages(prev => [...prev, {role:'user', text: query}])
    try{
      const res = await postChat(query, 5)
      setMessages(prev => [...prev, {role:'assistant', text: res.answer, sources: res.sources}])
    }catch(e){
      setMessages(prev => [...prev, {role:'assistant', text: 'Error contacting server.'}])
    }finally{ setLoading(false); setQuery('') }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-white dark:bg-slate-800 rounded">
        {messages.length===0 && <div className="text-slate-400">Ask questions about the uploaded document.</div>}
        {messages.map((m, i)=> (
          <div key={i} className={m.role==='user'? 'text-right':'text-left'}>
            <div className={m.role==='user'? 'inline-block bg-blue-600 text-white px-3 py-2 rounded':'inline-block bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded'}>
              {m.text}
            </div>
            {m.sources && m.sources.length>0 && (
              <div className="text-xs text-slate-500 mt-1">Source: {m.sources.map((s, idx)=> (
                <button key={idx} className="underline ml-1" onClick={async ()=>{
                  // fetch metadata and show snippet
                  try{
                    const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:8000') + '/metadata')
                    const meta = await res.json()
                    const match = meta.find((m:any)=> m.page===s)
                    if(match){
                      setMessages(prev => prev.map((pm, pi)=> pi===i? {...pm, showSource: !pm.showSource, sourceText: match.text }: pm))
                    }
                  }catch(e){}}
                }>{s}</button>
              ))}
            </div>
            )}
            {m.showSource && m.sourceText && <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-900 rounded text-sm">{m.sourceText.slice(0,500)}</div>}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input className="flex-1 px-3 py-2 rounded border" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask something..." />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={send} disabled={loading}>{loading? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
