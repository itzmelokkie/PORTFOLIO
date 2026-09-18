'use client'

import { useEffect, useState, useRef } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'

export default function HandwritingDocGeneratorSection() {
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
      id="handwriting-doc-section"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden"
      aria-labelledby="handwriting-doc-heading"
    >
      <div className="relative z-10 max-w-7xl w-full">
        <ProjectShowcase
          number="04"
          title="HANDWRITING"
          subtitle="CANVAS GENERATOR"
          categoryBadge="DOCUMENT TOOL"
          description="An intelligent synthesis engine that translates digital keystrokes into organic human handwriting styles, with customizable pen pressures, ink physics, and vector PDF exports."
          techStack={['Python', 'Flask', 'TypeScript', 'Tailwind CSS', 'Docker']}
          status={{
            label: 'COMPLETED',
            color: '#10b981',
            detail: 'OPEN SOURCE'
          }}
          previewContent={<HandwritingPreview />}
          parallax={parallax}
          visible={visible}
          index={3}
        />
      </div>
    </section>
  )
}

export function HandwritingPreview() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-2.5 sm:gap-3 font-sans select-none p-0.5 sm:p-1">
      {/* Left Input Pane (hidden on mobile, side-by-side on desktop) */}
      <div className="hidden md:flex md:w-1/2 rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-3.5 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
            <span className="text-xs font-mono tracking-wider text-secondary-text uppercase">Keystroke Source</span>
            <span className="text-[10px] font-mono text-emerald-400">Live Preview</span>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-[#141122] border border-purple-500/10 text-xs font-mono text-secondary-text/80 leading-relaxed">
            &ldquo;The quick brown fox jumps over the lazy dog. Realistic ink flow and human variation rendered seamlessly.&rdquo;
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-purple-500/10">
          <div className="p-2 rounded-lg bg-[#141122] border border-purple-500/10">
            <span className="text-[9px] font-mono text-secondary-text/50 block">INK TONE</span>
            <span className="text-xs font-medium text-primary-text">Royal Navy Blue</span>
          </div>
          <div className="p-2 rounded-lg bg-[#141122] border border-purple-500/10">
            <span className="text-[9px] font-mono text-secondary-text/50 block">PRESSURE</span>
            <span className="text-xs font-medium text-primary-text">Medium Fluid</span>
          </div>
        </div>
      </div>

      {/* Right Canvas Output Simulation */}
      <div className="w-full md:w-1/2 rounded-xl bg-[#110e20]/95 border border-purple-500/20 p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/10 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
            <span className="text-xs font-mono tracking-wider text-primary-purple uppercase">Synthesized Script</span>
            <span className="text-[10px] font-mono text-purple-300/60">300 DPI Vector</span>
          </div>

          <div className="mt-4 space-y-3 font-serif italic text-base md:text-lg text-purple-200/90 leading-relaxed tracking-wide px-2">
            <p style={{ fontFamily: 'Georgia, serif' }}>
              The quick brown fox jumps over the lazy dog.
            </p>
            <p style={{ fontFamily: 'Georgia, serif' }} className="text-purple-300/70 text-sm">
              Realistic ink flow and human variation rendered seamlessly.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-purple-500/10 mt-3">
          <span className="text-[10px] font-mono text-secondary-text/50">Rule Spacing: 28px</span>
          <button className="glass-pill rounded-lg px-3 py-1 text-[11px] font-mono text-primary-purple flex items-center gap-1.5 hover:bg-primary-purple/20 transition-colors">
            <span>Export PDF</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </div>
  )
}