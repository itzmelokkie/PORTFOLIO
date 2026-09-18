'use client'

import { useEffect, useState, useRef } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'

export default function AIDocSection() {
  const [visible, setVisible] = useState(false)
  const [parallax, setParallax] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    observer.observe(element)

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = 1 - rect.top / (windowHeight + rect.height)
          setParallax(Math.max(-25, Math.min(25, progress * 20 - 10)))
        }
        rafId = null
      })
    }

    const parallaxObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll()
        } else {
          window.removeEventListener('scroll', handleScroll)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      },
      { rootMargin: '100px 0px' }
    )
    parallaxObserver.observe(element)

    return () => {
      observer.disconnect()
      parallaxObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ai-doc-section"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden"
      aria-labelledby="ai-doc-heading"
    >
      <div className="relative z-10 max-w-7xl w-full">
        <ProjectShowcase
          number="03"
          title="AI-DOC"
          subtitle="INTELLIGENT VAULT"
          categoryBadge="DOCUMENT AI"
          description="A smart digital document repository featuring automated OCR, semantic vector search, AI summarization, and encrypted cloud storage for rapid document retrieval."
          techStack={['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS']}
          status={{
            label: 'IN BETA',
            color: '#3b82f6',
            detail: 'TESTNET DEPLOYMENT'
          }}
          previewContent={<AIDocPreview />}
          parallax={parallax}
          visible={visible}
          index={2}
        />
      </div>
    </section>
  )
}

export function AIDocPreview() {
  return (
    <div className="w-full h-full flex flex-col gap-3 font-sans select-none p-1">
      {/* Search Header Bar */}
      <div className="rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-purple/15 border border-primary-purple/30 flex items-center justify-center text-primary-purple">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div className="flex-1 relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary-text/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            readOnly
            placeholder="Search documents with natural language..."
            className="w-full bg-[#151224] rounded-lg pl-8 pr-3 py-1.5 text-xs text-primary-text placeholder-secondary-text/40 border border-purple-500/10 focus:outline-none"
          />
        </div>
        <span className="text-[10px] font-mono text-purple-300/60 bg-purple-900/30 border border-purple-500/20 rounded-md px-2 py-1">
          128 DOCS
        </span>
      </div>

      {/* Document Records */}
      <div className="flex-1 rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
              PDF
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary-text truncate">Q4_Financial_Report.pdf</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono text-secondary-text/50">2.4 MB</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 sm:px-1.5 py-0.2 rounded border border-emerald-500/20">OCR</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs text-purple-300 font-mono shrink-0 ml-1">98%</span>
        </div>

        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-purple/15 border border-primary-purple/30 flex items-center justify-center text-primary-purple font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
              AI
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary-text truncate">Project_Architecture_V2.docx</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono text-secondary-text/50">1.8 MB</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-primary-purple bg-purple-500/10 px-1 sm:px-1.5 py-0.2 rounded border border-purple-500/20">Summary</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs text-secondary-text/50 font-mono shrink-0 ml-1">92%</span>
        </div>

        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
              API
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary-text truncate">Cloud_Endpoints_Schema.json</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono text-secondary-text/50">450 KB</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-blue-400 bg-blue-500/10 px-1 sm:px-1.5 py-0.2 rounded border border-blue-500/20">Verified</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs text-secondary-text/50 font-mono shrink-0 ml-1">87%</span>
        </div>
      </div>
    </div>
  )
}