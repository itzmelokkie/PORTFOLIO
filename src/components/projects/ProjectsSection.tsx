'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'
import { NYXORAPreview } from './NYXORASection'
import { SalonERPPreview } from './SalonERPSection'
import { AIDocPreview } from './AIDocSection'
import { HandwritingPreview } from './HandwritingDocGeneratorSection'
import { OdinPreview } from './OdinSection'

interface ProjectItem {
  number: string
  title: string
  subtitle: string
  categoryBadge: string
  description: string
  techStack: string[]
  status: {
    label: string
    color: string
    detail: string
  }
  preview: React.ReactNode
}

const projects: ProjectItem[] = [
  {
    number: '01',
    title: 'NYXORA',
    subtitle: 'AI MESSENGER',
    categoryBadge: 'CORE PROJECT',
    description:
      'An end-to-end encrypted messaging ecosystem engineered with decentralized real-time state synchronization, peer-to-peer audio/video streaming, and autonomous workflow bots.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'WebRTC', 'Socket.io', 'Tailwind CSS'],
    status: {
      label: 'PRODUCTION',
      color: '#10b981',
      detail: 'LIVE ON VERCEL',
    },
    preview: <NYXORAPreview />,
  },
  {
    number: '02',
    title: 'SALON ERP',
    subtitle: 'ENTERPRISE MANAGEMENT',
    categoryBadge: 'ERP PLATFORM',
    description:
      'A comprehensive salon management platform for Administrators and Staff, including real-time attendance, customer visit logs, automated billing, and revenue analytics.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Node.js'],
    status: {
      label: 'PRODUCTION',
      color: '#f59e0b',
      detail: 'ACTIVE DEPLOYMENT',
    },
    preview: <SalonERPPreview />,
  },
  {
    number: '03',
    title: 'AI-DOC',
    subtitle: 'INTELLIGENT VAULT',
    categoryBadge: 'DOCUMENT AI',
    description:
      'A smart digital document repository featuring automated OCR, semantic vector search, AI summarization, and encrypted cloud storage for rapid document retrieval.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS'],
    status: {
      label: 'IN BETA',
      color: '#3b82f6',
      detail: 'TESTNET DEPLOYMENT',
    },
    preview: <AIDocPreview />,
  },
  {
    number: '04',
    title: 'HANDWRITING',
    subtitle: 'CANVAS GENERATOR',
    categoryBadge: 'DOCUMENT TOOL',
    description:
      'An intelligent synthesis engine that translates digital keystrokes into organic human handwriting styles, with customizable pen pressures, ink physics, and vector PDF exports.',
    techStack: ['Python', 'Flask', 'TypeScript', 'Tailwind CSS', 'Docker'],
    status: {
      label: 'COMPLETED',
      color: '#10b981',
      detail: 'OPEN SOURCE',
    },
    preview: <HandwritingPreview />,
  },
  {
    number: '05',
    title: 'ODIN',
    subtitle: 'VOICE INTELLIGENCE',
    categoryBadge: 'VOICE AI',
    description:
      'An autonomous contextual voice assistant architecture that executes local operating system operations, device automations, and natural language command synthesis.',
    techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
    status: {
      label: 'R&D PHASE',
      color: '#8B5CF6',
      detail: 'INTERNAL PROTOTYPE',
    },
    preview: <OdinPreview />,
  },
]

interface TransitionState {
  fromIndex: number
  toIndex: number
  direction: 'down' | 'up'
  stage: 'prepare' | 'animating'
}

