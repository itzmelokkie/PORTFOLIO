'use client'

import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function ProcessorModel() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const circuitParticlesRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  // Fluid GPU rotation without CPU buffer thrashing
  useFrame((_, delta: number) => {
    timeRef.current += delta * 0.2

    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.08
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.03
      groupRef.current.rotation.z = Math.cos(timeRef.current * 0.2) * 0.02
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02
      particlesRef.current.rotation.x = Math.sin(timeRef.current * 0.4) * 0.03
    }

    if (circuitParticlesRef.current) {
      circuitParticlesRef.current.rotation.y += delta * 0.012
      circuitParticlesRef.current.rotation.z = Math.cos(timeRef.current * 0.3) * 0.02
    }
  })

  // Memoized Particle Buffers - allocated ONCE
  const { particlePositions, particleSizes, particleColors } = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      sizes[i] = Math.random() * 0.03 + 0.01

      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        colors[i * 3] = 139 / 255
        colors[i * 3 + 1] = 120 / 255
        colors[i * 3 + 2] = 200 / 255
      } else if (colorChoice < 0.7) {
        colors[i * 3] = 196 / 255
        colors[i * 3 + 1] = 184 / 255
        colors[i * 3 + 2] = 242 / 255
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }
    }

    return { particlePositions: positions, particleSizes: sizes, particleColors: colors }
  }, [])

  const { circuitPositions, circuitSizes } = useMemo(() => {
    const count = 250
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
      const radius = 1.8 + Math.random() * 1.5
      const y = (Math.random() - 0.5) * 3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius
      sizes[i] = Math.random() * 0.02 + 0.005
    }

    return { circuitPositions: positions, circuitSizes: sizes }
  }, [])

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <ProcessorCore />
      </Float>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[particleSizes, 1]} />
          <bufferAttribute attach="attributes-color" args={[particleColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <points ref={circuitParticlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[circuitPositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[circuitSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#8b78c8"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <PurpleGlowRings />
      <SubtleParticles />
      <CircuitField />
    </group>
  )
}

function ProcessorCore() {
  return (
    <group>
      <PCBBoard />
      <ChipDie />
      <HeatSpreader />
      <GoldPadsInstanced />
      <Capacitors />
      <ResistorsInstanced />
      <Inductors />
      <Traces />
      <MicroComponents />
      <DieDetailsInstanced />
    </group>
  )
}

function PCBBoard() {
  return (
    <group>
      <mesh position={[0, 0, -0.18]} receiveShadow>
        <boxGeometry args={[4.5, 3.8, 0.15]} />
        <meshStandardMaterial
          color="#08080a"
          roughness={0.4}
          metalness={0.05}
          envMapIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <boxGeometry args={[4.3, 3.6, 0.02]} />
        <meshStandardMaterial
          color="#0d0d12"
          roughness={0.3}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

function ChipDie() {
  return (
    <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
      <boxGeometry args={[2.2, 2.2, 0.25]} />
      <meshStandardMaterial
        color="#12121a"
        roughness={0.08}
        metalness={0.95}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function HeatSpreader() {
  return (
    <mesh position={[0, 0, 0.25]} castShadow receiveShadow>
      <boxGeometry args={[3, 3, 0.12]} />
      <meshStandardMaterial
        color="#1e1e2a"
        roughness={0.15}
        metalness={0.8}
        envMapIntensity={1.3}
      />
    </mesh>
  )
}

// Optimized Instanced Gold Pads: 1 draw call instead of 50
function GoldPadsInstanced() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const transforms = useMemo(() => {
    const list: [number, number, number][] = []
    const rows = 14
    const cols = 14
    const spacing = 0.18
    const startX = -1.17
    const startZ = -1.17

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
          list.push([startX + col * spacing, startZ + row * spacing, 0.32])
        }
      }
    }
    return list
  }, [])

  useLayoutEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    transforms.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2])
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [transforms])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, transforms.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.13, 0.13, 0.04]} />
      <meshStandardMaterial
        color="#d4b850"
        roughness={0.05}
        metalness={1}
        envMapIntensity={2}
        emissive="#d4b850"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  )
}

function Capacitors() {
  const positions = useMemo(() => [
    [-1.8, 1.5, 0.15], [1.8, 1.5, 0.15], [-1.8, -1.5, 0.15], [1.8, -1.5, 0.15],
    [-2.1, 0, 0.15], [2.1, 0, 0.15], [0, 1.8, 0.15], [0, -1.8, 0.15],
  ], [])

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={`cap-${i}`} position={pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.35, 16]} />
            <meshStandardMaterial
              color="#0f0f12"
              roughness={0.15}
              metalness={0.7}
              envMapIntensity={1}
            />
          </mesh>
          <mesh position={[0, 0, 0.18]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
            <meshStandardMaterial
              color="#2a2a35"
              roughness={0.2}
              metalness={0.5}
              envMapIntensity={0.8}
            />
          </mesh>
          <mesh position={[0, 0, -0.18]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
            <meshStandardMaterial
              color="#2a2a35"
              roughness={0.2}
              metalness={0.5}
              envMapIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Optimized Instanced Resistors: 1 draw call instead of 32
function ResistorsInstanced() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const transforms = useMemo(() => {
    const list: { pos: [number, number, number]; rot: number }[] = []
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2
      const radius = 1.5
      list.push({
        pos: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0.1],
        rot: angle + Math.PI / 2,
      })
    }
    return list
  }, [])

  useLayoutEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    transforms.forEach((item, i) => {
      dummy.position.set(item.pos[0], item.pos[1], item.pos[2])
      dummy.rotation.set(0, 0, item.rot)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [transforms])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, transforms.length]}
      castShadow
    >
      <boxGeometry args={[0.22, 0.07, 0.07]} />
      <meshStandardMaterial
        color="#1e120a"
        roughness={0.35}
        metalness={0.4}
        envMapIntensity={0.6}
      />
    </instancedMesh>
  )
}

