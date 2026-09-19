'use client'

import React, { useEffect, useState, useRef, memo } from 'react'
import CursorGlowCard from '@/components/ui/CursorGlowCard'
import SmokyText from '@/components/ui/SmokyText'

// =========================================================================
// CRISP RECOGNIZABLE BRAND ICONS
// =========================================================================

function SkillIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const n = name.toLowerCase().trim()

  if (n === 'react') {
    return (
      <svg className={`${className} text-[#00D8FF] shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    )
  }

  if (n === 'next.js' || n === 'nextjs') {
    return (
      <svg className={`${className} text-white shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path d="M14.7 17.5L8.4 9.1v7.6H7V7.4h1.7l6.3 8.4V7.4h1.4v10.1h-1.7z" fill="#FFF" />
      </svg>
    )
  }

  if (n === 'tailwind css' || n === 'tailwind') {
    return (
      <svg className={`${className} text-[#38BDF8] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
      </svg>
    )
  }

  if (n === 'typescript') {
    return (
      <div className="w-4 h-4 rounded-[3px] bg-[#3178C6] flex items-center justify-center font-mono font-bold text-[8px] text-white leading-none shrink-0">
        TS
      </div>
    )
  }

  if (n === 'javascript') {
    return (
      <div className="w-4 h-4 rounded-[3px] bg-[#F7DF1E] flex items-center justify-center font-mono font-bold text-[8px] text-black leading-none shrink-0">
        JS
      </div>
    )
  }

  if (n === 'node.js' || n === 'nodejs') {
    return (
      <svg className={`${className} text-[#5FA04E] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l10 5.8v11.6L12 23.6 2 17.8V6.2L12 2zm0 2.3L4 7.9v9.3l8 4.6 8-4.6V7.9l-8-4.6z"/>
        <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5v1.5H15v-1.5a3 3 0 0 0-6 0V15h-1.5v-3a4.5 4.5 0 0 1 4.5-4.5z"/>
      </svg>
    )
  }

  if (n === 'express.js' || n === 'express') {
    return (
      <div className="w-4 h-4 rounded-[3px] bg-neutral-800 border border-neutral-600 flex items-center justify-center font-mono font-semibold text-[8px] text-white leading-none tracking-tight shrink-0">
        ex
      </div>
    )
  }

  if (n === 'mongodb') {
    return (
      <svg className={`${className} text-[#47A248] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5c-.3 0-.6.1-.8.4C9.5 4.2 6.5 9.4 6.5 13.7c0 3.8 2.6 7.4 5.5 8.8.2.1.4.1.6 0 2.9-1.4 5.5-5 5.5-8.8 0-4.3-3-9.5-4.7-11.8-.2-.3-.5-.4-.8-.4zm.1 1.8c1.3 2 3.8 6.5 3.8 10.4 0 3.1-2 6.1-4.2 7.3-.2-3.8-.4-7.5-.4-11.2 0-2.2.3-4.4.8-6.5z"/>
      </svg>
    )
  }

  if (n === 'postgresql') {
    return (
      <svg className={`${className} text-[#4169E1] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.42 0-4.38-.63-4.38-1.41s1.96-1.41 4.38-1.41 4.38.63 4.38 1.41-1.96 1.41-4.38 1.41zm0-3c-2.42 0-4.38-.63-4.38-1.41s1.96-1.41 4.38-1.41 4.38.63 4.38 1.41-1.96 1.41-4.38 1.41zm0-3c-2.42 0-4.38-.63-4.38-1.41S10.58 8.11 13 8.11s4.38.63 4.38 1.41-1.96 1.41-4.38 1.41z" />
      </svg>
    )
  }

  if (n === 'python') {
    return (
      <svg className={`${className} text-[#FFD43B] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.4 0-5.5 1.5-5.5 4.4v2.2h5.6v.8H3.8c-2.1 0-3.8 1.8-3.8 3.9 0 2.2 1.8 3.9 3.9 3.9h1.7v-2.3c0-2.2 1.8-4 4-4h5.6c1.9 0 3.4-1.5 3.4-3.4V4.9C18.6 3.1 16.5 2 11.9 2zm-1.8 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm1.9 18.2c3.4 0 5.5-1.5 5.5-4.4v-2.2h-5.6v-.8h8.2c2.1 0 3.8-1.8 3.8-3.9 0-2.2-1.8-3.9-3.9-3.9h-1.7v2.3c0 2.2-1.8 4-4 4H8.7c-1.9 0-3.4 1.5-3.4 3.4v2.5c0 1.8 2.1 2.9 6.7 2.9zm1.8-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
      </svg>
    )
  }

  if (n === 'java') {
    return (
      <svg className={`${className} text-[#EA2D2E] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.8 18.2s-.7.3-1.6.4c-1.7.3-2.6-.6-2.6-1.5 0-1.1 1.1-2 2.7-2.3 1.3-.2 2.4.1 2.4.1l-.9 3.3zm1.6-4.6c-2.5.3-4.5 1.7-4.5 3.5 0 2.1 2.4 3.3 5.4 2.8 2.1-.3 3.6-1.3 3.6-2.4 0-.4-.2-.8-.7-1.1l-.8-2.8zm2.8-5.3c.4 1.4-.4 2.6-1.8 3.6-1.1.8-2.5 1.3-3.8 1.4-.4 0-.8 0-1.1-.1 1.4-.7 3.3-1.6 3.8-2.7.6-1.3-.1-2.2-.1-2.2s2.6.4 3 0zm1.7-3.9c.7 1.8-.7 3.6-2.7 4.9-1.5 1-3.4 1.6-5.1 1.7-.5 0-1 0-1.4-.1 1.8-.9 4.3-2.1 5-3.6.8-1.7-.1-2.9-.1-2.9s3.5.5 4.3 0z"/>
        <path d="M4 21.5c4.2.8 10.3.7 14.8-.2.8-.2 1.4-.5 1.4-.8 0-.4-.7-.7-1.8-.9-3.9-.7-9.8-.6-14 .3-.9.2-1.4.5-1.4.8 0 .4.5.6 1 .8z"/>
      </svg>
    )
  }

  if (n === 'figma') {
    return (
      <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
        <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" fill="#1ABCFE"/>
        <path d="M4 16a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8a4 4 0 0 0-4 4z" fill="#0ACF83"/>
        <path d="M12 4v8h4a4 4 0 1 0 0-8h-4z" fill="#FF7262"/>
        <path d="M4 8a4 4 0 0 0 4 4h4V4H8a4 4 0 0 0-4 4z" fill="#F24E1E"/>
        <path d="M4 12a4 4 0 0 0 4 4h4v-8H8a4 4 0 0 0-4 4z" fill="#A259FF"/>
      </svg>
    )
  }

  if (n === 'blender') {
    return (
      <svg className={`${className} text-[#E87D0D] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.8a4.8 4.8 0 1 1 3.4-8.2l-1.5 1.5a2.7 2.7 0 1 0-1.9 4.6 2.6 2.6 0 0 0 1.9-.8l1.5 1.5a4.7 4.7 0 0 1-3.4 1.4zM9.5 7.5L5.7 3.7l1.4-1.4 3.8 3.8-1.4 1.4zm5 0l-1.4-1.4 3.8-3.8 1.4 1.4-3.8 3.8z"/>
      </svg>
    )
  }

  if (n === 'three.js' || n === 'threejs') {
    return (
      <svg className={`${className} text-white shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 19.5h20L12 2zm0 4.2l6.8 11.8H5.2L12 6.2z"/>
      </svg>
    )
  }

  if (n === 'framer motion' || n === 'framer') {
    return (
      <svg className={`${className} text-[#8B5CF6] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v6z"/>
      </svg>
    )
  }

  if (n === 'git') {
    return (
      <svg className={`${className} text-[#F05032] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 10.7l-8.3-8.3c-.8-.8-2.1-.8-2.9 0L8.7 4.1l3.5 3.5c.8-.3 1.8-.1 2.5.5.7.7.9 1.7.5 2.5l3.4 3.4c.8-.3 1.8-.1 2.5.5.9.9.9 2.5 0 3.4s-2.5.9-3.4 0c-.8-.8-.9-2-.4-2.9l-3.2-3.2v6.2c.3.2.5.5.6.9.5 1.2-.1 2.6-1.3 3.1-1.2.5-2.6-.1-3.1-1.3-.5-1.2.1-2.6 1.3-3.1.5-.2 1-.2 1.5 0V9.8L5.1 7.7 2.4 10.4c-.8.8-.8 2.1 0 2.9l8.3 8.3c.8.8 2.1.8 2.9 0l8-8c.8-.8.8-2.1 0-2.9z"/>
      </svg>
    )
  }

  if (n === 'github') {
    return (
      <svg className={`${className} text-white shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    )
  }

  if (n === 'vs code' || n === 'vscode') {
    return (
      <svg className={`${className} text-[#007ACC] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 2.3l-9.1 8.5-4.4-3.4L2 8.7l3.7 3.3L2 15.3l2.1 1.3 4.4-3.4 9.1 8.5c.4.4 1 .4 1.5.1l4.4-2.1c.4-.2.6-.6.6-1V5.3c0-.4-.2-.8-.6-1l-4.4-2.1c-.5-.2-1.1-.2-1.5.1zm.9 4.3v10.8l-5.7-5.4 5.7-5.4z"/>
      </svg>
    )
  }

  if (n === 'vercel') {
    return (
      <svg className={`${className} text-white shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L24 22H0L12 2z"/>
      </svg>
    )
  }

  if (n === 'docker') {
    return (
      <svg className={`${className} text-[#2496ED] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.9 8.6h2.2v2.1h-2.2zm-2.8 0h2.2v2.1h-2.2zm-2.8 0h2.2v2.1H8.3zm8.3-2.6h2.2v2.1h-2.2zm-2.8 0h2.2v2.1h-2.2zm-2.8 0h2.2v2.1H11zm-2.8 0h2.2v2.1H8.2zm-2.8 0h2.2v2.1H5.4zM24 12.3c-.6-.4-1.5-.5-2.2-.3-.4-1.6-1.5-2.4-1.6-2.5l-.6.5c.2.2 1.2 1.1 1.2 2.7 0 .2 0 .4-.1.6-1-.2-3.1.2-4.3 1.3H1.2c-.6 1.4-.4 3.4.5 4.8 1.4 2.1 3.9 3.3 7 3.3 6.8 0 11.8-4.3 12.8-7.9 1.1-.3 2.1-1.3 2.5-2.5z"/>
      </svg>
    )
  }

  if (n === 'supabase') {
    return (
      <svg className={`${className} text-[#3ECF8E] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.362 9.354H12V.3a.6.6 0 0 0-1.025-.425l-10.2 10.2A.6.6 0 0 0 1.2 11.1h9.362v9.054a.6.6 0 0 0 1.025.425l10.2-10.2a.6.6 0 0 0-.425-1.025z"/>
      </svg>
    )
  }

  if (n === 'postman') {
    return (
      <svg className={`${className} text-[#FF6C37] shrink-0`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.6 2.1a9.9 9.9 0 0 0-7.8 4.2l3.4 3.4a5.1 5.1 0 0 1 4.4-2.8c2.8 0 5.1 2.3 5.1 5.1 0 1.4-.6 2.7-1.5 3.6l3.4 3.4a9.9 9.9 0 0 0 3-7c0-5.5-4.5-9.9-10-9.9zm-8 4.6a9.9 9.9 0 0 0-2 5.3c0 5.5 4.5 10 10 10a9.9 9.9 0 0 0 5.3-2l-3.4-3.4a5.1 5.1 0 0 1-1.9.4c-2.8 0-5.1-2.3-5.1-5.1 0-.7.2-1.4.5-2L5.6 6.7z"/>
      </svg>
    )
  }

  // Fallback indicator
  return <div className="w-2 h-2 rounded-full bg-primary-purple/70 shrink-0" />
}

// =========================================================================
// DATA CONFIGURATIONS
// =========================================================================

interface SkillCategory {
  number: string
  title: string
  description: string
  technologies: string[]
}

const CATEGORY_CARDS: SkillCategory[] = [
  {
    number: '01',
    title: 'FRONTEND DEVELOPMENT',
    description: 'Building beautiful, responsive and interactive user interfaces.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    number: '02',
    title: 'BACKEND DEVELOPMENT',
    description: 'Creating robust, scalable and secure backend systems.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
  },
  {
    number: '03',
    title: 'UI/UX & DESIGN',
    description: 'Designing modern and engaging digital experiences.',
    technologies: ['Figma', 'Blender', 'Three.js', 'Framer Motion'],
  },
  {
    number: '04',
    title: 'TOOLS & OTHERS',
    description: 'Using powerful tools to ship better and faster.',
    technologies: ['Git', 'GitHub', 'VS Code', 'Vercel'],
  },
]

interface MarqueeTech {
  name: string
  category: string
}

// Track 1: Moving Right to Left
const MARQUEE_ROW_1: MarqueeTech[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Python', category: 'Language' },
  { name: 'Java', category: 'Language' },
]

// Track 2: Moving Left to Right
const MARQUEE_ROW_2: MarqueeTech[] = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'Git', category: 'VCS' },
  { name: 'GitHub', category: 'Collaboration' },
  { name: 'Figma', category: 'Design' },
  { name: 'Blender', category: '3D Graphics' },
  { name: 'Vercel', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'VS Code', category: 'Editor' },
  { name: 'Postman', category: 'API Testing' },
]

interface ProgrammingLanguage {
  name: string
  subtitle: string
  tag: string
  index: string
}

const PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  {
    name: 'Python',
    subtitle: 'Scripting | AI | Automation',
    tag: 'INTELLIGENCE & AUTOMATION',
    index: '01',
  },
  {
    name: 'Java',
    subtitle: 'OOP | DSA | Applications',
    tag: 'SYSTEMS & ALGORITHMS',
    index: '02',
  },
  {
    name: 'JavaScript',
    subtitle: 'Web Development',
    tag: 'FULL-STACK ECOSYSTEM',
    index: '03',
  },
  {
    name: 'TypeScript',
    subtitle: 'Scalable Web Apps',
    tag: 'TYPE-SAFE ARCHITECTURE',
    index: '04',
  },
]

// =========================================================================
// MAIN SKILLS COMPONENT
// =========================================================================

function SkillsSection() {
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
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36 overflow-hidden max-w-full"
      aria-labelledby="skills-heading"
    >
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-track-left {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          width: max-content;
          animation: marqueeLeft 34s linear infinite;
          will-change: transform;
        }

        .marquee-track-right {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
          will-change: transform;
        }

        .marquee-track-left:hover,
        .marquee-track-right:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track-left,
          .marquee-track-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Background Ambient Purple Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] sm:h-[600px] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.13) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: visible ? 1 : 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl w-full flex flex-col gap-16 sm:gap-20 md:gap-28">

        {/* =========================================================================
            1. HERO
            ========================================================================= */}
        <div
          className={`
            text-center max-w-3xl mx-auto flex flex-col items-center
            transition-all duration-1000 ease-out transform-gpu
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          {/* Label: "// 04" | "MY ARSENAL" */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.3em] text-primary-purple font-semibold">
              // 04
            </span>
            <div className="w-8 sm:w-12 h-px bg-primary-purple/40" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-purple-200/80 font-semibold">
              MY ARSENAL
            </span>
            <div className="w-8 sm:w-12 h-px bg-primary-purple/40" />
          </div>

          {/* Heading: "SKILLS" */}
          <h2
            id="skills-heading"
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary-text tracking-tight uppercase leading-none mb-3 sm:mb-4"
          >
            <SmokyText radius={260}>
              SKILLS
            </SmokyText>
          </h2>

          {/* Subtitle: "TOOLS THAT TURN IDEAS INTO REALITY" */}
          <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-purple-300/70 font-medium max-w-xl mx-auto text-balance">
            TOOLS THAT TURN IDEAS INTO REALITY
          </p>

          {/* Minimal futuristic geometric accent line */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8 w-48 sm:w-64" aria-hidden="true">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-purple/35 to-primary-purple/60" />
            <div className="w-1.5 h-1.5 rotate-45 border border-primary-purple/80 bg-primary-purple/30 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary-purple/35 to-primary-purple/60" />
          </div>
        </div>

        {/* =========================================================================
            2. SKILL CATEGORY CARDS (4 EQUAL CARDS IN ONE ROW ON DESKTOP)
            ========================================================================= */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            {CATEGORY_CARDS.map((card, index) => (
              <CursorGlowCard
                key={card.number}
                intensity={0.14}
                radius={240}
                enableTilt
                maxTilt={1.5}
                className="h-full rounded-2xl flex flex-col"
                style={{ height: '100%' }}
              >
                <div
                  className={`
                    glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between h-full relative overflow-hidden group
                    transition-all duration-700 ease-out border border-purple-500/20 hover:border-purple-400/50
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{
                    height: '100%',
                    transitionDelay: `${index * 90 + 150}ms`,
                  }}
                >
                  {/* Subtle top inner reflection sheen */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent pointer-events-none" />

                  {/* Card Header */}
                  <div>
                    {/* Number Badge & Micro-Indicator */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-purple-500/15">
                      <div className="flex items-center gap-2 font-mono text-xs text-primary-purple font-semibold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-purple shadow-[0_0_8px_#8b5cf6]" />
                        <span>{card.number}</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-purple-300/40 uppercase">
                        CATEGORY
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-primary-text tracking-wide uppercase leading-tight mb-2.5">
                      {card.title}
                    </h3>

                    {/* Description (min-h keeps consistent row alignment across cards) */}
                    <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed font-sans min-h-[3rem] text-balance">
                      {card.description}
                    </p>
                  </div>

                  {/* Middle: Technologies Pills */}
                  <div className="my-5 pt-3 border-t border-purple-500/10">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-secondary-text/60 uppercase block mb-2.5 font-semibold">
                      TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {card.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="glass-pill rounded-lg px-2.5 sm:px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-primary-text font-medium transition-transform hover:-translate-y-0.5 cursor-default"
                        >
                          <SkillIcon name={tech} className="w-3.5 h-3.5" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flexible Spacer */}
                  <div className="flex-1 min-h-[0.5rem]" />

                  {/* Card Footer: Always Aligned to the Bottom */}
                  <div className="pt-3.5 border-t border-purple-500/15 flex items-center justify-between text-[10px] font-mono text-secondary-text/50">
                    <span className="tracking-widest uppercase">MODULE // 0{index + 1}</span>
                    <span className="text-primary-purple/70 tracking-wider">PROFICIENT</span>
                  </div>
                </div>
              </CursorGlowCard>
            ))}
          </div>
        </div>

        {/* =========================================================================
            3. STRAIGHT HORIZONTAL TECHNOLOGY LOGO TICKER MARQUEES
            ========================================================================= */}
        <div className="w-full relative py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
          {/* Ambient Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[600px] sm:w-[900px] h-[140px] rounded-full bg-primary-purple/10 blur-[85px]" />
          </div>

          {/* Marquee Wrapper with Smooth Left & Right Edge Gradient Fades */}
          <div
            className="relative w-full overflow-hidden flex flex-col gap-3 sm:gap-4"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            {/* TRACK 1: Straight Horizontal Right → Left */}
            <div className="marquee-track-left py-1">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((tech, i) => (
                <div
                  key={`r1-${tech.name}-${i}`}
                  className="mx-2 sm:mx-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl glass-panel flex items-center gap-2.5 sm:gap-3 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] shrink-0 cursor-default select-none group"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-950/40 border border-purple-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <SkillIcon name={tech.name} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-primary-text leading-tight whitespace-nowrap">
                      {tech.name}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-purple-300/50 uppercase whitespace-nowrap">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TRACK 2: Straight Horizontal Left → Right */}
            <div className="marquee-track-right py-1">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((tech, i) => (
                <div
                  key={`r2-${tech.name}-${i}`}
                  className="mx-2 sm:mx-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl glass-panel flex items-center gap-2.5 sm:gap-3 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] shrink-0 cursor-default select-none group"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-950/40 border border-purple-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <SkillIcon name={tech.name} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-primary-text leading-tight whitespace-nowrap">
                      {tech.name}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-purple-300/50 uppercase whitespace-nowrap">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. PROGRAMMING LANGUAGES (4 EQUAL CARDS: PYTHON, JAVA, JS, TS — NO C/C++)
            ========================================================================= */}
        <div className="w-full flex flex-col gap-8 sm:gap-10">
          {/* Subheading Block */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <div className="w-8 sm:w-12 h-px bg-purple-400/30" />
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-primary-purple font-semibold">
                CORE FOUNDATION
              </span>
              <div className="w-8 sm:w-12 h-px bg-purple-400/30" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-text tracking-tight uppercase mb-2">
              PROGRAMMING LANGUAGES
            </h3>
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-secondary-text/70 font-medium">
              LANGUAGES I USE TO BRING IDEAS TO LIFE
            </p>
          </div>

          {/* 4 Equal Cards Grid: 1 col on mobile, 2x2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            {PROGRAMMING_LANGUAGES.map((lang, index) => (
              <CursorGlowCard
                key={lang.name}
                intensity={0.14}
                radius={240}
                enableTilt
                maxTilt={1.5}
                className="h-full rounded-2xl flex flex-col"
                style={{ height: '100%' }}
              >
                <div
                  className={`
                    glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden group
                    transition-all duration-700 ease-out border border-purple-500/20 hover:border-purple-400/50
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{
                    height: '100%',
                    transitionDelay: `${index * 100 + 250}ms`,
                  }}
                >
                  {/* Subtle top inner reflection sheen */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent pointer-events-none" />

                  {/* Top Bar: Icon + Index */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-950/40 border border-purple-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.25)] group-hover:border-purple-400/60 group-hover:scale-105 transition-all duration-300">
                        <SkillIcon name={lang.name} className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono tracking-widest text-purple-300/50 font-semibold">
                        // {lang.index}
                      </span>
                    </div>

                    {/* Language Name */}
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-primary-text tracking-tight uppercase leading-tight mb-2">
                      {lang.name}
                    </h4>

                    {/* Focus Description */}
                    <p className="text-xs sm:text-[13px] font-mono text-purple-200/80 tracking-wide font-medium leading-relaxed">
                      &ldquo;{lang.subtitle}&rdquo;
                    </p>
                  </div>

                  {/* Flexible Spacer */}
                  <div className="flex-1 min-h-[1.5rem]" />

                  {/* Footer Tag */}
                  <div className="pt-3.5 border-t border-purple-500/15 flex items-center justify-between text-[10px] font-mono text-secondary-text/50">
                    <span className="tracking-wider uppercase text-purple-300/60">{lang.tag}</span>
                    <span className="text-primary-purple font-semibold">READY</span>
                  </div>
                </div>
              </CursorGlowCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default memo(SkillsSection)