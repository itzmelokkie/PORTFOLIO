'use client'

import { useEffect, useState, useRef } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'

export default function OdinSection() {
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
      id="odin-section"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden"
      aria-labelledby="odin-heading"
    >
      <div className="relative z-10 max-w-7xl w-full">
        <ProjectShowcase
          number="05"
          title="ODIN"
          subtitle="VOICE INTELLIGENCE"
          categoryBadge="VOICE AI"
          description="An autonomous contextual voice assistant architecture that executes local operating system operations, device automations, and natural language command synthesis."
          techStack={['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Docker']}
          status={{
            label: 'R&D PHASE',
            color: '#8B5CF6',
            detail: 'INTERNAL PROTOTYPE'
          }}
          previewContent={<OdinPreview />}
          parallax={parallax}
          visible={visible}
          index={4}
        />
      </div>
    </section>
  )
}

export function OdinPreview() {
  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-3 font-sans select-none p-0.5 sm:p-1">
      {/* Waveform & Listening State */}
      <div className="rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2.5 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-purple/5 to-transparent pointer-events-none" />

        {/* Circular Orb Visualizer */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full relative flex items-center justify-center my-1 sm:my-2">
          <div className="absolute inset-0 rounded-full bg-primary-purple/20 blur-xl animate-pulse" />
          <div className="absolute inset-1 rounded-full border border-primary-purple/40 animate-ping opacity-30" />
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#4C1D95] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
        </div>

        {/* Audio Wave Bars */}
        <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-2 h-5 sm:h-7">
          {[40, 75, 100, 60, 85, 45, 90, 65, 35, 80, 50, 95, 70, 40].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-primary-purple to-purple-300 transition-all duration-300"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 mt-1.5 sm:mt-2 truncate">Listening for &ldquo;Hey Odin&rdquo;...</p>
      </div>

      {/* Terminal Intent Classification Log */}
      <div className="flex-1 rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2 sm:p-3 flex flex-col justify-between font-mono">
        <div className="space-y-1 sm:space-y-1.5 text-[9px] sm:text-[11px]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-secondary-text/60 truncate">
            <span className="text-primary-purple">&gt;</span>
            <span className="truncate">INTENT: Run system diagnostics</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 truncate">
            <span className="text-secondary-text/40">&gt;</span>
            <span className="truncate">ACTION: [health_check.py] (0.04s)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-purple-300 truncate">
            <span className="text-secondary-text/40">&gt;</span>
            <span className="truncate">STATUS: ALL 4 NODES HEALTHY</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-purple-500/10 text-[9px] sm:text-[10px] text-secondary-text/40">
          <span>PIPELINE: WEBRTC</span>
          <span className="text-emerald-400">FPS: 60.0</span>
        </div>
      </div>
    </div>
  )
}