function Inductors() {
  const positions = useMemo(() => [
    [-1.3, 1.3, 0.18], [1.3, 1.3, 0.18], [-1.3, -1.3, 0.18], [1.3, -1.3, 0.18],
  ], [])

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={`ind-${i}`} position={pos as [number, number, number]}>
          <mesh castShadow>
            <torusGeometry args={[0.16, 0.025, 8, 24]} />
            <meshStandardMaterial
              color="#9a7a50"
              roughness={0.25}
              metalness={0.85}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Traces() {
  const traces = useMemo(() => {
    const list = []
    for (let i = 0; i < 16; i++) {
      const y = -1.7 + i * 0.22
      list.push(
        <mesh key={`trace-h-${i}`} position={[0, y, -0.08]}>
          <boxGeometry args={[3.8, 0.018, 0.025]} />
          <meshStandardMaterial
            color="#8b78c8"
            roughness={0.05}
            metalness={0.95}
            emissive="#8b78c8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      )
    }

    for (let i = 0; i < 14; i++) {
      const x = -1.9 + i * 0.3
      list.push(
        <mesh key={`trace-v-${i}`} position={[x, 0, -0.08]}>
          <boxGeometry args={[0.018, 3.4, 0.025]} />
          <meshStandardMaterial
            color="#8b78c8"
            roughness={0.05}
            metalness={0.95}
            emissive="#8b78c8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      )
    }

    return list
  }, [])

  return <group>{traces}</group>
}

function MicroComponents() {
  const components = useMemo(() => {
    const list = []
    const types = ['square', 'rect', 'tiny', 'chip']

    for (let i = 0; i < 60; i++) {
      const type = types[i % types.length]
      const x = ((i % 10) / 10 - 0.5) * 3.4
      const y = (Math.floor(i / 10) / 6 - 0.5) * 2.8
      const isOnPCB = Math.abs(x) > 1.8 || Math.abs(y) > 1.6
      const z = isOnPCB ? 0.02 : 0.03

      if (type === 'chip') {
        list.push(
          <mesh key={`mc-${i}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.06]} />
            <meshStandardMaterial
              color="#1a1a22"
              roughness={0.2}
              metalness={0.6}
              envMapIntensity={0.8}
            />
          </mesh>
        )
      } else {
        const size = type === 'square' ? 0.1 : type === 'rect' ? 0.15 : 0.05
        const height = type === 'tiny' ? 0.03 : 0.06
        list.push(
          <mesh key={`mc-${i}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[size, size, height]} />
            <meshStandardMaterial
              color="#181820"
              roughness={0.25}
              metalness={0.55}
              envMapIntensity={0.8}
            />
          </mesh>
        )
      }
    }
    return list
  }, [])

  return <group>{components}</group>
}

// Optimized Instanced Die Details: 1 draw call instead of 64
function DieDetailsInstanced() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const positions = useMemo(() => {
    const list: [number, number, number][] = []
    const coreSize = 1.6
    const gridSize = 8

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if ((i + j) % 2 === 0) {
          const x = -coreSize / 2 + (i + 0.5) * (coreSize / gridSize)
          const y = -coreSize / 2 + (j + 0.5) * (coreSize / gridSize)
          list.push([x, y, 0.22])
        }
      }
    }
    return list
  }, [])

  useLayoutEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2])
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length]}
      castShadow
    >
      <boxGeometry args={[1.6 / 8 * 0.7, 1.6 / 8 * 0.7, 0.03]} />
      <meshStandardMaterial
        color="#20202c"
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={1.2}
      />
    </instancedMesh>
  )
}

function PurpleGlowRings() {
  const rings = useMemo(() => {
    const list = []
    for (let i = 0; i < 3; i++) {
      const scale = 2.2 + i * 0.6
      list.push(
        <mesh key={`glow-${i}`} position={[0, 0, -0.25]} scale={scale}>
          <ringGeometry args={[1.8, 2.1, 64]} />
          <meshStandardMaterial
            color="#8b78c8"
            emissive="#8b78c8"
            emissiveIntensity={0.8}
            transparent
            opacity={0.12 - i * 0.03}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )
    }
    return list
  }, [])

  return <group>{rings}</group>
}

function SubtleParticles() {
  const { positions, sizes } = useMemo(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      sz[i] = Math.random() * 0.025 + 0.008
    }
    return { positions: pos, sizes: sz }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c4b8f2"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function CircuitField() {
  const lines = useMemo(() => {
    const list = []
    const segments = 24

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const radius = 2.5
      const x = Math.cos(angle) * (radius + 0.15)
      const z = Math.sin(angle) * (radius + 0.15)

      list.push(
        <mesh key={`circuit-${i}`} position={[x, 0, z]} rotation={[0, angle + Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.01, 0.015]} />
          <meshStandardMaterial
            color="#8b78c8"
            emissive="#8b78c8"
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      )
    }

    return list
  }, [])

  return <group>{lines}</group>
}