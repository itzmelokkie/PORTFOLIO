'use client'

import { useEffect, useState, useRef } from 'react'
import CursorGlowCard from '@/components/ui/CursorGlowCard'
import SmokyText from '@/components/ui/SmokyText'

export default function AboutSection() {
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
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const aboutItems = [
    {
      id: 'about-item-01',
      number: '01',
      title: 'WHO I AM',
      description: 'Computer Science & Engineering student focused on building robust, modern software products.',
    },
    {
      id: 'about-item-02',
      number: '02',
      title: 'WHAT I BUILD',
      description: 'Full-stack web applications, real-time messaging platforms, and high-utility developer tools.',
    },
    {
      id: 'about-item-03',
      number: '03',
      title: 'HOW I WORK',
      description: 'I prioritize systematic problem decomposition, clean scalable architecture, and fluid user experiences.',
    },
    {
      id: 'about-item-04',
      number: '04',
      title: 'CURRENT FOCUS',
      description: 'Next.js, TypeScript, distributed PostgreSQL databases, AI agents, and high-performance WebGL interfaces.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[85vh] w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 overflow-hidden flex flex-col justify-center"
      aria-labelledby="about-heading"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div
          className={`
            transition-all duration-1000 ease-out transform-gpu
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* Section Indicator */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8 md:mb-12">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-purple-300/60 font-medium">ABOUT ME</span>
            <div className="w-16 h-px bg-purple-400/25" />
          </div>

          {/* Large Quote Heading */}
          <blockquote className="max-w-4xl mb-8 sm:mb-12 md:mb-16">
            <p className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-primary-text leading-[1.12] sm:leading-[1.08] tracking-tight text-balance">
              <SmokyText radius={280}>
                &ldquo;I enjoy understanding complex problems, designing clean systems, and turning abstract ideas into usable software.&rdquo;
              </SmokyText>
            </p>
          </blockquote>

          {/* 4 Editorial Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 sm:mt-8">
            {aboutItems.map((item, index) => (
              <CursorGlowCard
                key={item.id}
                id={item.id}
                intensity={0.12}
                radius={220}
                enableTilt
                maxTilt={1.5}
                className="rounded-2xl"
              >
                <div
                  className={`
                    glass-panel rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] relative overflow-hidden group
                    transition-all duration-500 ease-out hover:border-purple-400/40
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${index * 80 + 200}ms` }}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-2xl md:text-3xl font-light text-purple-400/30 tracking-tight leading-none group-hover:text-primary-purple transition-colors">
                      {item.number}
                    </span>
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-purple-200/80 font-medium">
                      {item.title}
                    </span>
                  </div>

                  <p className="text-secondary-text text-sm leading-relaxed text-balance">
                    {item.description}
                  </p>
                </div>
              </CursorGlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}