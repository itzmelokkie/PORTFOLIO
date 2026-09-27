'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import SmokyText from '@/components/ui/SmokyText'

const RetroComputerModel = dynamic(
  () => import('./RetroComputerModel').then((mod) => mod.RetroComputerModel),
  { ssr: false, loading: () => null }
)

function ModelLoadingFallback() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial color="#8b78c8" transparent opacity={0.25} wireframe />
      </mesh>
    </group>
  )
}

export default function ContactSection() {
  const [visible, setVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasMountedCanvas, setHasMountedCanvas] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    // Intersection observer for section entrance and 3D Canvas rendering
    // Strictly scoped: only renders when the contact section is actually in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setVisible(true)
          setHasMountedCanvas(true)
        }
      },
      { threshold: 0.05, rootMargin: '300px 0px' }
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden z-10"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">

        {/* LEFT COLUMN (~55% on desktop): Large, Prominent 3D Retro Computer */}
        <div
          className={`
            w-full lg:w-[55%] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[580px] xl:h-[620px] relative flex items-center justify-center transition-all duration-1200 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 lg:translate-y-0 lg:-translate-x-10'}
          `}
        >
          {hasMountedCanvas && (
            <Canvas
              className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing select-none"
              camera={{ position: [0, 0, 4.6], fov: 30 }}
              shadows={false}
              dpr={[1, 1.5]}
              frameloop={isInView ? 'always' : 'never'}
              style={{ background: 'transparent' }}
              gl={{
                preserveDrawingBuffer: false,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
              }}
              onCreated={({ gl, scene }) => {
                gl.setClearColor(0x000000, 0)
                scene.background = null
              }}
            >
              <ambientLight intensity={0.8} color="#ffffff" />
              {/* Primary key light */}
              <directionalLight
                position={[3, 4, 4]}
                intensity={2.2}
                color="#ffffff"
              />
              {/* Violet accent rim light matching portfolio theme */}
              <directionalLight
                position={[-4, 3, -2]}
                intensity={2.5}
                color="#c084fc"
              />
              {/* Subtle fill light */}
              <pointLight
                position={[-2, -1, 3]}
                intensity={0.8}
                color="#93c5fd"
                distance={10}
                decay={2}
              />

              <Suspense fallback={<ModelLoadingFallback />}>
                <RetroComputerModel />
              </Suspense>

              <OrbitControls
                enableRotate={true}
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.06}
                rotateSpeed={0.8}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.7}
                makeDefault
              />
            </Canvas>
          )}
        </div>

        {/* RIGHT COLUMN (~45% on desktop): Contact Details & Social Links */}
        <div
          className={`
            w-full lg:w-[45%] max-w-md mx-auto lg:mx-0 flex flex-col justify-center transition-all duration-1200 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 lg:translate-y-0 lg:translate-x-10'}
          `}
        >
          <div className="mb-4 sm:mb-6 md:mb-10">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-purple-300/60 font-medium">FINAL CHAPTER</span>
          </div>

          <div className="mb-8 sm:mb-10 md:mb-14">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-purple-300/60 font-medium block mb-2 sm:mb-3">CONTACT</span>
            <h2 id="contact-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-text tracking-[-0.03em] leading-none uppercase text-balance">
              <SmokyText radius={260}>
                LET&apos;S<br />CONNECT.
              </SmokyText>
            </h2>
          </div>

          {/* Circular Glass Social Icon Buttons Matching Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <a
              href="mailto:logeshelavarasan02@gmail.com"
              className="glass-panel rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
              aria-label="Email Logesh Elavarasan"
            >
              <div className="glass-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-secondary-text group-hover:text-primary-purple group-hover:scale-110 transition-all shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono tracking-wider uppercase text-primary-text font-semibold truncate">EMAIL</p>
                <p className="text-[10px] text-secondary-text/50 font-mono truncate">Send inquiry ↗</p>
              </div>
            </a>

            <a
              href="https://github.com/itzmelokkie"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
              aria-label="GitHub Profile"
            >
              <div className="glass-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-secondary-text group-hover:text-primary-purple group-hover:scale-110 transition-all shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono tracking-wider uppercase text-primary-text font-semibold truncate">GITHUB</p>
                <p className="text-[10px] text-secondary-text/50 font-mono truncate">Repositories ↗</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/logesh-elavarasan-1ab46a359/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <div className="glass-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-secondary-text group-hover:text-primary-purple group-hover:scale-110 transition-all shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono tracking-wider uppercase text-primary-text font-semibold truncate">LINKEDIN</p>
                <p className="text-[10px] text-secondary-text/50 font-mono truncate">Connect ↗</p>
              </div>
            </a>

            <a
              href="https://instagram.com/itzmelokkie"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
              aria-label="Instagram Profile"
            >
              <div className="glass-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-secondary-text group-hover:text-primary-purple group-hover:scale-110 transition-all shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono tracking-wider uppercase text-primary-text font-semibold truncate">INSTAGRAM</p>
                <p className="text-[10px] text-secondary-text/50 font-mono truncate">Follow ↗</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}