'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Hide cursor on mobile/touch devices
const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    let rafId: number
    let targetX = 0
    let targetY = 0
    
    const updateMousePosition = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      
      // Use requestAnimationFrame for smoother updates
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: targetX, y: targetY })
          rafId = 0
        })
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const tagName = target.tagName
      if (tagName === 'BUTTON' || tagName === 'A') {
        setIsHovering(true)
        return
      }
      
      // Fast check for closest interactive element
      const closest = target.closest?.('button, a, [role="button"]')
      if (closest) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement
      if (!relatedTarget) {
        setIsHovering(false)
        return
      }
      
      const tagName = relatedTarget.tagName
      const isStillInteractive = 
        tagName === 'BUTTON' || 
        tagName === 'A' || 
        relatedTarget.closest?.('button, a, [role="button"]')
      
      if (!isStillInteractive) {
        setIsHovering(false)
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Create particles on click
      const newParticles: Particle[] = []
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 0.5 + 0.3,
        })
      }
      setParticles((prev) => [...prev, ...newParticles])
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    document.addEventListener('click', handleClick)

    // Cleanup particles
    const particleInterval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000))
    }, 100)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      document.removeEventListener('click', handleClick)
      clearInterval(particleInterval)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'tween',
          duration: 0.1,
          ease: 'linear',
        }}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-all duration-150 ${
            isHovering ? 'bg-opacity-100' : 'bg-opacity-80'
          }`}
        />
      </motion.div>

      {/* Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: 'tween',
          duration: 0.15,
          ease: 'easeOut',
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 border-blue-400 transition-all duration-150 ${
            isHovering ? 'border-opacity-100' : 'border-opacity-50'
          }`}
        />
      </motion.div>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9997]"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: particle.duration,
            ease: 'easeOut',
          }}
        >
          <div
            className="w-1 h-1 rounded-full bg-blue-400"
            style={{ width: particle.size, height: particle.size }}
          />
        </motion.div>
      ))}
    </>
  )
}

