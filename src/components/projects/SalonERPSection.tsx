'use client'

import { useEffect, useState, useRef } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'

export default function SalonERPSection() {
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
      id="salon-erp-section"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden"
      aria-labelledby="salon-erp-heading"
    >
      <div className="relative z-10 max-w-7xl w-full">
        <ProjectShowcase
          number="02"
          title="SALON ERP"
          subtitle="ENTERPRISE MANAGEMENT"
          categoryBadge="ERP PLATFORM"
          description="A comprehensive salon management platform for Administrators and Staff, including real-time attendance, customer visit logs, automated billing, and revenue analytics."
          techStack={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Node.js']}
          status={{
            label: 'PRODUCTION',
            color: '#f59e0b',
            detail: 'ACTIVE DEPLOYMENT'
          }}
          previewContent={<SalonERPPreview />}
          parallax={parallax}
          visible={visible}
          index={1}
        />
      </div>
    </section>
  )
}

export function SalonERPPreview() {
  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-3 font-sans select-none p-0.5 sm:p-1">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
        <div className="rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2 sm:p-3 flex flex-col justify-between">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-secondary-text/60 uppercase truncate">Sales</span>
          <p className="text-sm sm:text-lg md:text-xl font-bold text-primary-text mt-0.5 sm:mt-1">$2,847</p>
          <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 mt-0.5 sm:mt-1 truncate">
            ↑ 12.5%
          </span>
        </div>

        <div className="rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2 sm:p-3 flex flex-col justify-between">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-secondary-text/60 uppercase truncate">Bookings</span>
          <p className="text-sm sm:text-lg md:text-xl font-bold text-primary-text mt-0.5 sm:mt-1">24</p>
          <span className="text-[8px] sm:text-[10px] font-mono text-purple-300/60 mt-0.5 sm:mt-1 truncate">8 confirmed</span>
        </div>

        <div className="rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2 sm:p-3 flex flex-col justify-between">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-secondary-text/60 uppercase truncate">Staff</span>
          <p className="text-sm sm:text-lg md:text-xl font-bold text-primary-text mt-0.5 sm:mt-1">6 / 8</p>
          <span className="text-[8px] sm:text-[10px] font-mono text-amber-400/80 mt-0.5 sm:mt-1 truncate">2 on break</span>
        </div>
      </div>

      {/* Appointment Schedule Feed */}
      <div className="flex-1 rounded-xl bg-[#0e0c18]/90 border border-purple-500/15 p-2.5 sm:p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
          <span className="text-[11px] sm:text-xs font-mono tracking-wider text-secondary-text uppercase">Live Bookings</span>
          <span className="text-[9px] sm:text-[10px] font-mono text-primary-purple hover:underline cursor-pointer">View Calendar ↗</span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 py-1.5 sm:py-2">
          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-purple/20 border border-primary-purple/40 flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary-purple shrink-0">
                SJ
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary-text truncate">Sarah Johnson</p>
                <p className="text-[9px] sm:text-[10px] text-secondary-text/50 truncate">Haircut & Color • 10:00 AM</p>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono shrink-0 ml-1">
              In Service
            </span>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] sm:text-xs font-bold text-amber-400 shrink-0">
                MC
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary-text truncate">Michael Chen</p>
                <p className="text-[9px] sm:text-[10px] text-secondary-text/50 truncate">Beard Trim • 11:30 AM</p>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono shrink-0 ml-1">
              Next Up
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#141122] border border-purple-500/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-300">
                ED
              </div>
              <div>
                <p className="text-xs font-semibold text-primary-text">Emily Davis</p>
                <p className="text-[10px] text-secondary-text/50">Balayage • 02:00 PM</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono">
              Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}