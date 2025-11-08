'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.2}
        metalness={0.7}
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

function FloatingShape({ position, rotation, scale, color, index }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (0.08 + index * 0.03)
      meshRef.current.rotation.y = state.clock.elapsedTime * (0.08 + index * 0.03)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

function FloatingShapes() {
  const shapes = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ] as [number, number, number],
    scale: Math.random() * 0.4 + 0.3,
    color: i % 2 === 0 ? '#8b5cf6' : '#ec4899',
  })), [])

  return (
    <>
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
          color={shape.color}
          index={i}
        />
      ))}
    </>
  )
}

function AutoRotateCamera() {
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.08
    state.camera.position.x = Math.sin(time) * 1.5
    state.camera.position.z = Math.cos(time) * 1.5
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-15">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#3b82f6" />
        <AnimatedSphere />
        <FloatingShapes />
        <AutoRotateCamera />
      </Canvas>
    </div>
  )
}
