'use client'

import { useEffect, useState, useRef } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'

export default function NYXORASection() {
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
      id="nyxora-section"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden"
      aria-labelledby="nyxora-heading"
    >
      <div className="relative z-10 max-w-7xl w-full">
        <ProjectShowcase
          number="01"
          title="NYXORA"
          subtitle="MESSENGER REIMAGINED"
          categoryBadge="MESSENGER"
          description="A modern messenger application built with Next.js and Supabase, featuring authentication, real-time 1-to-1 messaging, PostgreSQL database integration, message receipts, and input validation."
          techStack={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Zod']}
          status={{
            label: 'LIVE',
            color: '#10b981',
            detail: 'DEPLOYED ON VERCEL'
          }}
          previewContent={<NYXORAPreview />}
          parallax={parallax}
          visible={visible}
          index={0}
        />
      </div>
    </section>
  )
}

export function NYXORAPreview() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-2.5 font-sans select-none p-0.5 sm:p-1">
      {/* Left Sidebar Pane: Conversation List (hidden on mobile to spotlight active chat stream) */}
      <div className="hidden md:flex md:w-[40%] rounded-xl bg-[#0e0c18]/95 border border-purple-500/15 p-3 flex-col gap-2.5">
        {/* Brand Header */}
        <div className="flex items-center gap-2 px-1 py-0.5">
          <div className="w-4 h-4 rounded bg-primary-purple/30 border border-primary-purple flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.4)]">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-purple" />
          </div>
          <span className="font-display font-bold text-xs text-primary-text tracking-wider">NYXORA</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary-text/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            readOnly
            placeholder="Search conversations..."
            className="w-full bg-[#151224] rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-primary-text placeholder-secondary-text/40 border border-purple-500/10 focus:outline-none"
          />
        </div>

        {/* Conversation List */}
        <div className="flex flex-col gap-1 overflow-hidden">
          {/* Active Chat: Arjun */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-primary-purple/15 border border-primary-purple/30">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#4C1D95] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0e0c18]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary-text truncate">Arjun</span>
                <span className="text-[10px] text-purple-300/60 font-mono">11:24 PM</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-primary-purple font-medium">typing...</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-primary-purple animate-bounce" />
                  <span className="w-1 h-1 rounded-full bg-primary-purple animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 rounded-full bg-primary-purple animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          </div>

          {/* Chat 2: Priya */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-secondary-text">
              P
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-text truncate">Priya</span>
                <span className="text-[10px] text-secondary-text/40 font-mono">10:15 PM</span>
              </div>
              <p className="text-[10px] text-secondary-text/50 truncate mt-0.5">Let&apos;s build!</p>
            </div>
          </div>

          {/* Chat 3: Karthik */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-secondary-text">
              K
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-text truncate">Karthik</span>
                <span className="text-[10px] text-secondary-text/40 font-mono">Yesterday</span>
              </div>
              <p className="text-[10px] text-secondary-text/50 truncate mt-0.5">Sent a file</p>
            </div>
          </div>

          {/* Chat 4: Divya */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-secondary-text">
              D
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-text truncate">Divya</span>
                <span className="text-[10px] text-secondary-text/40 font-mono">Yesterday</span>
              </div>
              <p className="text-[10px] text-secondary-text/50 truncate mt-0.5">That&apos;s perfect!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Main Pane: Active Conversation Stream */}
      <div className="flex-1 rounded-xl bg-[#0e0c18]/95 border border-purple-500/15 p-3.5 flex flex-col justify-between">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#4C1D95] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_8px_rgba(139,92,246,0.4)]">
              A
            </div>
            <div>
              <p className="text-xs font-semibold text-primary-text leading-tight">Arjun</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="text-[10px] text-emerald-400 font-mono leading-none">Online</span>
              </div>
            </div>
          </div>

          {/* Actions: Call, Video, More */}
          <div className="flex items-center gap-2 text-secondary-text/60">
            <div className="w-6 h-6 rounded-md hover:bg-white/5 flex items-center justify-center cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="w-6 h-6 rounded-md hover:bg-white/5 flex items-center justify-center cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
            <div className="w-6 h-6 rounded-md hover:bg-white/5 flex items-center justify-center cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </div>
          </div>
        </div>

        {/* Message Bubble Stream */}
        <div className="py-3 flex flex-col gap-2.5 overflow-hidden">
          {/* Message 1: Received */}
          <div className="flex flex-col items-start max-w-[82%]">
            <div className="rounded-2xl rounded-tl-sm bg-[#161326] border border-purple-500/15 px-3.5 py-2 text-xs text-primary-text/90 leading-relaxed shadow-sm">
              Hey! How&apos;s the project going?
            </div>
            <span className="text-[9px] font-mono text-secondary-text/40 mt-1 ml-1">11:20 PM</span>
          </div>

          {/* Message 2: Sent (Rich Violet Bubble matching reference) */}
          <div className="flex flex-col items-end self-end max-w-[85%]">
            <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] border border-purple-300/30 px-3.5 py-2 text-xs text-white leading-relaxed shadow-[0_4px_16px_rgba(109,40,217,0.4)]">
              It&apos;s coming along well! Just finishing the UI.
            </div>
            <span className="text-[9px] font-mono text-purple-300/60 mt-1 mr-1">11:22 PM</span>
          </div>

          {/* Message 3: Received */}
          <div className="flex flex-col items-start max-w-[82%]">
            <div className="rounded-2xl rounded-tl-sm bg-[#161326] border border-purple-500/15 px-3.5 py-2 text-xs text-primary-text/90 leading-relaxed shadow-sm">
              Looks great! 🔥
            </div>
            <span className="text-[9px] font-mono text-secondary-text/40 mt-1 ml-1">11:24 PM</span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-500/10">
          <div className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-secondary-text/60 cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </div>
          <div className="flex-1">
            <input
              type="text"
              readOnly
              placeholder="Type a message..."
              className="w-full bg-[#151224] rounded-lg px-3 py-1.5 text-xs text-primary-text placeholder-secondary-text/40 border border-purple-500/10 focus:outline-none"
            />
          </div>
          <div className="w-7 h-7 rounded-lg bg-primary-purple flex items-center justify-center text-white shadow-[0_0_12px_rgba(139,92,246,0.6)] cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}