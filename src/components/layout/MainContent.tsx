'use client'

import { memo } from 'react'
import Navbar from '@/components/layout/Navbar'
import AtmosphericBackground from '@/components/layout/AtmosphericBackground'
import FoundationScreen from '@/components/hero/FoundationScreen'
import AboutSection from '@/components/about/AboutSection'
import ProjectsSection from '@/components/projects/ProjectsSection'
import SkillsSection from '@/components/skills/SkillsSection'
import ContactSection from '@/components/contact/ContactSection'

function MainContent() {
  return (
    <div className="relative min-h-screen w-full">
      <AtmosphericBackground />
      <Navbar />
      <FoundationScreen />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  )
}

export default memo(MainContent)