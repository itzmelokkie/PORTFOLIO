'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import SmokyText from '@/components/ui/SmokyText'

interface NavItem {
  id: string
  label: string
  href: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'projects', label: 'PROJECTS', href: '#nyxora-section' },
  { id: 'skills', label: 'SKILLS', href: '#skills' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)

  const scrollToSection = useCallback((href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMobileMenuOpen(false)
  }, [])

  // Section observer for accurate navigation tracking
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'nyxora-section', 'skills', 'contact']

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveSection(id === 'nyxora-section' || id === 'projects' ? 'projects' : id)
          }
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.2] }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Lightweight scroll listener for subtle glass softness without a hard rectangular box
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 40
        if (scrolled !== isScrolledRef.current) {
          isScrolledRef.current = scrolled
          setIsScrolled(scrolled)
        }
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transform-gpu
        transition-all duration-500 ease-out
        ${isScrolled ? 'backdrop-blur-md bg-[#050509]/40' : 'bg-transparent'}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Left: Clean bold typography with smoky violet text cursor */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className="font-display text-sm sm:text-base md:text-lg font-bold text-primary-text tracking-wide select-none flex-shrink min-w-0"
            aria-label="Logesh Elavarasan - Home"
          >
            <SmokyText radius={140}>
              LOGESH ELAVARASAN
            </SmokyText>
          </a>

          {/* Right Navigation: Clean uppercase with subtle letter-spacing and thin purple active underline */}
          <div className="hidden md:flex items-center gap-8 md:gap-11">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    relative py-1 text-xs md:text-[13px] font-sans tracking-[0.18em] uppercase transition-colors duration-300 font-medium
                    ${isActive ? 'text-primary-text' : 'text-secondary-text hover:text-primary-text'}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {/* Thin purple active underline matching reference */}
                  <span
                    className={`
                      absolute bottom-0 left-0 right-0 h-[2px] bg-primary-purple shadow-[0_0_8px_rgba(139,92,246,0.6)]
                      transition-all duration-300 ease-out
                      ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </button>
              )
            })}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-secondary-text hover:text-primary-text transition-colors duration-300 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden glass-panel border-t border-purple-500/20 px-6 py-6 transition-all duration-300 backdrop-blur-2xl bg-[#06050c]/98 shadow-2xl"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`
                  text-left py-2.5 px-3 rounded-lg tracking-[0.2em] text-sm uppercase transition-colors duration-200 font-mono
                  ${activeSection === item.id ? 'text-primary-purple bg-primary-purple/10 font-semibold' : 'text-secondary-text hover:text-primary-text hover:bg-white/5'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}