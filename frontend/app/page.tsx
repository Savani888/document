'use client'

import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

const sections = [
  { href: '/upload', title: 'Upload', description: 'Load a PDF or image and begin analysis.' },
  { href: '/chat', title: 'Chat', description: 'Ask grounded questions about the document.' },
  { href: '/summary', title: 'Summary', description: 'Generate concise or detailed recaps.' },
  { href: '/flashcards', title: 'Flashcards', description: 'Turn ideas into study-ready prompts.' },
  { href: '/insights', title: 'Insights', description: 'Inspect word counts and reading signals.' },
  { href: '/quiz', title: 'Quiz', description: 'Test understanding with generated questions.' },
  { href: '/timeline', title: 'Timeline', description: 'Surface milestones and major events.' },
  { href: '/export', title: 'Export', description: 'Share generated output in Markdown or text.' },
]

export default function Page() {
  return (
    <main className="min-h-screen space-y-6 py-6">
      <section className="glass-card overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center rounded-full border border-[#d4d4d4] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#404040]">
              Document intelligence workspace
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">A refined workspace for document intelligence.</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#404040]">Open each section in its own focused view to keep the workflow clean, precise, and easy to navigate.</p>
            </div>
          </div>
          <div className="rounded-[20px] border border-[#e5e5e5] bg-[#fafafa] p-5 text-sm text-[#404040] shadow-sm">
            <div className="font-medium text-[#171717]">Recommended action</div>
            <div className="mt-1">Upload a document to begin reviewing content and generating insights.</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group card-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#c4c4c4] hover:shadow-[0_14px_40px_-24px_rgba(23,23,23,0.12)]">
            <h2 className="text-lg font-semibold text-[#171717] transition group-hover:text-[#404040]">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#404040]">{section.description}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#404040]">
              <span>Open section</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
