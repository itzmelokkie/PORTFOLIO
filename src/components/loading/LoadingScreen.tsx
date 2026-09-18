'use client'

import { useEffect, useState, useRef } from 'react'
import MainContent from '@/components/layout/MainContent'
import SmokyText from '@/components/ui/SmokyText'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'counter' | 'kidding' | 'scroll' | 'transition' | 'complete'>('counter')
  const counterSpanRef = useRef<HTMLSpanElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Counter animation: direct DOM update to avoid 300+ full-tree React re-renders
  useEffect(() => {
    if (phase !== 'counter') return

    const duration = 3200
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
        timeoutId = setTimeout(() => setPhase('kidding'), 450)
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

  // Playful developer phase: display for 1700ms before showing scroll cue
  useEffect(() => {
    if (phase !== 'kidding') return

    const timer = setTimeout(() => {
      setPhase('scroll')
    }, 1700)

    return () => clearTimeout(timer)
  }, [phase])

  // Scroll phase: intercept first scroll gesture without allowing page to jump
  useEffect(() => {
    if (phase !== 'scroll') return

    const triggerTransition = (e?: Event) => {
      if (e && e.cancelable) {
        e.preventDefault()
      }
      window.scrollTo(0, 0)
      setPhase('transition')
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
        triggerTransition(e)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        triggerTransition(e)
      }
    }

    const handleTouch = (e: TouchEvent) => {
      triggerTransition(e)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouch, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [phase])

  // Transition phase: smooth GPU-accelerated exit
  useEffect(() => {
    if (phase !== 'transition') return

    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      setPhase('complete')
    }, 1000)

    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'complete') {
    return <MainContent />
  }

  const isTransitioning = phase === 'transition'

  return (
    <div className="relative min-h-screen w-full">
      <div
        ref={loadingRef}
        className={`
          fixed inset-0 z-20 flex items-center justify-center pointer-events-none transform-gpu
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'opacity-0 -translate-y-8 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}
        `}
        aria-hidden={phase !== 'counter' && phase !== 'kidding' && phase !== 'scroll'}
      >
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:gap-8 text-center px-6">

          {phase === 'counter' && (
            <div className="flex flex-col items-center gap-3 md:gap-4">
              <span className="technical-label">INITIALIZING</span>
              <div className="font-mono text-6xl md:text-8xl lg:text-[7rem] font-light text-primary-text tracking-tight leading-none">
                <span ref={counterSpanRef}>00</span>
                <span className="text-secondary-text/40 text-3xl md:text-5xl">%</span>
              </div>
            </div>
          )}

          {phase === 'kidding' && (
            <div className="flex flex-col items-center max-w-xl mx-auto transition-opacity duration-500 opacity-100 pointer-events-auto px-4 text-center">
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-primary-text tracking-tight leading-relaxed">
                <SmokyText radius={240}>
                  &ldquo;Currently turning caffeine, curiosity, and questionable debugging decisions into software.&rdquo;
                </SmokyText>
              </p>
            </div>
          )}

          {phase === 'scroll' && (
            <div
              onClick={() => {
                window.scrollTo(0, 0)
                setPhase('transition')
              }}
              className="flex flex-col items-center gap-3 md:gap-4 transition-opacity duration-500 opacity-100 cursor-pointer pointer-events-auto select-none"
            >
              <span className="technical-label">READY</span>
              <p className="font-display text-lg md:text-xl font-medium text-secondary-text/60 tracking-tight hover:text-primary-text transition-colors">
                SCROLL FOR MORE <span className="text-primary-purple">↓</span>
              </p>
              <div className="w-px h-12 md:h-16 bg-primary-purple/20 relative overflow-hidden mt-3 md:mt-4">
                <div className="absolute left-0 top-0 w-full h-1/3 bg-primary-purple animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 transition-opacity duration-1000 ease-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!isTransitioning}
      >
        <MainContent />
      </div>
    </div>
  )
}