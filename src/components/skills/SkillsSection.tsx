'use client'

import { useEffect, useState, useRef } from 'react'
import CursorGlowCard from '@/components/ui/CursorGlowCard'
import SmokyText from '@/components/ui/SmokyText'

export default function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const skills = [
    {
      category: 'Frontend Architecture',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL', 'HTML5 / CSS3'],
    },
    {
      category: 'Backend & Systems',
      items: ['Node.js', 'Express', 'FastAPI', 'Python', 'PostgreSQL', 'Prisma ORM'],
    },
    {
      category: 'DevOps & Tooling',
      items: ['Git & GitHub', 'Docker', 'Vercel', 'Linux', 'REST & GraphQL', 'CI / CD Pipelines'],
    },
    {
      category: 'AI & Intelligence',
      items: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Vercel AI SDK', 'Vector Embeddings', 'Tesseract.js'],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="relative z-10 max-w-6xl w-full">
        <div
          className={`
            transition-all duration-1000 ease-out transform-gpu
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-px bg-purple-400/25" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-purple-300/60 font-medium">SKILLS & EXPERTISE</span>
              <div className="w-12 h-px bg-purple-400/25" />
            </div>
            <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold text-primary-text tracking-tight uppercase">
              <SmokyText radius={260}>
                CORE CAPABILITIES
              </SmokyText>
            </h2>
          </div>

          {/* 4 Glass Category Panels — Responsive: 1 col on mobile, 2 col on tablet, 4 cols equal height on desktop */}
          <div className="w-full text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 items-stretch">
            {skills.map(({ category, items }, index) => (
              <CursorGlowCard
                key={category}
                intensity={0.12}
                radius={220}
                enableTilt
                maxTilt={1.5}
                className="h-full rounded-2xl flex flex-col"
                style={{ height: '100%' }}
              >
                <div
                  className={`
                    glass-panel rounded-2xl p-5 md:p-6 lg:p-7 flex flex-col h-full relative overflow-hidden group
                    transition-all duration-500 ease-out hover:border-purple-400/40
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ height: '100%', transitionDelay: `${index * 80 + 200}ms` }}
                >
                  {/* Header */}
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-primary-purple font-semibold block mb-4 pb-3 border-b border-purple-500/15">
                    {category}
                  </span>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="glass-pill rounded-lg px-2.5 md:px-3 py-1.5 text-xs font-mono text-secondary-text hover:text-primary-text transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Flexible Spacer to align all footers at the exact same Y position */}
                  <div className="flex-1 min-h-[2rem]" />

                  {/* Footer */}
                  <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-[10px] font-mono text-secondary-text/40">
                    <span>INDEX 0{index + 1}</span>
                    <span className="text-primary-purple/50">PROFICIENT</span>
                  </div>
                </div>
              </CursorGlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}