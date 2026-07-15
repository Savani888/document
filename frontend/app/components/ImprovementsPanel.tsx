'use client'
import React, { useState } from 'react'
import { getImprovements } from '../../lib/api'
import { Loader2, Lightbulb, AlertCircle } from 'lucide-react'

export default function ImprovementsPanel() {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    setSuggestions([])
    setMessage('')
    try {
      const res = await getImprovements()
      if (res.message) setMessage(res.message)
      setSuggestions(res.suggestions || [])
    } catch (e: any) {
      let msg = e.message || 'Failed to get improvement suggestions.'
      try {
        const p = JSON.parse(msg)
        msg = p.detail || msg
      } catch {}
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // Clean up markdown bold markers for display
  const clean = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '$1')

  // Split "1. **Title** — explanation" into title + body
  const parseItem = (s: string): { title: string; body: string } => {
    const cleaned = clean(s).replace(/^\d+[.)]\s*/, '')
    const sep = cleaned.indexOf(' – ') !== -1
      ? ' – '
      : cleaned.indexOf(' - ') !== -1
      ? ' - '
      : ': '
    const idx = cleaned.indexOf(sep)
    if (idx !== -1) {
      return { title: cleaned.slice(0, idx).trim(), body: cleaned.slice(idx + sep.length).trim() }
    }
    return { title: '', body: cleaned }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-[#555555] leading-6">
          Our AI will analyse the uploaded document and return specific, actionable writing and
          content improvement suggestions covering clarity, structure, tone, and completeness.
        </p>
      </div>

      <button
        id="improvements-btn"
        onClick={load}
        disabled={loading}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analysing…
          </>
        ) : (
          <>
            <Lightbulb size={16} />
            Get Improvement Suggestions
          </>
        )}
      </button>

      {error && (
        <div className="status-err flex items-start gap-2">
          <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {message && suggestions.length === 0 && !error && (
        <div className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#555555]">
          {message}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
            {suggestions.length} suggestions
          </p>
          {suggestions.map((s, i) => {
            const { title, body } = parseItem(s)
            return (
              <div key={i} className="suggestion-item flex gap-3">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] border border-[#e5e5e5] text-xs font-semibold text-[#555555]">
                  {i + 1}
                </span>
                <div>
                  {title && <p className="font-semibold text-[#171717] mb-0.5">{title}</p>}
                  <p className="text-[#555555] leading-6">{body}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
