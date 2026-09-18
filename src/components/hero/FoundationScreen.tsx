'use client'

import { useState, useEffect } from 'react'
import SmokyText from '@/components/ui/SmokyText'

export default function FoundationScreen() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80)
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col justify-center">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 pt-24 pb-12 sm:pt-28 sm:pb-16 md:py-32">
          <div className="max-w-6xl w-full text-center">
            {/* Technical Subheading */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <span className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-purple-300/50">
                INITIALIZING PORTFOLIO
              </span>
            </div>

            {/* Massive Bold Typography with Smoky Violet Cursor Interaction — Scales dynamically on mobile */}
            <h1 className="font-display text-[2.5rem] xs:text-[3.2rem] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-black text-primary-text mb-6 md:mb-8 tracking-[-0.04em] leading-[0.95] uppercase">
              <SmokyText radius={340}>
                LOGESH<br />ELAVARASAN
              </SmokyText>
            </h1>

            {/* Subtitles & Bio */}
            <div className="flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-14 max-w-2xl mx-auto px-2">
              <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] text-secondary-text uppercase">
                COMPUTER SCIENCE & ENGINEERING
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] text-purple-300/70 uppercase">
                SOFTWARE ENGINEER
              </p>
              <div className="w-12 sm:w-14 md:w-20 h-px bg-primary-purple/40 mx-auto my-0.5 sm:my-1" />
              <p className="text-xs sm:text-sm md:text-base text-secondary-text max-w-lg leading-relaxed text-balance font-sans">
                &ldquo;I&apos;m Logesh Elavarasan &mdash; a Computer Science & Engineering student who enjoys turning ideas into real, usable software.&rdquo;
              </p>
            </div>

            {/* Circular Glass Social Icon Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
              <a
                href="mailto:logeshelavarasan02@gmail.com"
                className="glass-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-secondary-text hover:text-primary-purple transition-all duration-300 group"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>

              <a
                href="https://github.com/itzmelokkie"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill w-11 h-11 rounded-full flex items-center justify-center text-secondary-text hover:text-primary-purple transition-all duration-300 group"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/logesh-elavarasan-1ab46a359/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill w-11 h-11 rounded-full flex items-center justify-center text-secondary-text hover:text-primary-purple transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/itzmelokkie"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill w-11 h-11 rounded-full flex items-center justify-center text-secondary-text hover:text-primary-purple transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <footer className="relative z-10 pb-8 md:pb-12 flex flex-col items-center gap-2">
          <div
            className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-700 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            role="img"
            aria-label="Scroll down indicator"
          >
            <div className="w-px h-12 md:h-16 bg-primary-purple/25 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-full h-1/2 bg-primary-purple animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-secondary-text/50 uppercase">SCROLL</span>
          </div>
        </footer>
      </div>
    </div>
  )
}