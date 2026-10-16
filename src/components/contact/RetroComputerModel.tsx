'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/retro_computer.glb'

export function RetroComputerModel() {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const { size } = useThree()

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Optimize materials & ensure crisp solid rendering (avoid glTF blend sorting issues)
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.transparent = false
          mat.depthWrite = true
          mat.depthTest = true
          mat.roughness = Math.max(mat.roughness, 0.25)
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  // Responsive scale according to screen size
  const isDesktop = size.width >= 1024
  const isTablet = size.width >= 768 && size.width < 1024

  const scale = useMemo(() => {
    if (isDesktop) return 1.25
    if (isTablet) return 1.05
    if (size.width < 360) return 0.75
    return 0.85
  }, [isDesktop, isTablet, size.width])

  // Base rotation: rotated so the front CRT screen and keyboard face the viewer,
  // angled slightly towards the right (~25 degrees) towards the contact text
  const baseRotationX = 0.15
  const baseRotationY = -2.75
  const baseRotationZ = -0.02

  useFrame((state) => {
    if (!modelRef.current || reducedMotion) return
    const time = state.clock.elapsedTime
    // Very subtle vertical float
    modelRef.current.position.y = -0.05 + Math.sin(time * 0.8) * 0.03
  })

  return (
    <group
      ref={modelRef}
      scale={scale}
      position={[0, -0.05, 0]}
      rotation={[baseRotationX, baseRotationY, baseRotationZ]}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
