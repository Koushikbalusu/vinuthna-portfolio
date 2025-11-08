'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Code, Palette, Zap, Star } from 'lucide-react'

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
})

export default function HomeSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    let rafId: number
    let targetX = 0
    let targetY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 6
      targetY = (e.clientY / window.innerHeight - 0.5) * 6
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition((prev) => ({
            x: prev.x + (targetX - prev.x) * 0.12,
            y: prev.y + (targetY - prev.y) * 0.12,
          }))
          rafId = 0
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const uiIcons = useMemo(() => [
    { icon: Code, color: 'from-blue-500 to-cyan-500', delay: 0, pos: { left: '15%', top: '25%' } },
    { icon: Palette, color: 'from-purple-500 to-pink-500', delay: 1.5, pos: { left: '75%', top: '30%' } },
    { icon: Zap, color: 'from-yellow-500 to-orange-500', delay: 3, pos: { left: '20%', top: '70%' } },
    { icon: Star, color: 'from-indigo-500 to-purple-500', delay: 4.5, pos: { left: '80%', top: '65%' } },
  ], [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle 3D Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="opacity-10">
          <ThreeBackground />
        </div>
      </motion.div>

      {/* Optimized UI/UX Icons - Smoother */}
      <div className="absolute inset-0 pointer-events-none">
        {uiIcons.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              className="absolute will-change-transform"
              style={{
                left: item.pos.left,
                top: item.pos.top,
                transform: 'translateZ(0)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: item.delay,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated Badge */}
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring' as const }}
          >
            <motion.div
              className="glass-effect-strong px-6 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-heading font-semibold text-gradient-2">
                ✨ Creative UI/UX Developer
              </span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 leading-tight will-change-transform"
            animate={{
              x: mousePosition.x * 0.15,
              y: mousePosition.y * 0.15,
            }}
            transition={{ 
              type: 'tween',
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ transform: 'translateZ(0)' }}
          >
            <motion.span
              className="block text-slate-800 mb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hi, I am
            </motion.span>
            <motion.span
              className="block text-gradient glow-text"
              initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring' as const }}
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 40px rgba(14, 165, 233, 0.6)',
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0)',
              }}
            >
              Vinuthna
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl font-heading font-semibold text-slate-700 mb-4"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(90deg, #475569, #0ea5e9, #8b5cf6, #475569)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              UI/UX Developer
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-slate-600 font-body max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Crafting beautiful, intuitive digital experiences that users love
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href="#about"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-heading font-semibold text-lg shadow-2xl overflow-hidden will-change-transform"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ transform: 'translateZ(0)' }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href="#projects"
              className="group px-10 py-5 glass-effect-strong rounded-full font-heading font-semibold text-lg text-slate-700 hover:text-blue-600 transition-colors will-change-transform"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{ transform: 'translateZ(0)' }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-body text-slate-500 mb-2">Scroll</span>
            <motion.div
              className="w-6 h-10 border-2 border-blue-400 rounded-full flex items-start justify-center p-2 glow-box will-change-transform"
              whileHover={{ scale: 1.1, borderColor: '#8b5cf6' }}
              style={{ transform: 'translateZ(0)' }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
                animate={{ y: [0, 18, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
