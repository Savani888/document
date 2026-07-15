'use client'
import React, { useState } from 'react'
import { postSummary } from '../../lib/api'
import { Loader2, Sparkles, ChevronRight } from 'lucide-react'

type Length = 'short' | 'medium' | 'long'

interface SummaryResult {
  summary: string
  length: string
  sources: number[]
}

function parseBullets(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export default function SummaryPanel() {
  const [length, setLength] = useState<Length>('medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [error, setError] = useState('')

  const topK = { short: 5, medium: 10, long: 18 }[length]

  async function run() {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await postSummary(length, topK)
      setResult(res)
    } catch (e: any) {
      let msg = e.message || 'Failed to generate summary.'
      try {
        const p = JSON.parse(msg)
        msg = p.detail || msg
      } catch {}
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const lengths: { key: Length; label: string; desc: string }[] = [
    { key: 'short', label: 'Short', desc: '~2 min read' },
    { key: 'medium', label: 'Medium', desc: '~4 min read' },
    { key: 'long', label: 'Long', desc: '~8 min read' },
  ]

  return (
    <div className="space-y-5">
      {/* Length selector */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#737373]">Summary length</p>
        <div className="flex flex-wrap gap-2">
          {lengths.map(({ key, label, desc }) => (
            <button
              key={key}
              id={`summary-${key}`}
              onClick={() => setLength(key)}
              className={`length-pill ${length === key ? 'length-pill-active' : ''}`}
            >
              <span>{label}</span>
              <span className={`ml-1.5 text-xs ${length === key ? 'text-white/70' : 'text-[#a3a3a3]'}`}>
                {desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        id="generate-summary-btn"
        onClick={run}
        disabled={loading}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Summary
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="status-err">{error}</div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Key Highlights — extract bullet lines */}
          {parseBullets(result.summary).length > 0 && (
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#555555]" />
                <p className="text-sm font-semibold text-[#171717]">
                  Key Points &amp; Summary
                </p>
                <span className="ml-auto rounded-full bg-[#f5f5f5] border border-[#e5e5e5] px-2.5 py-0.5 text-xs font-medium text-[#555555] capitalize">
                  {result.length}
                </span>
              </div>
              <div className="output-box space-y-2">
                {parseBullets(result.summary).map((line, i) => {
                  const isBullet =
                    line.startsWith('•') ||
                    line.startsWith('-') ||
                    line.startsWith('*') ||
                    /^\d+[.)]\s/.test(line)
                  const isHeader = /^#{1,3}\s/.test(line) || (line.endsWith(':') && line.length < 60)
                  return (
                    <div key={i}>
                      {isHeader ? (
                        <p className="mt-3 mb-1 text-sm font-bold text-[#171717] first:mt-0">
                          {line.replace(/^#+\s/, '')}
                        </p>
                      ) : isBullet ? (
                        <div className="flex items-start gap-2">
                          <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-[#a3a3a3]" />
                          <span>{line.replace(/^[•\-*]\s*/, '').replace(/^\d+[.)]\s*/, '')}</span>
                        </div>
                      ) : (
                        <p>{line}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Source pages */}
          {result.sources && result.sources.length > 0 && (
            <p className="text-xs text-[#a3a3a3]">
              Sources: pages{' '}
              {result.sources.map((p, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  <span className="font-semibold text-[#555555]">{p}</span>
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
