'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
})

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {/* Light Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/80 to-indigo-50/80" />
      
      {/* Subtle 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <ThreeBackground />
      </div>
      
      {/* Optimized Gradient Orbs - Reduced and Smoother */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']
          const color = colors[i % colors.length]
          const size = 400 + i * 100
          const left = (i % 3) * 33.33
          const top = Math.floor(i / 3) * 50
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl will-change-transform"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(circle, ${color}15, transparent)`,
                transform: 'translateZ(0)',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.08, 0.12, 0.08],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          )
        })}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  )
}