export default function ProjectsSection() {
  // Explicitly initialize project index to 0 (01 / 05 NYXORA)
  const [activeProject, setActiveProject] = useState(0)
  const activeProjectRef = useRef(0)
  const isLockedRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartYRef = useRef(0)

  // Cinematic Transition State
  const [transition, setTransition] = useState<TransitionState | null>(null)

  // Keep ref synchronized with state for event listeners
  useEffect(() => {
    activeProjectRef.current = activeProject
  }, [activeProject])

  // Trigger cinematic project transition (600–900ms duration with cubic-bezier)
  const triggerTransition = useCallback((targetIndex: number, direction: 'down' | 'up') => {
    if (isLockedRef.current) return
    if (targetIndex === activeProjectRef.current) return
    if (targetIndex < 0 || targetIndex >= projects.length) return

    isLockedRef.current = true
    const from = activeProjectRef.current

    // Phase 1: mount incoming layer with starting transform
    setTransition({
      fromIndex: from,
      toIndex: targetIndex,
      direction,
      stage: 'prepare',
    })

    // Phase 2: trigger smooth GPU transition in the next animation frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition((prev) => (prev ? { ...prev, stage: 'animating' } : null))
      })
    })

    // Phase 3: complete transition after 750ms and unlock navigation with a slight buffer for trackpad inertia
    setTimeout(() => {
      setActiveProject(targetIndex)
      activeProjectRef.current = targetIndex
      setTransition(null)
      setTimeout(() => {
        isLockedRef.current = false
      }, 100)
    }, 750)
  }, [])

  const advanceProject = useCallback(() => {
    if (activeProjectRef.current < projects.length - 1) {
      triggerTransition(activeProjectRef.current + 1, 'down')
    }
  }, [triggerTransition])

  const retreatProject = useCallback(() => {
    if (activeProjectRef.current > 0) {
      triggerTransition(activeProjectRef.current - 1, 'up')
    }
  }, [triggerTransition])

  const handleNext = useCallback(() => {
    const next = (activeProjectRef.current + 1) % projects.length
    triggerTransition(next, 'down')
  }, [triggerTransition])

  const handlePrev = useCallback(() => {
    const prev = (activeProjectRef.current - 1 + projects.length) % projects.length
    triggerTransition(prev, 'up')
  }, [triggerTransition])

  const handleSelectIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < projects.length && index !== activeProjectRef.current) {
        triggerTransition(index, index > activeProjectRef.current ? 'down' : 'up')
      }
    },
    [triggerTransition]
  )

  // Listen for hash navigation from Navbar (e.g. #nyxora-section)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      let target = -1
      if (hash === '#nyxora-section' || hash === '#projects') target = 0
      else if (hash === '#salon-erp-section') target = 1
      else if (hash === '#ai-doc-section') target = 2
      else if (hash === '#handwriting-doc-section') target = 3
      else if (hash === '#odin-section') target = 4

      if (target >= 0 && target !== activeProjectRef.current) {
        triggerTransition(target, target > activeProjectRef.current ? 'down' : 'up')
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [triggerTransition])

  // Helper to test if ProjectsSection dominates the viewport
  const isSectionInFocus = useCallback(() => {
    if (!sectionRef.current) return false
    const rect = sectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    return rect.top <= 140 && rect.bottom >= viewportHeight - 140
  }, [])

  // Wheel gesture throttling: one intentional scroll = one project transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isSectionInFocus()) return

      const delta = e.deltaY
      const current = activeProjectRef.current

      // Scrolling DOWN
      if (delta > 14) {
        if (current < projects.length - 1) {
          e.preventDefault()
          if (!isLockedRef.current) {
            advanceProject()
          }
        }
        // If current === 4 (last project), do not prevent default: allow smooth exit to #skills
      }
      // Scrolling UP
      else if (delta < -14) {
        if (current > 0) {
          e.preventDefault()
          if (!isLockedRef.current) {
            retreatProject()
          }
        }
        // If current === 0 (first project), do not prevent default: allow smooth exit to #about
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isSectionInFocus, advanceProject, retreatProject])

  // Keyboard navigation (ArrowDown, ArrowUp, PageDown, PageUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionInFocus()) return

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (activeProjectRef.current < projects.length - 1) {
          e.preventDefault()
          if (!isLockedRef.current) {
            advanceProject()
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (activeProjectRef.current > 0) {
          e.preventDefault()
          if (!isLockedRef.current) {
            retreatProject()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSectionInFocus, advanceProject, retreatProject])

  // Mobile scroll-driven progression: smoothly progresses through projects 01 -> 05 on vertical scroll
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        ticking = false

        // Mobile/tablet screens only (< 768px). Desktop uses wheel handler exclusively.
        if (typeof window === 'undefined' || window.innerWidth >= 768) return
        const element = sectionRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const topPinOffset = 56 // top-14 sticky offset

        const totalScrollable = rect.height - viewportHeight
        if (totalScrollable <= 0) return

        const scrolledPastPin = topPinOffset - rect.top
        const progress = Math.max(0, Math.min(1, scrolledPastPin / totalScrollable))

        const current = activeProjectRef.current
        let target = current

        // Smooth progression thresholds with hysteresis buffer for natural thumb scrolling
        if (progress >= 0.82) {
          target = 4
        } else if (progress >= 0.62) {
          target = current === 4 && progress > 0.78 ? 4 : 3
        } else if (progress >= 0.42) {
          target = current >= 3 && progress > 0.58 ? current : 2
        } else if (progress >= 0.22) {
          target = current >= 2 && progress > 0.38 ? current : 1
        } else {
          target = current >= 1 && progress > 0.18 ? current : 0
        }

        if (target !== current && !isLockedRef.current) {
          triggerTransition(target, target > current ? 'down' : 'up')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [triggerTransition])

  const current = projects[activeProject]
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-[340vh] md:h-auto md:min-h-screen w-full flex flex-col items-center justify-start md:justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 md:py-28 overflow-visible md:overflow-hidden"
      aria-label="Projects Showcase"
    >
      {/* Anchor targets for Navbar links */}
      <div id="nyxora-section" className="absolute -top-24 pointer-events-none" />
      <div id="salon-erp-section" className="absolute -top-24 pointer-events-none" />
      <div id="ai-doc-section" className="absolute -top-24 pointer-events-none" />
      <div id="handwriting-doc-section" className="absolute -top-24 pointer-events-none" />
      <div id="odin-section" className="absolute -top-24 pointer-events-none" />

      {/* Subtle atmospheric glow synchronized with active project */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)',
          transform: `translate(-50%, -50%) translateY(${activeProject * 12 - 24}px) scale(${
            1 + (activeProject % 2) * 0.04
          })`,
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      {/* Main Project Scene Composition — Sticky on mobile, relative on desktop */}
      <div className="sticky top-14 sm:top-16 md:relative md:top-auto z-10 max-w-7xl w-full min-h-[calc(100vh-4.5rem)] md:min-h-0 flex flex-col justify-center">
        {/* State 1: Idle (Single project displayed normally) */}
        {!transition && (
          <div className="w-full transition-opacity duration-300 ease-out">
            <ProjectShowcase
              number={current.number}
              title={current.title}
              subtitle={current.subtitle}
              categoryBadge={current.categoryBadge}
              description={current.description}
              techStack={current.techStack}
              status={current.status}
              previewContent={current.preview}
              parallax={0}
              visible={true}
              index={0}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelectIndex={handleSelectIndex}
            />
          </div>
        )}

        {/* State 2: Cinematic Transition (Both Outgoing & Incoming rendered simultaneously) */}
        {transition && (
          <div className="relative w-full overflow-hidden">
            {/* Outgoing Project Composition (Fades out, slightly moves, subtle blur & scale 1 -> 0.98) */}
            <div
              className="w-full pointer-events-none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: transition.stage === 'animating' ? 0 : 1,
                transform:
                  transition.stage === 'animating'
                    ? transition.direction === 'down'
                      ? 'translate3d(0, -36px, 0) scale(0.98)'
                      : 'translate3d(0, 36px, 0) scale(0.98)'
                    : 'translate3d(0, 0, 0) scale(1)',
                filter: transition.stage === 'animating' ? 'blur(6px)' : 'blur(0px)',
                transition: `opacity 750ms ${easing}, transform 750ms ${easing}, filter 750ms ${easing}`,
                willChange: 'transform, opacity, filter',
                zIndex: 1,
              }}
            >
              <ProjectShowcase
                number={projects[transition.fromIndex].number}
                title={projects[transition.fromIndex].title}
                subtitle={projects[transition.fromIndex].subtitle}
                categoryBadge={projects[transition.fromIndex].categoryBadge}
                description={projects[transition.fromIndex].description}
                techStack={projects[transition.fromIndex].techStack}
                status={projects[transition.fromIndex].status}
                previewContent={projects[transition.fromIndex].preview}
                parallax={0}
                visible={true}
                index={0}
                onNext={handleNext}
                onPrev={handlePrev}
                onSelectIndex={handleSelectIndex}
              />
            </div>

            {/* Incoming Project Composition (Starts slightly offset, opacity 0, blur 6px, scale 0.98 -> glides into position) */}
            <div
              className="w-full"
              style={{
                opacity: transition.stage === 'animating' ? 1 : 0,
                transform:
                  transition.stage === 'animating'
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : transition.direction === 'down'
                      ? 'translate3d(0, 36px, 0) scale(0.98)'
                      : 'translate3d(0, -36px, 0) scale(0.98)',
                filter: transition.stage === 'animating' ? 'blur(0px)' : 'blur(6px)',
                transition: `opacity 750ms ${easing}, transform 750ms ${easing}, filter 750ms ${easing}`,
                willChange: 'transform, opacity, filter',
                zIndex: 2,
              }}
            >
              <ProjectShowcase
                number={projects[transition.toIndex].number}
                title={projects[transition.toIndex].title}
                subtitle={projects[transition.toIndex].subtitle}
                categoryBadge={projects[transition.toIndex].categoryBadge}
                description={projects[transition.toIndex].description}
                techStack={projects[transition.toIndex].techStack}
                status={projects[transition.toIndex].status}
                previewContent={projects[transition.toIndex].preview}
                parallax={0}
                visible={true}
                index={0}
                onNext={handleNext}
                onPrev={handlePrev}
                onSelectIndex={handleSelectIndex}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
