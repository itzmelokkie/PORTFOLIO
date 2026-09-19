'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import MainContent from '@/components/layout/MainContent'

const WORD_1 = [
  { char: 'J', rotate: -4, y: -2, delay: 0 },
  { char: 'U', rotate: 3, y: 3, delay: 50 },
  { char: 'S', rotate: -2.5, y: -1.5, delay: 100 },
  { char: 'T', rotate: 3.5, y: 2, delay: 150 },
]

const WORD_2 = [
  { char: 'K', rotate: 3, y: -3, delay: 220 },
  { char: 'I', rotate: -3.5, y: 2, delay: 270 },
  { char: 'D', rotate: 2.5, y: -1, delay: 320 },
  { char: 'D', rotate: -3, y: 3, delay: 370 },
  { char: 'I', rotate: 3.5, y: -2, delay: 420 },
  { char: 'N', rotate: -2.5, y: 1.5, delay: 470 },
  { char: 'G', rotate: 4.5, y: -2.5, delay: 520 },
]

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'counter' | 'kidding' | 'transition' | 'complete'>('counter')
  const counterSpanRef = useRef<HTMLSpanElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Counter animation: counts to 71% then triggers 'kidding'
  useEffect(() => {
    if (phase !== 'counter') return

    const duration = 2400
    const startTime = performance.now()
    let animId: number
    let timeoutId: NodeJS.Timeout

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.floor(eased * 71)

      if (counterSpanRef.current) {
        counterSpanRef.current.textContent = value.toString().padStart(2, '0')
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      } else {
        if (counterSpanRef.current) {
          counterSpanRef.current.textContent = '71'
        }
        timeoutId = setTimeout(() => setPhase('kidding'), 350)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(timeoutId)
    }
  }, [phase])

  // Force manual scroll restoration so page never restores scroll at the bottom
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }
  }, [])

  // Lock body scroll while loading overlay is visible
  useEffect(() => {
    if (phase !== 'complete') {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  const triggerTransition = useCallback(() => {
    window.scrollTo(0, 0)
    setPhase('transition')
  }, [])

  // Kidding phase: interactive (any scroll, click, key triggers entrance) or short auto-advance
  useEffect(() => {
    if (phase !== 'kidding') return

    // Auto-advance after 2200ms so the user sees the joke, then enters smoothly
    const autoTimer = setTimeout(() => {
      triggerTransition()
    }, 2200)

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
        triggerTransition()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter', 'Escape'].includes(e.key)) {
        triggerTransition()
      }
    }

    const handlePointerDown = () => {
      triggerTransition()
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      clearTimeout(autoTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [phase, triggerTransition])

  // Transition phase: smooth GPU-accelerated exit
  useEffect(() => {
    if (phase !== 'transition') return

    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      setPhase('complete')
    }, 850)

    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'complete') {
    return <MainContent />
  }

  const isTransitioning = phase === 'transition'

  return (
    <div className="relative min-h-screen w-full bg-[#050509]">
      <style jsx>{`
        @keyframes elasticBounceIn {
          0% {
            opacity: 0;
            transform: translateY(48px) scale(0.6) rotate(calc(var(--rot) * 2.5));
          }
          45% {
            opacity: 1;
            transform: translateY(-12px) scale(1.16, 0.86) rotate(var(--rot));
          }
          65% {
            transform: translateY(4px) scale(0.95, 1.05) rotate(var(--rot));
          }
          82% {
            transform: translateY(-2px) scale(1.02, 0.98) rotate(var(--rot));
          }
          100% {
            opacity: 1;
            transform: translateY(var(--y)) scale(1, 1) rotate(var(--rot));
          }
        }

        @keyframes playfulChuckle {
          0%, 100% {
            transform: translateY(var(--y)) scale(1, 1) rotate(var(--rot));
          }
          25% {
            transform: translateY(calc(var(--y) - 3.5px)) scale(1.03, 0.97) rotate(calc(var(--rot) + 1.2deg));
          }
          50% {
            transform: translateY(var(--y)) scale(1, 1) rotate(var(--rot));
          }
          75% {
            transform: translateY(calc(var(--y) + 2px)) scale(0.98, 1.02) rotate(calc(var(--rot) - 0.8deg));
          }
        }

        .playful-letter {
          display: inline-block;
          opacity: 0;
          animation:
            elasticBounceIn 650ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            playfulChuckle 2200ms ease-in-out infinite 700ms;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Atmospheric Violet Glow Background */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] md:h-[650px] rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background:
            phase === 'kidding'
              ? 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)'
              : 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)',
          filter: 'blur(100px)',
          transform: phase === 'kidding' ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
        }}
        aria-hidden="true"
      />

      <div
        ref={loadingRef}
        onClick={phase === 'kidding' ? triggerTransition : undefined}
        className={`
          fixed inset-0 z-20 flex items-center justify-center transform-gpu
          transition-all duration-850 ease-out
          ${isTransitioning ? 'opacity-0 -translate-y-8 scale-[0.98] pointer-events-none' : 'opacity-100 translate-y-0 scale-100'}
          ${phase === 'kidding' ? 'cursor-pointer select-none' : 'pointer-events-none'}
        `}
        aria-hidden={phase !== 'counter' && phase !== 'kidding'}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-6xl">

          {/* PHASE 1: Counter counting to 71% */}
          {phase === 'counter' && (
            <div className="flex flex-col items-center gap-3 md:gap-4">
              <span className="technical-label">INITIALIZING</span>
              <div className="font-mono text-6xl md:text-8xl lg:text-[7rem] font-light text-primary-text tracking-tight leading-none">
                <span ref={counterSpanRef}>00</span>
                <span className="text-secondary-text/40 text-3xl md:text-5xl">%</span>
              </div>
            </div>
          )}

          {/* PHASE 2: HUGE "JUST KIDDING" */}
          {phase === 'kidding' && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 md:gap-8 lg:gap-10">
              {/* WORD 1: JUST */}
              <div className="flex items-center">
                {WORD_1.map((item, i) => (
                  <span
                    key={`w1-${i}`}
                    className="playful-letter font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] leading-none text-primary-text tracking-tight drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]"
                    style={{
                      '--rot': `${item.rotate}deg`,
                      '--y': `${item.y}px`,
                      animationDelay: `${item.delay}ms, ${item.delay + 650}ms`,
                    } as React.CSSProperties}
                  >
                    {item.char}
                  </span>
                ))}
              </div>

              {/* WORD 2: KIDDING */}
              <div className="flex items-center">
                {WORD_2.map((item, i) => (
                  <span
                    key={`w2-${i}`}
                    className="playful-letter font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] leading-none text-primary-text tracking-tight drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]"
                    style={{
                      '--rot': `${item.rotate}deg`,
                      '--y': `${item.y}px`,
                      animationDelay: `${item.delay}ms, ${item.delay + 650}ms`,
                    } as React.CSSProperties}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 transition-opacity duration-850 ease-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!isTransitioning}
      >
        <MainContent />
      </div>
    </div>
  )
}