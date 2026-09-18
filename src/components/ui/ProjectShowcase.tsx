'use client'

import React, { useState, useEffect } from 'react'
import CursorGlowCard from './CursorGlowCard'
import SmokyText from './SmokyText'

interface ProjectShowcaseProps {
  number: string
  title: string
  subtitle: string
  description: string
  techStack: string[]
  status: {
    label: string
    color: string
    detail: string
  }
  previewContent: React.ReactNode
  categoryBadge?: string
  parallax?: number
  visible?: boolean
  index?: number
  onNext?: () => void
  onPrev?: () => void
  onSelectIndex?: (index: number) => void
}

// Crisp SVG Brand Icons matching the Reference Image Tech Stack Pills
function TechBrandIcon({ name }: { name: string }) {
  const normalized = name.toLowerCase()

  if (normalized.includes('next')) {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path d="M14.7 17.5L8.4 9.1v7.6H7V7.4h1.7l6.3 8.4V7.4h1.4v10.1h-1.7z" fill="#FFF" />
      </svg>
    )
  }
  if (normalized.includes('react')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#00D8FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    )
  }
  if (normalized.includes('typescript')) {
    return (
      <div className="w-3.5 h-3.5 rounded-[3px] bg-[#3178C6] flex items-center justify-center font-mono font-bold text-[8px] text-white leading-none">
        TS
      </div>
    )
  }
  if (normalized.includes('tailwind')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
      </svg>
    )
  }
  if (normalized.includes('postgres')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#4169E1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.42 0-4.38-.63-4.38-1.41s1.96-1.41 4.38-1.41 4.38.63 4.38 1.41-1.96 1.41-4.38 1.41zm0-3c-2.42 0-4.38-.63-4.38-1.41s1.96-1.41 4.38-1.41 4.38.63 4.38 1.41-1.96 1.41-4.38 1.41zm0-3c-2.42 0-4.38-.63-4.38-1.41S10.58 8.11 13 8.11s4.38.63 4.38 1.41-1.96 1.41-4.38 1.41z" />
      </svg>
    )
  }
  if (normalized.includes('supabase')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.362 9.354H12V.3a.6.6 0 0 0-1.025-.425l-10.2 10.2A.6.6 0 0 0 1.2 11.1h9.362v9.054a.6.6 0 0 0 1.025.425l10.2-10.2a.6.6 0 0 0-.425-1.025z" />
      </svg>
    )
  }
  if (normalized.includes('zod')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="12 2 22 21 2 21" />
      </svg>
    )
  }
  if (normalized.includes('python')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#FFD43B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.4 0-5.5 1.5-5.5 4.4v2.2h5.6v.8H3.8c-2.1 0-3.8 1.8-3.8 3.9 0 2.2 1.8 3.9 3.9 3.9h1.7v-2.3c0-2.2 1.8-4 4-4h5.6c1.9 0 3.4-1.5 3.4-3.4V4.9C18.6 3.1 16.5 2 11.9 2zm-1.8 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm1.9 18.2c3.4 0 5.5-1.5 5.5-4.4v-2.2h-5.6v-.8h8.2c2.1 0 3.8-1.8 3.8-3.9 0-2.2-1.8-3.9-3.9-3.9h-1.7v2.3c0 2.2-1.8 4-4 4H8.7c-1.9 0-3.4 1.5-3.4 3.4v2.5c0 1.8 2.1 2.9 6.7 2.9zm1.8-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
      </svg>
    )
  }
  // Generic tech icon fallback
  return (
    <div className="w-2 h-2 rounded-full bg-primary-purple/60" />
  )
}

