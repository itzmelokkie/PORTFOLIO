'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  size: number
  color: string
  baseOpacity: number
  currentOpacity: number
  z: number // Depth tier: 0.3 (distant) to 1.0 (foreground)
  driftPhase: number
  driftSpeed: number
  driftRadius: number
  twinklePhase: number
  twinkleSpeed: number
  tier: 1 | 2 | 3
}

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // 1. Accessibility: prefers-reduced-motion check
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = reducedMotionQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
      if (prefersReducedMotion) {
        renderStaticFrame()
      } else if (!animationFrameId) {
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }
    reducedMotionQuery.addEventListener('change', handleMotionChange)

    let animationFrameId = 0
    let width = 0
    let height = 0
    let dpr = 1

    // 2. Smooth Cursor / Touch Tracking State
    const pointer = {
      targetX: -1000,
      targetY: -1000,
      currentX: -1000,
      currentY: -1000,
      targetAlpha: 0,
      currentAlpha: 0,
    }

    // 3. Pre-rendered offscreen sprite cache for high-performance soft violet halos
    let spriteFocalGlow: HTMLCanvasElement | null = null
    let spriteMediumGlow: HTMLCanvasElement | null = null

    const createSprites = () => {
      // Large soft halo for Tier 3 foreground nodes (64x64)
      const lgSize = 64
      spriteFocalGlow = document.createElement('canvas')
      spriteFocalGlow.width = lgSize
      spriteFocalGlow.height = lgSize
      const lgCtx = spriteFocalGlow.getContext('2d')
      if (lgCtx) {
        const center = lgSize / 2
        const grad = lgCtx.createRadialGradient(center, center, 0, center, center, center)
        grad.addColorStop(0, 'rgba(221, 214, 254, 0.90)') // #DDD6FE core
        grad.addColorStop(0.25, 'rgba(196, 181, 253, 0.45)') // #C4B5FD inner aura
        grad.addColorStop(0.55, 'rgba(167, 139, 250, 0.16)') // #A78BFA mid feather
        grad.addColorStop(0.85, 'rgba(139, 92, 246, 0.04)')
        grad.addColorStop(1, 'rgba(139, 92, 246, 0)')
        lgCtx.fillStyle = grad
        lgCtx.fillRect(0, 0, lgSize, lgSize)
      }

      // Medium soft halo for Tier 2 particles (36x36)
      const mdSize = 36
      spriteMediumGlow = document.createElement('canvas')
      spriteMediumGlow.width = mdSize
      spriteMediumGlow.height = mdSize
      const mdCtx = spriteMediumGlow.getContext('2d')
      if (mdCtx) {
        const center = mdSize / 2
        const grad = mdCtx.createRadialGradient(center, center, 0, center, center, center)
        grad.addColorStop(0, 'rgba(221, 214, 254, 0.80)')
        grad.addColorStop(0.30, 'rgba(196, 181, 253, 0.35)')
        grad.addColorStop(0.65, 'rgba(167, 139, 250, 0.12)')
        grad.addColorStop(1, 'rgba(139, 92, 246, 0)')
        mdCtx.fillStyle = grad
        mdCtx.fillRect(0, 0, mdSize, mdSize)
      }
    }

    createSprites()

    // 5. Palette: Rich luminous violet and lavender
    const pickParticleColor = () => {
      const r = Math.random()
      if (r < 0.38) return '#A78BFA' // Vivid violet (38%)
      if (r < 0.72) return '#C4B5FD' // Soft lavender (34%)
      if (r < 0.90) return '#DDD6FE' // Bright pale lavender (18%)
      return '#FFFFFF'              // Specular white pinpoint (10%)
    }

    // 6. Particle Collection
    let particles: Particle[] = []

    const initParticles = (w: number, h: number) => {
      particles = []
      const isMobile = w < 768
      const isTablet = w >= 768 && w < 1024

      // Scaled particle counts for high performance and clean depth
      // Mobile: 60 rich, clearly visible, glowing particles
      // Tablet: 120 particles
      // Desktop: 180 particles
      const count = isMobile ? 60 : isTablet ? 120 : 180

      for (let i = 0; i < count; i++) {
        const randTier = Math.random()
        let z = 0.6
        let size = 2.8
        let baseOpacity = 0.6
        let tier: 1 | 2 | 3 = 2

        if (isMobile) {
          // MOBILE: Enhanced size and contrast so particles are distinct & atmospheric on phone screens
          if (randTier < 0.35) {
            tier = 1
            z = 0.35 + Math.random() * 0.20
            size = 2.4 + Math.random() * 1.0 // 2.4px - 3.4px
            baseOpacity = 0.48 + Math.random() * 0.18
          } else if (randTier < 0.80) {
            tier = 2
            z = 0.60 + Math.random() * 0.22
            size = 3.6 + Math.random() * 1.4 // 3.6px - 5.0px
            baseOpacity = 0.65 + Math.random() * 0.20
          } else {
            tier = 3
            z = 0.85 + Math.random() * 0.15
            size = 5.2 + Math.random() * 1.8 // 5.2px - 7.0px (haloed nodes)
            baseOpacity = 0.80 + Math.random() * 0.18
          }
        } else {
          // DESKTOP: Multi-tier celestial depth
          if (randTier < 0.35) {
            tier = 1
            z = 0.30 + Math.random() * 0.22
            size = 1.6 + Math.random() * 0.9
            baseOpacity = 0.35 + Math.random() * 0.20
          } else if (randTier < 0.80) {
            tier = 2
            z = 0.55 + Math.random() * 0.25
            size = 2.6 + Math.random() * 1.3
            baseOpacity = 0.55 + Math.random() * 0.22
          } else {
            tier = 3
            z = 0.85 + Math.random() * 0.15
            size = 4.2 + Math.random() * 1.8
            baseOpacity = 0.75 + Math.random() * 0.20
          }
        }

        const color = pickParticleColor()
        const x = Math.random() * w
        const y = Math.random() * h

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.18 * z,
          vy: (Math.random() - 0.5) * 0.18 * z,
          baseX: x / (w || 1),
          baseY: y / (h || 1),
          size,
          color,
          baseOpacity,
          currentOpacity: baseOpacity,
          z,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.0006 + Math.random() * 0.0012,
          driftRadius: 4 + Math.random() * 10 * z,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0012 + Math.random() * 0.0024,
          tier,
        })
      }
    }

    // 7. Resize & DPR Handling
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(newWidth * dpr)
      canvas.height = Math.floor(newHeight * dpr)
      canvas.style.width = `${newWidth}px`
      canvas.style.height = `${newHeight}px`

      ctx.scale(dpr, dpr)

      if (width > 0 && height > 0) {
        const scaleX = newWidth / width
        const scaleY = newHeight / height
        for (let i = 0; i < particles.length; i++) {
          particles[i].x *= scaleX
          particles[i].y *= scaleY
          particles[i].baseX = particles[i].x / newWidth
          particles[i].baseY = particles[i].y / newHeight
        }
      } else {
        initParticles(newWidth, newHeight)
      }

      width = newWidth
      height = newHeight

      if (prefersReducedMotion) {
        renderStaticFrame()
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    // 8. Pointer Event Listeners (Mouse & Touch)
    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX
      pointer.targetY = e.clientY
      pointer.targetAlpha = 1
    }

    const handlePointerLeave = () => {
      pointer.targetAlpha = 0
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true })

    // 9. Page Visibility API
    let isTabVisible = !document.hidden
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible && !prefersReducedMotion) {
        lastTime = performance.now()
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render)
        }
      } else if (!isTabVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = 0
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 10. Static Render (Reduced Motion)
    const renderStaticFrame = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.baseOpacity * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // 11. Main Animation Loop with Batched Draw Passes
    let lastTime = performance.now()

    const render = (time: number) => {
      if (!isTabVisible || prefersReducedMotion) {
        animationFrameId = 0
        return
      }

      const dt = Math.min(time - lastTime, 40)
      lastTime = time

      // Smooth pointer tracking
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.08
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.08
      pointer.currentAlpha += (pointer.targetAlpha - pointer.currentAlpha) * 0.05

      // Clear Canvas
      ctx.clearRect(0, 0, width, height)

      const isMobile = width < 768
      const cursorRadius = isMobile ? 120 : 180
      const cursorRadiusSq = cursorRadius * cursorRadius

      // Subtle celestial tilt from viewport center
      const centerX = width / 2
      const centerY = height / 2
      const mouseTiltX = (pointer.currentX - centerX) * pointer.currentAlpha * 0.015
      const mouseTiltY = (pointer.currentY - centerY) * pointer.currentAlpha * 0.015

      // A. UPDATE PARTICLES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.driftPhase += p.driftSpeed * (dt / 16)
        const driftX = Math.cos(p.driftPhase) * 0.3 * p.z
        const driftY = Math.sin(p.driftPhase * 0.8) * 0.26 * p.z

        // Pointer repulsion
        if (pointer.currentAlpha > 0.01) {
          const dx = p.x - pointer.currentX
          const dy = p.y - pointer.currentY
          const distSq = dx * dx + dy * dy

          if (distSq < cursorRadiusSq && distSq > 0.5) {
            const dist = Math.sqrt(distSq)
            const normalizedDist = 1 - dist / cursorRadius
            const force = Math.pow(normalizedDist, 1.6) * 1.5 * p.z * pointer.currentAlpha
            const invDist = 1 / dist

            p.vx += dx * invDist * force
            p.vy += dy * invDist * force
          }
        }

        p.vx *= 0.92
        p.vy *= 0.92

        p.x += p.vx + driftX
        p.y += p.vy + driftY

        // Toroidal boundary wrap
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Twinkle modulation
        const twinkle = 0.85 + 0.15 * Math.sin(time * p.twinkleSpeed + p.twinklePhase)
        p.currentOpacity = p.baseOpacity * twinkle
      }

      // B. BATCHED PASS 1: SOFT LUMINOUS AURA HALOS (Screen Blending)
      ctx.globalCompositeOperation = 'screen'
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const px = p.x + mouseTiltX * p.z
        const py = p.y + mouseTiltY * p.z

        if (p.tier === 3 && spriteFocalGlow) {
          ctx.globalAlpha = p.currentOpacity * 0.55
          const haloSize = p.size * (isMobile ? 4.2 : 3.6)
          ctx.drawImage(
            spriteFocalGlow,
            px - haloSize / 2,
            py - haloSize / 2,
            haloSize,
            haloSize
          )
        } else if (p.tier === 2 && spriteMediumGlow) {
          ctx.globalAlpha = p.currentOpacity * 0.40
          const haloSize = p.size * (isMobile ? 3.2 : 2.8)
          ctx.drawImage(
            spriteMediumGlow,
            px - haloSize / 2,
            py - haloSize / 2,
            haloSize,
            haloSize
          )
        }
      }

      // C. BATCHED PASS 2: FAINT CONNECTING FILAMENTS (Single Path Batch for Ultra-High Performance)
      ctx.globalCompositeOperation = 'source-over'
      const maxConnectDist = isMobile ? 65 : 80
      const maxConnectDistSq = maxConnectDist * maxConnectDist

      ctx.lineWidth = isMobile ? 0.75 : 0.6
      ctx.strokeStyle = isMobile ? 'rgba(196, 181, 253, 0.16)' : 'rgba(196, 181, 253, 0.10)'
      ctx.beginPath()
      let hasFilaments = false

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        if (p1.tier < 2) continue

        const step = isMobile ? 2 : 1
        for (let j = i + 1; j < particles.length; j += step) {
          const p2 = particles[j]
          if (p2.tier < 2) continue

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxConnectDistSq) {
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            hasFilaments = true
          }
        }
      }
      if (hasFilaments) {
        ctx.stroke()
      }

      // D. BATCHED PASS 3: CRISP LUMINOUS CORES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const px = p.x + mouseTiltX * p.z
        const py = p.y + mouseTiltY * p.z

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.currentOpacity
        ctx.beginPath()
        ctx.arc(px, py, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render)
    } else {
      renderStaticFrame()
    }

    // 12. Cleanup on Component Unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reducedMotionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Obsidian Base: #050509 & Surface #0B0B0F */}
      <div className="absolute inset-0 bg-[#050509]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_15%,rgba(11,11,15,0.75),transparent_85%)]" />

      {/* 2. Restrained Muted Violet Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,120,200,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_40%,rgba(181,167,232,0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_70%,rgba(139,120,200,0.06),transparent_70%)]" />

      {/* 3. Subtle Technical Hairline Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-15" />

      {/* 4. Noticeably Visible Interactive Kinetic Canvas Particle System */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 5. Preserved Reference Framing Technical Details */}
      {/* Bottom-left: "BUILDING IDEAS INTO REALITY —" */}
      <div className="fixed bottom-6 left-8 md:left-12 flex items-center gap-3 text-[10px] md:text-xs text-secondary-text/40 font-mono tracking-[0.2em] uppercase pointer-events-none">
        <span>BUILDING IDEAS INTO REALITY</span>
        <span className="w-6 h-px bg-[#8B78C8]/25" />
      </div>

      {/* Bottom-right: "SCROLL FOR MORE ↓" */}
      <div className="fixed bottom-6 right-8 md:right-12 hidden sm:flex items-center gap-2 text-[10px] md:text-xs text-secondary-text/40 font-mono tracking-[0.2em] uppercase pointer-events-none">
        <span>SCROLL FOR MORE</span>
        <span className="text-[#B5A7E8] text-xs">↓</span>
      </div>

      {/* Right Edge: Vertical Rail "PROJECT SELECTION" */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-secondary-text/30 pointer-events-none">
        <span className="vertical-rail-text uppercase">PROJECT SELECTION</span>
        <div className="w-px h-16 bg-[#8B78C8]/20" />
      </div>
    </div>
  )
}
