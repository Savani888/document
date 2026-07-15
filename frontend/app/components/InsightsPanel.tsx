'use client'
import React, { useState } from 'react'
import { getImprovements } from '../../lib/api'


export default function InsightsPanel(){
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const json = await getImprovements()
      // backend returns: { suggestions: [...] , message?: string }
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
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Improvement Suggestions</div>
              {Array.isArray((insights as any).suggestions) && (
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {(insights as any).suggestions.length} items
                </span>
              )}
            </div>

            {(insights as any).message && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{(insights as any).message}</p>
            )}

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
              {Array.isArray((insights as any).suggestions) && (insights as any).suggestions.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

    </div>
  )
}
