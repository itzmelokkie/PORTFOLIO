'use client'

import { useRef, useState, useCallback, useEffect, ReactNode } from 'react'

interface CursorGlowCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  radius?: number
  color?: string
  id?: string
  style?: React.CSSProperties
  enableTilt?: boolean
  maxTilt?: number
}

export default function CursorGlowCard({
  children,
  className = '',
  intensity = 0.15,
  radius = 300,
  color = '#8B5CF6',
  id,
  style,
  enableTilt = false,
  maxTilt = 2,
}: CursorGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const isHoveringRef = useRef(false)
  const targetPos = useRef({ x: 150, y: 150 })
  const currentPos = useRef({ x: 150, y: 150 })
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  const stopAnimation = useCallback(() => {
    isHoveringRef.current = false
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [])

  const startAnimation = useCallback(() => {
    if (rafId.current !== null) return

    const tick = () => {
      // Smooth interpolation (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1

      if (enableTilt) {
        currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.12
        currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.12
      }

      if (cardRef.current) {
        cardRef.current.style.setProperty('--cx', `${currentPos.current.x.toFixed(1)}px`)
        cardRef.current.style.setProperty('--cy', `${currentPos.current.y.toFixed(1)}px`)
        if (enableTilt) {
          cardRef.current.style.setProperty('--tilt-x', `${currentTilt.current.x.toFixed(2)}deg`)
          cardRef.current.style.setProperty('--tilt-y', `${currentTilt.current.y.toFixed(2)}deg`)
        }
      }

      if (isHoveringRef.current) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        rafId.current = null
      }
    }

    rafId.current = requestAnimationFrame(tick)
  }, [enableTilt])

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      return
    }

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      rectRef.current = rect
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      targetPos.current = { x, y }
      currentPos.current = { x, y }

      if (enableTilt) {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        targetTilt.current = {
          x: (-(y - centerY) / centerY) * maxTilt,
          y: ((x - centerX) / centerX) * maxTilt,
        }
      }
    }

    isHoveringRef.current = true
    setIsHovering(true)
    startAnimation()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect()
      else return
    }

    const x = e.clientX - rectRef.current.left
    const y = e.clientY - rectRef.current.top
    targetPos.current = { x, y }

    if (enableTilt) {
      const centerX = rectRef.current.width / 2
      const centerY = rectRef.current.height / 2
      targetTilt.current = {
        x: (-(y - centerY) / centerY) * maxTilt,
        y: ((x - centerX) / centerX) * maxTilt,
      }
    }
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    setIsHovering(false)
    stopAnimation()

    if (cardRef.current) {
      if (enableTilt) {
        cardRef.current.style.setProperty('--tilt-x', '0deg')
        cardRef.current.style.setProperty('--tilt-y', '0deg')
      }
    }
    rectRef.current = null
  }

  const glowRadius = radius * (enableTilt ? 1.5 : 1)
  const hexAlpha = Math.round(intensity * 255).toString(16).padStart(2, '0')
  const hexAlphaLow = Math.round(intensity * 0.25 * 255).toString(16).padStart(2, '0')

  return (
    <div
      ref={cardRef}
      id={id}
      className={`relative overflow-hidden tilt-card transform-gpu will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: enableTilt
          ? 'perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))'
          : undefined,
        transformStyle: enableTilt ? 'preserve-3d' : undefined,
      }}
    >
      {/* Dynamic Cursor Glow via CSS custom properties */}
      <div
        className="pointer-events-none absolute rounded-full transition-opacity duration-300 transform-gpu"
        style={{
          top: `calc(var(--cy, 50%) - ${glowRadius / 2}px)`,
          left: `calc(var(--cx, 50%) - ${glowRadius / 2}px)`,
          width: `${glowRadius}px`,
          height: `${glowRadius}px`,
          background: `radial-gradient(circle at center, ${color}${hexAlpha} 0%, ${color}${hexAlphaLow} 35%, transparent 70%)`,
          filter: 'blur(70px)',
          opacity: isHovering ? 1 : 0,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Border Highlight */}
      <div
        className="pointer-events-none absolute inset-[-1px] rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at var(--cx, 50%) var(--cy, 50%), ${color}25 0%, transparent 60%)`,
          opacity: isHovering ? 0.4 : 0,
          zIndex: 1,
          mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          border: '1px solid transparent',
        }}
        aria-hidden="true"
      />

      {/* Radial hover backdrop */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at var(--cx, 50%) var(--cy, 50%), ${color}06 0%, transparent 70%)`,
          opacity: isHovering ? 1 : 0,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 h-full w-full flex flex-col flex-1" style={enableTilt ? { transformStyle: 'preserve-3d' } : undefined}>
        {children}
      </div>
    </div>
  )
}