'use client'

import React, { useRef, useEffect, useCallback } from 'react'

type SupportedElement = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'a'

interface SmokyTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: SupportedElement
  children: React.ReactNode
  className?: string
  radius?: number
}

interface SmokeParticle {
  x: number
  y: number
  rx: number
  ry: number
  growth: number
  vx: number
  vy: number
  wobbleSpeed: number
  wobbleAmp: number
  phase: number
  opacity: number
  decay: number
}

export default function SmokyText({
  as: Component = 'span',
  children,
  className = '',
  radius = 240,
  style,
  ...props
}: SmokyTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLSpanElement>(null)

  // Particle simulation state refs - no React re-renders during mouse movement or animation
  const simRef = useRef({
    particles: [] as SmokeParticle[],
    lastSpawnX: -999,
    lastSpawnY: -999,
    lastSpawnTime: 0,
    cursorX: -999,
    cursorY: -999,
    isHovering: false,
    isAnimating: false,
    rafId: 0,
  })

  // Scale particle metrics proportionally to the typography radius
  const scale = radius / 240

  const spawnParticle = useCallback((x: number, y: number, initialOpacity = 0.95, sizeMultiplier = 1) => {
    const sim = simRef.current
    if (sim.particles.length >= 48) {
      // Prune oldest particle if capacity reached
      sim.particles.shift()
    }

    // Asymmetric, organic elliptical wisp dimensions (approx 1.5x–1.8x larger cloud coverage)
    const aspect = 0.7 + Math.random() * 0.6
    const baseR = (26 + Math.random() * 20) * scale * sizeMultiplier
    const rx = Math.round(baseR * aspect)
    const ry = Math.round(baseR / aspect)

    sim.particles.push({
      x,
      y,
      rx,
      ry,
      growth: (0.36 + Math.random() * 0.38) * scale,
      vx: (Math.random() - 0.5) * 0.24 * scale,
      vy: (-0.14 - Math.random() * 0.2) * scale, // gentle atmospheric upward drift
      wobbleSpeed: 1.8 + Math.random() * 2.2,
      wobbleAmp: (0.35 + Math.random() * 0.35) * scale,
      phase: Math.random() * Math.PI * 2,
      opacity: initialOpacity,
      decay: 0.0048 + Math.random() * 0.0028, // extended lifetime ~2.0s to 2.8s for natural dispersion
    })
  }, [scale])

  const renderParticles = useCallback(() => {
    const overlay = overlayRef.current
    const sim = simRef.current
    if (!overlay) return

    if (sim.particles.length === 0) {
      overlay.style.backgroundImage = 'none'
      return
    }

    // Build multi-puff radial gradient composition with soft feathered cloud edges
    const gradients = sim.particles.map((p) => {
      const a = Math.max(0, Math.min(1, p.opacity))
      const coreA = (a * 0.95).toFixed(3)
      const midA = (a * 0.78).toFixed(3)
      const wispA = (a * 0.38).toFixed(3)
      const hazeA = (a * 0.12).toFixed(3)

      const rx = Math.round(p.rx)
      const ry = Math.round(p.ry)
      const x = Math.round(p.x)
      const y = Math.round(p.y)

      // 4-Stage Depth: Distinct dark violet core -> medium violet diffusion -> transparent wisps -> white text
      return `radial-gradient(ellipse ${rx}px ${ry}px at ${x}px ${y}px, rgba(40, 16, 71, ${coreA}) 0%, rgba(75, 42, 120, ${midA}) 24%, rgba(111, 69, 168, ${wispA}) 52%, rgba(125, 78, 185, ${hazeA}) 78%, transparent 100%)`
    })

    overlay.style.backgroundImage = gradients.join(', ')
  }, [])

  const startLoop = useCallback(() => {
    const tick = (now: number) => {
      const sim = simRef.current
      const t = now * 0.001

      // If hovering and stationary for >140ms, gently emit subtle smoke plume & satellite wisp from cursor cloud
      if (sim.isHovering && sim.cursorX > -500) {
        if (now - sim.lastSpawnTime > 140) {
          spawnParticle(
            sim.cursorX + (Math.random() - 0.5) * 8 * scale,
            sim.cursorY + (Math.random() - 0.5) * 8 * scale,
            0.7 + Math.random() * 0.15
          )
          // Occasional soft satellite wisp expanding the living cloud
          if (Math.random() > 0.4) {
            spawnParticle(
              sim.cursorX + (Math.random() - 0.5) * 24 * scale,
              sim.cursorY + (Math.random() - 0.5) * 20 * scale,
              0.45 + Math.random() * 0.2,
              0.75
            )
          }
          sim.lastSpawnTime = now
        }
      }

      // Update particle physics (drift, expand, wobble, fade)
      for (let i = sim.particles.length - 1; i >= 0; i--) {
        const p = sim.particles[i]
        p.opacity -= p.decay
        p.rx += p.growth
        p.ry += p.growth
        p.x += p.vx + Math.cos(t * p.wobbleSpeed + p.phase) * p.wobbleAmp
        p.y += p.vy + Math.sin(t * p.wobbleSpeed + p.phase) * p.wobbleAmp

        if (p.opacity <= 0.01) {
          sim.particles.splice(i, 1)
        }
      }

      renderParticles()

      // When all smoke has naturally diffused and faded away, stop rAF loop (0 CPU when idle)
      if (sim.particles.length === 0 && !sim.isHovering) {
        sim.isAnimating = false
        return
      }

      sim.rafId = requestAnimationFrame(tick)
    }

    simRef.current.rafId = requestAnimationFrame(tick)
  }, [renderParticles, spawnParticle])

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sim = simRef.current

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    sim.isHovering = true
    sim.cursorX = x
    sim.cursorY = y
    sim.lastSpawnX = x
    sim.lastSpawnY = y
    sim.lastSpawnTime = performance.now()

    // Deposit initial smoke plume on entry
    spawnParticle(x, y, 0.95)

    if (!sim.isAnimating) {
      sim.isAnimating = true
      startLoop()
    }
  }, [spawnParticle, startLoop])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current
    const sim = simRef.current
    if (!el || !sim.isHovering) return
    const rect = el.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    sim.cursorX = x
    sim.cursorY = y

    const dx = x - sim.lastSpawnX
    const dy = y - sim.lastSpawnY
    const dist = Math.hypot(dx, dy)
    const minStep = 15 * scale

    // Interpolate smoke plumes along the cursor path so fast gestures leave a continuous trail
    if (dist >= minStep) {
      const steps = Math.min(5, Math.floor(dist / minStep))
      for (let s = 1; s <= steps; s++) {
        const stepX = sim.lastSpawnX + (dx * s) / steps
        const stepY = sim.lastSpawnY + (dy * s) / steps
        // Organic spread so the smoke cloud overlaps neighboring parts of letters naturally
        const jitterX = (Math.random() - 0.5) * 12 * scale
        const jitterY = (Math.random() - 0.5) * 10 * scale
        spawnParticle(stepX + jitterX, stepY + jitterY, 0.85 + Math.random() * 0.1)

        // Occasional soft satellite wisp creating irregular cloud contours across letters
        if (Math.random() > 0.45) {
          const satX = stepX + (Math.random() - 0.5) * 28 * scale
          const satY = stepY + (Math.random() - 0.5) * 22 * scale
          spawnParticle(satX, satY, 0.42 + Math.random() * 0.25, 0.72)
        }
      }
      sim.lastSpawnX = x
      sim.lastSpawnY = y
      sim.lastSpawnTime = performance.now()
    }

    if (!sim.isAnimating) {
      sim.isAnimating = true
      startLoop()
    }
  }, [scale, spawnParticle, startLoop])

  const handlePointerLeave = useCallback(() => {
    const sim = simRef.current
    sim.isHovering = false
    sim.cursorX = -999
    sim.cursorY = -999
    sim.lastSpawnX = -999
    sim.lastSpawnY = -999
    // NOTE: We deliberately do NOT clear sim.particles here.
    // The accumulated smoke continues expanding, softening, and fading away naturally over ~1.5-2.0s!
  }, [])

  useEffect(() => {
    return () => {
      if (simRef.current.rafId) {
        cancelAnimationFrame(simRef.current.rafId)
      }
    }
  }, [])

  return (
    <Component
      ref={containerRef as React.Ref<any>}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative inline-block cursor-default ${className}`}
      style={style}
      {...props}
    >
      {/* 1. Base Layer: Crisp pure white text */}
      <span className="relative z-0 inline-block text-primary-text">{children}</span>

      {/* 2. Persistent Violet Smoke Trail Layer: Multi-plume organic smoke strictly clipped to text */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none select-none inline-block"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          willChange: 'background-image',
        }}
      >
        {children}
      </span>
    </Component>
  )
}
