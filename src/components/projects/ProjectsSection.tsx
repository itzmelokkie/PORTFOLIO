'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import ProjectShowcase from '@/components/ui/ProjectShowcase'
import { NYXORAPreview } from './NYXORASection'
import { SalonERPPreview } from './SalonERPSection'
import { AIDocPreview } from './AIDocSection'
import { HandwritingPreview } from './HandwritingDocGeneratorSection'
import { OdinPreview } from './OdinSection'

interface ProjectItem {
  id: string
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
    id: 'nyxora-section',
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
    id: 'salon-erp-section',
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
    id: 'ai-doc-section',
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
    id: 'handwriting-doc-section',
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
    id: 'odin-section',
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

function ProjectRow({
  project,
  index,
  totalProjects,
  onSelectProject,
}: {
  project: ProjectItem
  index: number
  totalProjects: number
  onSelectProject: (idx: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const glow = glowRef.current
    if (!container || !content) return

    let rafId: number | null = null

    const updateScrollAnimation = () => {
      if (!container || !content) return
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // If within viewport + buffer
      if (rect.bottom > -150 && rect.top < windowHeight + 150) {
        // Center of the project section
        const elemCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distFromCenter = elemCenter - viewportCenter
        const maxDist = (windowHeight + rect.height) / 2

        // normalized position: -1.2 to 1.2 (0 when perfectly centered)
        const normalized = Math.max(-1.2, Math.min(1.2, distFromCenter / maxDist))
        const absDist = Math.abs(normalized)

        // Factor: 1 when centered, smoothly dropping as it moves toward top or bottom
        const factor = Math.max(0, Math.min(1, 1 - absDist * 1.05))
        // Smoothstep curve for velvety cinematic easing
        const ease = factor * factor * (3 - 2 * factor)

        // Continuous scroll-based values:
        const opacity = 0.35 + 0.65 * ease
        const translateY = normalized > 0 ? (1 - ease) * 45 : -(1 - ease) * 30
        const scale = 0.97 + 0.03 * ease
        const blur = (1 - ease) * 5

        content.style.opacity = `${opacity}`
        content.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        content.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none'

        // Preview card subtle parallax
        const cardParallax = normalized * -20
        const card = content.querySelector('.glass-panel-hover') as HTMLElement
        if (card) {
          card.style.transform = `translate3d(0, ${cardParallax.toFixed(2)}px, 0)`
        }

        // Atmospheric background glow movement
        if (glow) {
          const glowY = normalized * -35
          glow.style.transform = `translate(-50%, -50%) translateY(${glowY.toFixed(1)}px) scale(${(1 + ease * 0.08).toFixed(3)})`
          glow.style.opacity = `${(0.5 + 0.5 * ease).toFixed(2)}`
        }
      }
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updateScrollAnimation()
        rafId = null
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true })
          window.addEventListener('resize', onScroll, { passive: true })
          updateScrollAnimation()
        } else {
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onScroll)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      },
      { rootMargin: '200px 0px' }
    )

    observer.observe(container)
    updateScrollAnimation()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const nextIdx = index < totalProjects - 1 ? index + 1 : undefined

  return (
    <div
      ref={containerRef}
      id={project.id}
      data-project-index={index}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28 overflow-visible scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Subtle atmospheric glow synchronized with this project */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[800px] h-[450px] sm:h-[550px] rounded-full pointer-events-none transition-opacity duration-300 transform-gpu will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Main Project Content with Continuous Scroll Transform */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl w-full transform-gpu will-change-[transform,opacity,filter]"
        style={{
          opacity: 1,
          transform: 'translate3d(0, 0px, 0) scale(1)',
          filter: 'none',
        }}
      >
        <ProjectShowcase
          number={project.number}
          title={project.title}
          subtitle={project.subtitle}
          categoryBadge={project.categoryBadge}
          description={project.description}
          techStack={project.techStack}
          status={project.status}
          previewContent={project.preview}
          parallax={0}
          visible={true}
          index={index}
          onNext={nextIdx !== undefined ? () => onSelectProject(nextIdx) : undefined}
          onSelectIndex={onSelectProject}
        />
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const handleSelectProject = useCallback((index: number) => {
    if (index >= 0 && index < projects.length) {
      const targetId = projects[index].id
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [])

  return (
    <section
      id="projects"
      className="relative w-full flex flex-col items-center justify-start overflow-visible"
      aria-label="Projects Showcase"
    >
      {projects.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={index}
          totalProjects={projects.length}
          onSelectProject={handleSelectProject}
        />
      ))}
    </section>
  )
}
