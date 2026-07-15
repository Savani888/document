'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  FileText,
  MessageCircle,
  AlignLeft,
  Sparkles,
  Brain,
  HelpCircle,
  ListChecks,
  Download,
  Lightbulb,
  LayoutGrid,
} from 'lucide-react'

const sections = [
  { href: '/', label: 'Overview', icon: LayoutGrid },
  { href: '/upload', label: 'Upload', icon: FileText },
  { href: '/summary', label: 'Summary', icon: AlignLeft },
  { href: '/improvements', label: 'Improvements', icon: Lightbulb },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/flashcards', label: 'Flashcards', icon: Sparkles },
  { href: '/insights', label: 'Insights', icon: Brain },
  { href: '/quiz', label: 'Quiz', icon: ListChecks },
  { href: '/timeline', label: 'Timeline', icon: HelpCircle },
  { href: '/export', label: 'Export', icon: Download },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full flex-col justify-between py-6 px-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="space-y-2 px-1">
          <div className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#737373]">
            Document AI
          </div>
          <div className="text-lg font-semibold leading-tight tracking-tight text-[#171717]">
            DocSummarizer
          </div>
          <p className="text-xs leading-5 text-[#737373]">
            AI-powered document analysis workspace
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e5e5]" />

        {/* Nav */}
        <nav className="space-y-0.5">
          {sections.map((section) => {
            const active = pathname === section.href
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'border-[#171717] bg-[#171717] text-white shadow-sm'
                    : 'border-transparent text-[#555555] hover:bg-[#f5f5f5] hover:border-[#e5e5e5] hover:text-[#111111]'
                }`}
              >
                <Icon
                  size={16}
                  className={`flex-shrink-0 ${active ? 'text-white' : 'text-[#a3a3a3]'}`}
                />
                <span>{section.label}</span>
                {section.href === '/improvements' && (
                  <span className="ml-auto rounded-full bg-[#f0fdf4] border border-[#bbf7d0] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                    New
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-3 text-xs text-[#737373] leading-5">
        Upload a PDF or image first, then use any tool in the sidebar.
      </div>
    </aside>
  )
}
