'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import dynamic from 'next/dynamic'
import CursorGlowCard from '@/components/ui/CursorGlowCard'
import SmokyText from '@/components/ui/SmokyText'

const ProcessorModel = dynamic(
  () => import('./ProcessorChip').then((mod) => mod.ProcessorModel),
  { ssr: false, loading: () => null }
)

export default function ContactSection() {
  const [visible, setVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    observer.observe(element)

    // Viewport tracking for 3D Canvas: pause WebGL render loop when far offscreen
    const canvasObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: '200px 0px' }
    )
    canvasObserver.observe(element)

    return () => {
      observer.disconnect()
      canvasObserver.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* 3D WebGL Canvas Layer with Viewport-Aware Frameloop & Optimized Shadows */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0, 6.5], fov: 28 }}
            shadows={true}
            frameloop={isInView ? 'always' : 'never'}
            gl={{
              preserveDrawingBuffer: false,
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance'
            }}
          >
            <color attach="background" args={["#060608"]} />
            <fog attach="fog" args={["#060608", 3, 20]} />

            <Environment
              preset="warehouse"
              background={false}
            />

            <ambientLight intensity={0.4} color="#ffffff" />
            <directionalLight
              position={[4, 5, 6]}
              intensity={2}
              color="#ffffff"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.1}
              shadow-camera-far={25}
              shadow-camera-left={-6}
              shadow-camera-right={6}
              shadow-camera-top={6}
              shadow-camera-bottom={-6}
              shadow-bias={-0.0005}
            />
            <directionalLight
              position={[-3, 3, 4]}
              intensity={1}
              color="#c4b8f2"
            />
            <pointLight
              position={[0, 0, 4]}
              intensity={1.2}
              color="#8b78c8"
              distance={15}
              decay={2}
            />
            <pointLight
              position={[2, -2, 3]}
              intensity={0.6}
              color="#ffffff"
              distance={10}
              decay={2}
            />
            <hemisphereLight groundColor="#0a0a0f" color="#15151c" intensity={0.3} />

            <Suspense fallback={null}>
              <ProcessorModel />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        </div>
      </div>

      <div
        className={`
          relative z-20 w-full h-full flex items-center justify-center lg:justify-end px-4 sm:px-6 md:px-12 lg:px-20 transition-all duration-1600 ease-out
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}
        `}
      >
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto pr-0 lg:pr-12 xl:pr-20">
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