export default function ProjectShowcase({
  number,
  title,
  subtitle,
  description,
  techStack,
  status,
  previewContent,
  categoryBadge = 'APP PREVIEW',
  parallax = 0,
  visible = true,
  index = 0,
  onNext,
  onPrev,
  onSelectIndex,
}: ProjectShowcaseProps) {
  const totalProjects = 5
  const currentIdx = parseInt(number, 10) - 1

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
        {/* =========================================================================
            LEFT COLUMN: Editorial Typography & Case-Study Details (Matching Reference)
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-5 lg:space-y-7">
          {/* 1. Step Indicator: "01 / 05 ────" */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-secondary-text tracking-[0.25em]">
            <span className="font-semibold text-secondary-text">{number} / 05</span>
            <div className="w-12 sm:w-16 h-px bg-purple-400/25" />
          </div>

          {/* 2. Massive Bold Title & Subtitle */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2
              className={`font-display font-black text-primary-text leading-none uppercase ${
                title === 'HANDWRITING'
                  ? 'text-[1.75rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.65rem] tracking-tight whitespace-nowrap'
                  : 'text-4xl xs:text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em]'
              }`}
            >
              <SmokyText radius={title === 'HANDWRITING' ? 210 : 260}>
                {title}
              </SmokyText>
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-purple-300/60 font-medium">
              {subtitle}
            </p>
          </div>

          {/* 3. Small Reference Accent Indicator (Circle + Line) */}
          <div className="hidden sm:flex items-center gap-2 py-0.5" aria-hidden="true">
            <div className="w-2 h-2 rounded-full border border-primary-purple/80 bg-primary-purple/25 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <div className="w-10 h-px bg-primary-purple/40" />
          </div>

          {/* 4. Description Section */}
          <div className="space-y-1 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-secondary-text uppercase block font-semibold">
              DESCRIPTION
            </span>
            <p className="text-secondary-text text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-sans font-normal text-balance">
              {description}
            </p>
          </div>

          {/* 5. Tech Stack Pills (Glass capsules with brand icons) */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-secondary-text uppercase block font-semibold">
              TECH STACK
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="glass-pill rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans text-primary-text font-medium cursor-default"
                >
                  <TechBrandIcon name={tech} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Status Line */}
          <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-secondary-text uppercase block font-semibold">
              STATUS
            </span>
            <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-semibold text-emerald-400 uppercase tracking-wider">{status.label}</span>
              <span className="text-secondary-text/30">|</span>
              <span className="text-secondary-text tracking-wider">{status.detail}</span>
              <span className="text-secondary-text/60">↗</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Large Floating Glossy Preview Panel (Matching Reference)
            ========================================================================= */}
        <div className="lg:col-span-7">
          <CursorGlowCard
            intensity={0.14}
            radius={320}
            enableTilt
            maxTilt={1.5}
            className="rounded-2xl sm:rounded-3xl"
          >
            <div
              className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 transform-gpu will-change-transform relative overflow-hidden"
              style={{
                transform: `translate3d(0, ${parallax * 0.4}px, 0)`,
              }}
            >
              {/* Subtle top inner reflection sheen */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent pointer-events-none" />

              {/* Top Bar of Floating Preview Panel */}
              <div className="flex items-center justify-between gap-2 sm:gap-4 pb-3 sm:pb-5 mb-3 sm:mb-5 border-b border-purple-500/15">
                {/* Left: App Preview Icon + Title */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-purple-950/60 border border-purple-400/30 flex items-center justify-center text-primary-purple shadow-[0_0_12px_rgba(139,92,246,0.2)] shrink-0">
                    <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-xs sm:text-sm md:text-base text-primary-text tracking-wide leading-tight truncate">
                      {title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-purple-300/50 uppercase truncate">
                      APP PREVIEW
                    </p>
                  </div>
                </div>

                {/* Right: Category Pill Badge + External Link */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="glass-pill rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono tracking-wider text-purple-200 uppercase">
                    {categoryBadge}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-950/40 border border-purple-400/20 flex items-center justify-center text-secondary-text hover:text-primary-text transition-colors">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Preview Content Area */}
              <div className="relative z-10 w-full min-h-[220px] xs:min-h-[250px] sm:min-h-[320px] md:min-h-[440px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#08070F]/90 border border-purple-500/10 p-1 sm:p-2 md:p-3">
                {previewContent}
              </div>

              {/* Bottom Navigation Bar of Panel: 5 Pagination Dots + Stepper */}
              <div className="flex items-center justify-between pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-purple-500/15">
                {/* 5 Pagination Dots */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
                  {Array.from({ length: totalProjects }).map((_, i) => {
                    const isActive = i === currentIdx
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onSelectIndex?.(i)}
                        className={`
                          h-2 rounded-full transition-all duration-300 cursor-pointer p-0 border-0 outline-none
                          ${isActive ? 'w-6 bg-primary-purple shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'w-2 bg-purple-400/20 hover:bg-purple-400/50'}
                        `}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Go to project 0${i + 1}`}
                      />
                    )
                  })}
                </div>

                {/* Project Stepper: "01 / 05 >" */}
                <div className="flex items-center gap-2 text-xs font-mono text-secondary-text">
                  <span className="tracking-widest">{number} / 05</span>
                  <button
                    type="button"
                    onClick={onNext}
                    className="text-primary-purple hover:translate-x-0.5 transition-transform cursor-pointer font-bold bg-transparent border-0 p-0 text-sm outline-none"
                    aria-label="Next project"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </CursorGlowCard>
        </div>
      </div>
    </div>
  )
}