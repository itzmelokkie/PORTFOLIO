'use client'

import React from 'react'

export default function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Obsidian Base Gradients */}
      <div className="absolute inset-0 bg-[#050509]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(76,29,149,0.22),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_40%,rgba(139,92,246,0.14),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_70%,rgba(91,33,182,0.12),transparent_70%)]" />

      {/* 2. Delicate Technical Hairline Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_80%)]" />

      {/* 3. Subtle Circular Geometric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-purple-400/[0.035] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-purple-400/[0.025] pointer-events-none" />

      {/* 4. Flowing Violet Light Ribbons (Silk / Orbital Light Trails matching Reference) */}
      <svg
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform opacity-80"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Ribbon 1 Gradient (Top Left Flow) */}
          <linearGradient id="ribbonLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#4C1D95" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2E1065" stopOpacity="0" />
          </linearGradient>

          {/* Ribbon 2 Gradient (Right Arc Wrapping Card) */}
          <linearGradient id="ribbonRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="75%" stopColor="#581C87" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B0764" stopOpacity="0" />
          </linearGradient>

          {/* Lower Horizon Glow Ribbon */}
          <linearGradient id="ribbonLowerGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0" />
            <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
          </linearGradient>

          {/* Specular Core Highlight Gradient */}
          <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#DDD6FE" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>

          {/* Filters for Feathered Silk Depth */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="35" result="blur" />
          </filter>
          <filter id="broadGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="70" result="blur" />
          </filter>
          <filter id="specularBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="8" result="blur" />
          </filter>
        </defs>

        {/* --- Left Ribbon Group --- */}
        {/* Deep ambient glow layer */}
        <path
          d="M -150 180 C 150 80, 240 380, 50 650 C -80 820, -180 620, -150 180 Z"
          fill="url(#ribbonLeftGrad)"
          filter="url(#broadGlow)"
        />
        {/* Mid feathered silk ribbon */}
        <path
          d="M -80 120 C 180 140, 260 420, 80 680 C -20 840, -120 720, -80 120 Z"
          fill="url(#ribbonLeftGrad)"
          filter="url(#softGlow)"
        />
        {/* Specular curved spine */}
        <path
          d="M -50 160 C 140 180, 220 420, 60 660"
          stroke="url(#specularGlow)"
          strokeWidth="3"
          fill="none"
          filter="url(#specularBlur)"
          opacity="0.8"
        />

        {/* --- Right Ribbon Group (Curving around Preview Panel) --- */}
        {/* Broad luminous violet atmospheric aura */}
        <path
          d="M 1750 -80 C 1520 200, 1580 600, 1850 850 C 2050 1020, 2150 600, 1750 -80 Z"
          fill="url(#ribbonRightGrad)"
          filter="url(#broadGlow)"
        />
        {/* Silk ribbon arc */}
        <path
          d="M 1820 -20 C 1560 220, 1620 620, 1920 860"
          stroke="url(#ribbonRightGrad)"
          strokeWidth="110"
          strokeLinecap="round"
          fill="none"
          filter="url(#softGlow)"
        />
        {/* Glossy specular rim highlight */}
        <path
          d="M 1790 40 C 1580 240, 1630 600, 1900 820"
          stroke="url(#specularGlow)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#specularBlur)"
          opacity="0.85"
        />

        {/* --- Lower Horizon Curve --- */}
        <path
          d="M 100 980 C 600 880, 1200 940, 1820 900"
          stroke="url(#ribbonLowerGrad)"
          strokeWidth="75"
          strokeLinecap="round"
          fill="none"
          filter="url(#softGlow)"
        />
        <path
          d="M 250 960 C 700 890, 1150 930, 1700 910"
          stroke="url(#specularGlow)"
          strokeWidth="2"
          fill="none"
          filter="url(#specularBlur)"
          opacity="0.5"
        />
      </svg>

      {/* 5. Fixed Reference Framing Technical Details */}
      {/* Bottom-left: "BUILDING IDEAS INTO REALITY —" */}
      <div className="fixed bottom-6 left-8 md:left-12 flex items-center gap-3 text-[10px] md:text-xs text-secondary-text/40 font-mono tracking-[0.2em] uppercase">
        <span>BUILDING IDEAS INTO REALITY</span>
        <span className="w-6 h-px bg-purple-400/20" />
      </div>

      {/* Bottom-right: "SCROLL FOR MORE ↓" */}
      <div className="fixed bottom-6 right-8 md:right-12 hidden sm:flex items-center gap-2 text-[10px] md:text-xs text-secondary-text/40 font-mono tracking-[0.2em] uppercase">
        <span>SCROLL FOR MORE</span>
        <span className="text-primary-purple text-xs">↓</span>
      </div>

      {/* Right Edge: Vertical Rail "PROJECT SELECTION" */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-secondary-text/30">
        <span className="vertical-rail-text uppercase">PROJECT SELECTION</span>
        <div className="w-px h-16 bg-purple-400/15" />
      </div>
    </div>
  )
}
