'use client'

import Link from 'next/link'
import React from 'react'
import { ArrowRight, FileText, AlignLeft, Lightbulb, MessageCircle, Sparkles, Brain, ListChecks, Clock, Download } from 'lucide-react'

const sections = [
  {
    href: '/upload',
    title: 'Upload Document',
    description: 'Load a PDF or image. Scanned images are processed with OCR automatically.',
    icon: FileText,
    step: '1',
  },
  {
    href: '/summary',
    title: 'Summary',
    description: 'Generate short, medium, or long AI summaries with key highlights.',
    icon: AlignLeft,
    step: '2',
  },
  {
    href: '/improvements',
    title: 'Improvement Suggestions',
    description: 'Get AI-powered writing and structure suggestions to improve your document.',
    icon: Lightbulb,
    step: '3',
    badge: 'New',
  },
  {
    href: '/chat',
    title: 'Chat',
    description: 'Ask grounded questions about your document. Answers cite page numbers.',
    icon: MessageCircle,
  },
  {
    href: '/flashcards',
    title: 'Flashcards',
    description: 'Turn document ideas into study-ready flashcard prompts.',
    icon: Sparkles,
  },
  {
    href: '/insights',
    title: 'Insights',
    description: 'Word counts, reading time, and top keyword frequency analysis.',
    icon: Brain,
  },
  {
    href: '/quiz',
    title: 'Quiz',
    description: 'Test understanding with AI-generated comprehension questions.',
    icon: ListChecks,
  },
  {
    href: '/timeline',
    title: 'Timeline',
    description: 'Surface chronological milestones and major events from the document.',
    icon: Clock,
  },
  {
    href: '/export',
    title: 'Export',
    description: 'Share generated output in Markdown or plain text format.',
    icon: Download,
  },
]

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#737373]">
              Document Intelligence
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
              AI-powered document analysis
            </h1>
            <p className="text-base leading-7 text-[#555555]">
              Upload a PDF or scanned image to extract text, generate summaries, get improvement suggestions, and more.
            </p>
            <Link
              href="/upload"
              id="get-started-btn"
              className="btn-primary inline-flex w-fit"
            >
              Get started — Upload a document
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-5 text-sm text-[#555555] lg:w-64 lg:flex-shrink-0">
            <div className="font-semibold text-[#171717] mb-2">How it works</div>
            <ol className="space-y-1.5">
              {['Upload PDF or image', 'AI extracts text (with OCR for images)', 'Generate summary or ask questions', 'Get improvement suggestions'].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#111111] text-[9px] font-bold text-white">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="card-surface group p-5 block transition duration-200 hover:-translate-y-0.5 hover:border-[#c4c4c4] hover:shadow-[0_14px_40px_-24px_rgba(23,23,23,0.12)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {section.step && (
                    <span className="step-badge text-[11px]">{section.step}</span>
                  )}
                  {!section.step && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e5e5] bg-[#fafafa]">
                      <Icon size={15} className="text-[#737373]" />
                    </div>
                  )}
                  <h2 className="text-sm font-semibold text-[#171717]">{section.title}</h2>
                </div>
                {section.badge && (
                  <span className="rounded-full bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                    {section.badge}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#737373]">{section.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#555555] transition group-hover:text-[#111111]">
                Open <ArrowRight size={13} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
