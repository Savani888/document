'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FileText, MessageCircle, AlignLeft, Sparkles, Brain, HelpCircle, ListChecks, ArrowUpRight, Download } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'

const sections = [
  { href: '/', label: 'Overview', icon: AlignLeft },
  { href: '/upload', label: 'Upload', icon: FileText },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/summary', label: 'Summary', icon: AlignLeft },
  { href: '/flashcards', label: 'Flashcards', icon: Sparkles },
  { href: '/insights', label: 'Insights', icon: Brain },
  { href: '/quiz', label: 'Quiz', icon: ListChecks },
  { href: '/timeline', label: 'Timeline', icon: HelpCircle },
  { href: '/export', label: 'Export', icon: Download },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#404040]">
            Document AI
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-tight text-[#171717]">Document Summary Assistant</div>
            <p className="mt-2 text-sm leading-6 text-[#5a5a5a]">A focused workspace for document analysis and knowledge retrieval.</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => {
            const active = pathname === section.href
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className={`flex w-full items-center gap-3 rounded-[16px] border px-3 py-3 text-sm font-medium transition ${active ? 'bg-[#171717] border-[#171717] text-white shadow-sm' : 'border-transparent text-[#404040] hover:bg-[#f5f5f5] hover:border-[#d4d4d4]'}`}
              >
                <Icon size={18} className={active ? 'text-white' : 'text-[#737373]'} />
                <span>{section.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="rounded-[16px] border border-[#e5e5e5] bg-[#fafafa] p-3 text-sm text-[#404040]">
          Built for clarity and precision.
        </div>
        <DarkModeToggle />
      </div>
    </div>
  )
}
