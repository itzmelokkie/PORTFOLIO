'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import MainContent from '@/components/layout/MainContent'

type IntroPhase = 'glitching' | 'stabilizing' | 'revealing' | 'complete'

export default function SignalCorruptionIntro() {
  const [phase, setPhase] = useState<IntroPhase>('glitching')
  const timersRef = useRef<NodeJS.Timeout[]>([])

  const finishIntro = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('complete')
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Accessibility: skip immediately if prefers-reduced-motion is active
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      finishIntro()
      return
    }

    // Check manual skip param (?skip or ?no-intro)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('skip') || urlParams.has('no-intro')) {
      finishIntro()
      return
    }

    // Lock body scroll during the brief intro sequence
    document.body.style.overflow = 'hidden'

    // Deterministic state progression:
    // 0ms: 'glitching' (signal lost, abstract CRT scanlines, RGB tear slices, portfolio 100% hidden)
    // 1250ms: 'stabilizing' (interference fades out, screen dark, violet-white phosphor signal sweep)
    // 1650ms: 'revealing' (progressive 900ms opacity fade-in of the real portfolio)
    // 2550ms: 'complete' (all overlays unmounted, scroll unlocked, 0 CPU overhead)
    const t1 = setTimeout(() => {
      setPhase('stabilizing')
    }, 1250)

    const t2 = setTimeout(() => {
      setPhase('revealing')
    }, 1650)

    const t3 = setTimeout(() => {
      finishIntro()
    }, 2550)

    timersRef.current = [t1, t2, t3]

    // Fast-forward skip on any user input
    const handleKeyDown = (e: KeyboardEvent) => {
      if ([' ', 'Enter', 'Escape', 'ArrowDown', 'PageDown'].includes(e.key)) {
        finishIntro()
      }
    }

    const handlePointerDown = () => {
      finishIntro()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [finishIntro])

  // Once complete, render pure MainContent with ZERO overlay or lingering overhead
  if (phase === 'complete') {
    return <MainContent />
  }

  const isGlitching = phase === 'glitching'
  const isStabilizing = phase === 'stabilizing'
  const isRevealing = phase === 'revealing'

  return (
    <div className="relative min-h-screen w-full bg-[#050509]">
      <style jsx>{`
        /* ==============================================================
           SIGNAL-LOST ABSTRACT GLITCH KEYFRAMES (0–1250ms)
           Portfolio is 100% concealed during this entire stage.
           ============================================================== */

        @keyframes glitchFlicker {
          0% { opacity: 0.95; }
          12% { opacity: 0.78; }
          15% { opacity: 1; }
          22% { opacity: 0.72; }
          25% { opacity: 1; }
          34% { opacity: 0.65; }
          37% { opacity: 1; }
          45% { opacity: 0.75; }
          48% { opacity: 1; }
          58% { opacity: 0.68; }
          62% { opacity: 1; }
          75% { opacity: 0.72; }
          82% { opacity: 1; }
          100% { opacity: 1; }
        }

        @keyframes voltageSurges {
          0%, 20% { opacity: 0; }
          22% { opacity: 0.45; }
          25% { opacity: 0; }
          42% { opacity: 0.35; }
          45% { opacity: 0; }
          65% { opacity: 0.55; }
          70% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes carrierWave {
          0%, 15% { opacity: 0; transform: scaleX(0.2); }
          18% { opacity: 0.65; transform: scaleX(0.7); }
          22% { opacity: 0; }
          38% { opacity: 0.8; transform: scaleX(0.85); }
          42% { opacity: 0; }
          60% { opacity: 0.9; transform: scaleX(1); }
          66% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes tear1 {
          0%, 14% { opacity: 0; transform: translateX(0); }
          16% { opacity: 0.9; transform: translateX(-24px); }
          20% { opacity: 0; transform: translateX(0); }
          36% { opacity: 0.95; transform: translateX(28px) skewX(2deg); }
          40% { opacity: 0; transform: translateX(0); }
          62% { opacity: 1; transform: translateX(34px) skewX(-3deg); }
          68% { opacity: 0; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(0); }
        }

        @keyframes tear2 {
          0%, 22% { opacity: 0; transform: translateX(0); }
          25% { opacity: 0.85; transform: translateX(18px); }
          29% { opacity: 0; transform: translateX(0); }
          48% { opacity: 0.95; transform: translateX(-30px) skewX(-2deg); }
          54% { opacity: 0; transform: translateX(0); }
          64% { opacity: 1; transform: translateX(-32px) skewX(2.5deg); }
          70% { opacity: 0; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(0); }
        }

        @keyframes syncRoll {
          0% { transform: translateY(-120px); opacity: 0; }
          20% { opacity: 0.75; }
          85% { transform: translateY(110vh); opacity: 0.75; }
          86% { opacity: 0; }
          100% { opacity: 0; }
        }

        /* PHASE 2: STABILIZATION HORIZONTAL SIGNAL FLASH (1250ms–1650ms) */
        @keyframes stabilizationBeam {
          0% {
            opacity: 0;
            transform: scaleX(0.05);
          }
          35% {
            opacity: 1;
            transform: scaleX(1);
            box-shadow: 0 0 16px 3px rgba(167, 139, 250, 0.95), 0 0 32px 8px rgba(139, 92, 246, 0.6);
          }
          70% {
            opacity: 0.7;
            transform: scaleX(1.04) scaleY(2);
            box-shadow: 0 0 24px 4px rgba(167, 139, 250, 0.4);
          }
          100% {
            opacity: 0;
            transform: scaleX(1.1) scaleY(4);
            box-shadow: none;
          }
        }

        /* HIGH-RESOLUTION CRT SCANLINES */
        .scanline-grid {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.45) 0px,
            rgba(0, 0, 0, 0.45) 1px,
            transparent 1px,
            transparent 3px
          );
        }

        .anim-glitch {
          animation: glitchFlicker 1250ms steps(1, start) forwards;
        }

        .anim-surges {
          animation: voltageSurges 1250ms ease-out forwards;
        }

        .anim-carrier {
          animation: carrierWave 1250ms steps(1, start) forwards;
        }

        .anim-tear1 {
          animation: tear1 1250ms steps(1, start) forwards;
        }

        .anim-tear2 {
          animation: tear2 1250ms steps(1, start) forwards;
        }

        .anim-sync {
          animation: syncRoll 1250ms linear forwards;
        }

        .anim-stabilize-beam {
          animation: stabilizationBeam 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. ACTUAL PORTFOLIO:
             - During 'glitching' & 'stabilizing' (0–1650ms): opacity: 0, visibility: hidden.
             - During 'revealing' (1650–2550ms): Progressive 900ms smooth opacity fade-in with cubic-bezier easing.
      */}
      <div
        className="relative w-full"
        style={{
          opacity: isRevealing ? 1 : 0,
          visibility: isGlitching || isStabilizing ? 'hidden' : 'visible',
          transition: isRevealing
            ? 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          pointerEvents: isRevealing ? 'auto' : 'none',
        }}
      >
        <MainContent />
      </div>

      {/* 2. CINEMATIC INTRO OVERLAY (Active only until 'complete') */}
      <div
        id="signal-corruption-overlay"
        className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
        style={{
          opacity: isRevealing ? 0 : 1,
          transition: isRevealing
            ? 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
        }}
        aria-hidden="true"
      >
        {/* A. Master Dark Veil: Keeps screen dark during glitch, smoothly cross-fades during reveal */}
        <div
          className={`absolute inset-0 bg-[#050509] ${isGlitching ? 'anim-glitch' : 'opacity-100'}`}
        />

        {/* B. Active Interference Layers (Only rendered during 'glitching') */}
        {isGlitching && (
          <>
            {/* Fine Electronic CRT Scanline Grid */}
            <div className="absolute inset-0 scanline-grid pointer-events-none opacity-25" />

            {/* Voltage Exposure Glow Flash */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen anim-surges"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, rgba(221, 214, 254, 0.65) 0%, rgba(139, 92, 246, 0.35) 45%, transparent 75%)',
              }}
            />

            {/* Abstract Carrier Wave / Oscilloscope Pulse (No readable text) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[60vw] max-w-xl h-[2px] pointer-events-none mix-blend-screen anim-carrier"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(167, 139, 250, 0.6) 20%, rgba(255, 255, 255, 0.9) 50%, rgba(167, 139, 250, 0.6) 80%, transparent 100%)',
                  boxShadow: '0 0 14px 2px rgba(167, 139, 250, 0.7)',
                }}
              />
            </div>

            {/* Rolling Analog Sync Bar */}
            <div
              className="absolute left-0 right-0 h-28 pointer-events-none mix-blend-screen anim-sync"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(167, 139, 250, 0.15) 30%, rgba(255, 255, 255, 0.28) 50%, rgba(139, 92, 246, 0.18) 70%, transparent 100%)',
              }}
            />

            {/* Horizontal Tear Band 1 (Upper section 22% - 30%) */}
            <div
              className="absolute left-0 right-0 top-[22%] h-[55px] pointer-events-none mix-blend-screen backdrop-blur-[1px] border-t border-b border-purple-400/30 anim-tear1"
              style={{
                background:
                  'linear-gradient(90deg, rgba(167,139,250,0.14) 0%, rgba(56,189,248,0.18) 50%, rgba(217,70,239,0.14) 100%)',
              }}
            />

            {/* Horizontal Tear Band 2 (Mid-section 48% - 56%) */}
            <div
              className="absolute left-0 right-0 top-[48%] h-[42px] pointer-events-none mix-blend-screen backdrop-blur-[1px] border-t border-b border-purple-300/40 anim-tear2"
              style={{
                background:
                  'linear-gradient(90deg, rgba(217,70,239,0.16) 0%, rgba(139,92,246,0.2) 50%, rgba(56,189,248,0.16) 100%)',
              }}
            />

            {/* Subtle Static Noise Field (Micro SVG turbulence, ultra-lightweight) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] mix-blend-screen"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="introNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#introNoise)" />
            </svg>
          </>
        )}

        {/* C. Phase 2 Stabilization Beam (1250ms–1650ms) */}
        {isStabilizing && (
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DDD6FE] to-transparent pointer-events-none anim-stabilize-beam" />
        )}

        {/* D. Phase 3 Subtle Violet Ambient Reveal Light Sweep (1650ms–2550ms) */}
        {isRevealing && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 50% 35%, rgba(139, 92, 246, 0.22) 0%, rgba(167, 139, 250, 0.08) 45%, transparent 75%)',
              animation: 'voltageSurges 900ms ease-out forwards',
            }}
          />
        )}
      </div>
    </div>
  )
}
