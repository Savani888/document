'use client'
import React, {useState, useEffect} from 'react'
import { postChat, getMetadata } from '../../lib/api'

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
    <div className="flex h-full flex-col gap-3">
      <div className="flex-1 overflow-auto rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-inner dark:border-slate-800/70 dark:bg-slate-900/70">
        {messages.length===0 && <div className="text-sm text-slate-400">Ask questions about the uploaded document.</div>}
        {messages.map((m, i)=> (
          <div key={i} className={m.role==='user'? 'mt-3 text-right':'mt-3 text-left'}>
            <div className={m.role==='user'? 'ml-auto max-w-[85%] rounded-2xl bg-slate-900 px-3 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900':'max-w-[85%] rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200'}>
              {m.text}
            </div>
            {m.sources && m.sources.length>0 && (
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Source: {m.sources.map((s, idx)=> (
                <button key={idx} className="ml-1 underline" onClick={async ()=>{
                  try{
                    const meta = await getMetadata()
                    const match = meta.find((entry:any)=> entry.page===s)
                    if(match){
                      setMessages(prev => prev.map((pm, pi)=> pi===i? {...pm, showSource: !pm.showSource, sourceText: match.text }: pm))
                    }
                  }catch(e){}
                }}>{s}</button>
              ))}
            </div>
            )}
            {m.showSource && m.sourceText && <div className="mt-2 rounded-2xl border border-slate-200/70 bg-white/70 p-2 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300">{m.sourceText.slice(0,500)}</div>}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input className="input-base flex-1 rounded-full px-4 py-2.5" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask something..." />
        <button className="button-primary rounded-full px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60" onClick={send} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
