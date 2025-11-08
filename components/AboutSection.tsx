'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { FileText, Code, Lightbulb, Palette, Smartphone, Database, Users } from 'lucide-react'

const abilities = [
  { name: 'Frontend Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Creative Problem Solving', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
  { name: 'UI/UX Design (Figma)', icon: Palette, color: 'from-purple-500 to-pink-500' },
  { name: 'Responsive Web Design', icon: Smartphone, color: 'from-indigo-500 to-purple-500' },
  { name: 'Python & SQL Fundamentals', icon: Database, color: 'from-green-500 to-emerald-500' },
  { name: 'Team Collaboration', icon: Users, color: 'from-rose-500 to-pink-500' },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  }), [])

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-transparent via-blue-50/20 to-purple-50/20 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Minimal Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl will-change-transform"
            style={{
              width: `${250 + i * 50}px`,
              height: `${250 + i * 50}px`,
              left: `${(i % 3) * 40}%`,
              top: `${Math.floor(i / 3) * 50}%`,
              background: `radial-gradient(circle, ${
                ['#3b82f6', '#8b5cf6', '#ec4899'][i % 3]
              }10, transparent)`,
              transform: 'translateZ(0)',
            }}
            animate={{
              x: [0, 25, 0],
              y: [0, 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass-effect mb-4 text-sm font-heading text-slate-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              About Me
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-display font-bold text-gradient-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My Story
            </motion.h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="glass-effect-strong rounded-3xl p-8 md:p-16 mb-16 relative overflow-hidden will-change-transform"
            variants={itemVariants}
            whileHover={{ scale: 1.005, y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }} />
            </div>

            <div className="relative z-10">
              <motion.p
                className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 font-body"
                variants={itemVariants}
              >
                <span className="text-3xl font-display text-gradient mr-2">Started</span>
                my digital journey as a curious explorer from <span className="font-heading font-semibold text-blue-600">Siddipet, Telangana</span>, fascinated by coding and the limitless world of web technologies. I&apos;m currently pursuing a <span className="font-heading font-semibold text-purple-600">B.Sc. in Computer Science</span> at the <span className="font-heading font-semibold text-indigo-600">Nxtwave Institute of Advanced Technology</span>.
              </motion.p>

              <motion.p
                className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 font-body"
                variants={itemVariants}
              >
                I&apos;ve developed a <span className="font-heading font-semibold text-gradient-2">strong passion for Frontend Development</span>, where creativity meets logic. From building responsive web pages with <span className="font-heading text-blue-600">HTML & CSS</span> to exploring <span className="font-heading text-purple-600">Python, SQL, and Figma</span>, every skill has been a new level unlocked in my developer journey.
              </motion.p>

              <motion.p
                className="text-xl md:text-2xl text-slate-700 leading-relaxed font-body"
                variants={itemVariants}
              >
                My mission now is to <span className="font-display text-2xl text-gradient glow-text">craft visually stunning, user-friendly digital experiences</span> that blend innovative tech with creative design.
              </motion.p>
            </div>
          </motion.div>

          {/* Special Abilities */}
          <motion.div className="mb-16" variants={itemVariants}>
            <motion.h3
              className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Special <span className="text-gradient-2">Abilities</span>
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {abilities.map((ability, index) => {
                const Icon = ability.icon
                return (
                  <motion.div
                    key={ability.name}
                    className="group relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform', transform: 'translateZ(0)' }}
                  >
                    <motion.div
                      className="glass-effect-strong rounded-2xl p-6 h-full relative overflow-hidden will-change-transform"
                      whileHover={{
                        rotateY: 3,
                        rotateX: 3,
                        boxShadow: '0 15px 40px rgba(14, 165, 233, 0.25)',
                      }}
                      transition={{ type: 'spring' as const, stiffness: 400, damping: 25, duration: 0.2 }}
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {/* Gradient Background on Hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${ability.color} opacity-0 group-hover:opacity-8 rounded-2xl`}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div
                          className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${ability.color} mb-4 shadow-lg will-change-transform`}
                          whileHover={{ rotate: 360, scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                          style={{ transform: 'translateZ(0)' }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <h4 className="text-lg font-heading font-semibold text-slate-800 mb-2">
                          {ability.name}
                        </h4>
                        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-400 rounded-full" />
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Resume Button */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <motion.a
              href="https://drive.google.com/file/d/1syxQ4n1-bNcX3-t44rTsBTJqY3g-8I46/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-heading font-semibold text-lg shadow-2xl overflow-hidden will-change-transform"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ transform: 'translateZ(0)' }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <FileText className="w-6 h-6 relative z-10" />
              <span className="relative z-10">View Resume</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
